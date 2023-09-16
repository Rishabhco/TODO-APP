import React,{useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Modal,TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home({ navigation }) {

  const [isAddListModalVisible, setAddListModalVisible] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [lists,setLists]=useState([{id: Date.now().toString(),title:"My Tasks",}]);

  useEffect(()=>{
    loadData();
  },[]);

  useEffect(()=>{
    saveData();
  },[lists]);

  const loadData=async()=>{
    const getLists=await AsyncStorage.getItem("lists");
    if(getLists){
      setLists(JSON.parse(getLists));
    }
  };

  const saveData=async()=>{
    try{
      await AsyncStorage.setItem("lists",JSON.stringify(lists));
    }catch(error){
      console.log('Error saving data', error);
    }
  }

  const openAddListModal = () => {
    setAddListModalVisible(true);
  };

  const closeAddListModal = () => {
    setNewListTitle(""); 
    setAddListModalVisible(false);
  };

  const createList = () => {
    if (newListTitle.trim() === "") return;
    const newList = {
      id: Date.now().toString(),
      title: newListTitle,
    };
    setLists([...lists, newList]);
    saveData();
    closeAddListModal();
  };

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      {/* Section 1: Two Boxes */}
      <View style={styles.boxContainer}>
        <TouchableOpacity style={[styles.box, { backgroundColor: "lightblue" }]} onPress={() => navigation.navigate("All")}>
          <Text style={styles.boxText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, { backgroundColor: "lightpink" }]} onPress={() => navigation.navigate("Completed")}>
          <Text style={styles.boxText}>Completed</Text>
        </TouchableOpacity>
      </View>
      {/* Section 2: My Lists */}
      <View style={styles.listsContainer}>
        <Text style={styles.listsHeading}>My Lists</Text>
        {lists.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => navigation.navigate("TODO", { listId: item.id })}
          >
            <Text style={styles.listItemText}>{item.title}</Text>
            <Icon name="angle-right" size={20} color="#333"/>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 5,
          margin: 5,
        }}
      >
        <TouchableOpacity onPress={openAddListModal} style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="plus" size={24} color="blue" />
          <Text style={{ fontSize: 20, marginLeft: 10 }}>Add List</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddListModalVisible}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
              width: 300,
            }}
          >
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Add List</Text>
            <TextInput
              placeholder="List Title"
              value={newListTitle}
              onChangeText={(text) => setNewListTitle(text)}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              }}
            />
            <TouchableOpacity
              onPress={createList}
              style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeAddListModal}
              style={{
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "red", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  box: {
    width: "48%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listsContainer: {
    marginHorizontal: 20,
  },
  listsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
  },
});

export default Home;
