import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../config/fb";
import {
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import Products from "../components/Products";

export default function Home() {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RN.Button title="Add" onPress={() => navigation.navigate("Add")} />
      ),
    });
  }, []);

  React.useEffect(() => {
    const collectionRef = collection(database, "products");
    const q = query(collectionRef, orderBy("createAt", "desc"));

    const unsuscribe = onSnapshot(q, (QuerySnapshot) => {
      setProducts(
        QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          emoji: doc.data().emoji,
          name: doc.data().name,
          price: doc.data().price,
          isSold: doc.data().isSold,
          createAt: doc.data().createAt,
        }))
      );
    });
    return unsuscribe;
  }, []);

  return (
    <>
      <RN.ScrollView>
        <RN.Text style={styles.title}>Products</RN.Text>
        {products.map((product) => (<Products key={product.id} {...product} />))}
      </RN.ScrollView>
    </>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3F9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 16,
  },
});
