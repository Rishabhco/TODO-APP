import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity,Modal,TextInput} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome"

function TODO({route}){
  const [tasksWithList, setTasksWithList] = useState([]);
  const [tasksWithoutList, setTasksWithoutList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const listid=route.params.listId;

  const openAddTaskModal = () => {
    setAddTaskModalVisible(true);
  };

  const closeAddTaskModal = () => {
    setNewTaskTitle(""); 
    setAddTaskModalVisible(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [tasksWithList, completedTasks]);

  const loadData = async () => {
    try {
      const allTasksData = await AsyncStorage.getItem("allTasks");
      const completedTasks=await AsyncStorage.getItem("completedTasks");
      if (allTasksData) {
        setTasksWithoutList(JSON.parse(allTasksData).filter((item) => item.listId !== listid));
        setTasksWithList(JSON.parse(allTasksData).filter((item) => item.listId === listid));
      }
      if (completedTasks) {
        setCompletedTasks(JSON.parse(completedTasks));
      }
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  };

  const createTask = () => {
    if (newTaskTitle.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      listId:listid,
    };
    setTasksWithList([...tasksWithList, newTask]);
    saveData();
    closeAddTaskModal();
  };

  const handleRadioPress = (item) => {
    setSelectedItem(item);
    setTimeout(() => { markAsCompleted(item);}, 1000);
  };

  const markAsCompleted = async(itemToComplete) => {
    if (itemToComplete) {
      const updatedAllTasks = tasksWithList.filter((item) => item.id !== itemToComplete.id);
      let taskToUpdate = {...itemToComplete,completed:true};
      const updatedCompletedTasks = [...completedTasks, taskToUpdate];
      setTasksWithList(updatedAllTasks);
      setCompletedTasks(updatedCompletedTasks);
      setSelectedItem(null);
    }
  };  

  const saveData = async () => {
    try {
      const combinedArray=[...tasksWithoutList,...tasksWithList]
      await AsyncStorage.setItem("allTasks", JSON.stringify(combinedArray));
      await AsyncStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  }

  const deleteItem = (item) => {
    const updatedAllTasks = tasksWithList.filter((i) => i.id !== item.id);
    setTasksWithList(updatedAllTasks);
  };

  const renderRightActions = (item) => {
    return (
      <TouchableOpacity
        onPress={() => deleteItem(item)}
        style={{
          flexDirection: "row",
          padding: 10,
          borderRadius: 5,
          marginVertical: 5,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          width: 75,
        }}
        >
        <Text style={{ fontSize: 16 ,color:"white"}}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item)}>
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
          <TouchableOpacity
            onPress={() => handleRadioPress(item)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#007AFF",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            {selectedItem?.id === item.id && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "#007AFF",
                }}
              />
            )}
          </TouchableOpacity>
          <Text style={{ fontSize: 20,color:"#242424" }}>{item.title}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={{ flex: 1,backgroundColor:"white" }}>
      <FlatList
        data={tasksWithList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
        <TouchableOpacity onPress={openAddTaskModal} style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="plus" size={24} color="#007AFF" />
          <Text style={{ fontSize: 20, marginLeft: 10,color:"#007AFF" }}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddTaskModalVisible}
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
            <Text style={{ fontSize: 24, marginBottom: 10,color:"#242424" }}>Add Task</Text>
            <TextInput
              placeholder="Task Title"
              placeholderTextColor={"#242424"}
              value={newTaskTitle}
              onChangeText={(text) => setNewTaskTitle(text)}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                color:"#242424"
              }}
            />
            <TouchableOpacity
              onPress={createTask}
              style={{
                backgroundColor: "#007AFF",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeAddTaskModal}
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

export default TODO;