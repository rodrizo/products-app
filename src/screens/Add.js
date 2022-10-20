import * as React from "react";
import * as RN from "react-native";
import { database } from "../../config/fb";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [isOpen, setIsOpen] = React.useState(true);
  const [newItem, setNewItem] = React.useState({
    emoji: "🎈",
    name: "",
    price: 0,
    isSold: false,
    createAt: new Date(),
  });

  //recibe el emoji seleccionado y lo inserta dentro de newItem
  /*const handlePick = (emojiObject) => {
    setNewItem({
      ...newItem,
      emoji: emojiObject.emoji,
    });
  };*/

  const onSend = async () => {
    await addDoc(collection(database, "products"), newItem);
    navigation.goBack();
  };

  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>
        {"\n"}Sell a new product{"\n"}
      </RN.Text>

      <RN.TextInput
        onChangeText={(text) => setNewItem({ ...newItem, emoji: text })}
        style={styles.inputContainer}
        placeholder="Product image"
      />
      <RN.TextInput
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        style={styles.inputContainer}
        placeholder="Product name"
      />
      <RN.TextInput
        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
        style={styles.inputContainer}
        placeholder="$ Price"
        keyboardType="number-pad"
      />
      <RN.Button title="Publish" onPress={onSend} />
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  inputContainer: {
    width: "90%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  emoji: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
});
