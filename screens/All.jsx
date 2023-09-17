import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function All() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const allTasksData = await AsyncStorage.getItem("allTasks");
      const completedTasksData = await AsyncStorage.getItem("completedTasks");
      const allTasks = JSON.parse(allTasksData) || [];
      const completedTasks = JSON.parse(completedTasksData) || [];
      const combinedTasks = [...allTasks, ...completedTasks];
      setTasks(combinedTasks);
    } catch (error) {
      console.log("Error loading data");
    }
  };

  const renderItem = ({ item }) => {
    return (
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
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            marginHorizontal:5,
            backgroundColor: item.completed ? "#007AFF" : "red",
          }}
        />
        <Text style={{ fontSize: 20, color:"#242424"}}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default All;
