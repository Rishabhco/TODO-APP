import React,{useState,useEffect} from "react";
import {View,Text,FlatList,TouchableOpacity} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Completed(){
    const [tasks,setTasks]=useState([]);

    useEffect(()=>{
        loadData();
    },[]);

    useEffect(()=>{
        saveData();
    },[tasks]);

    const loadData=async()=>{
      const getTasks=await AsyncStorage.getItem("completedTasks");
      setTasks(JSON.parse(getTasks));
    }

    const saveData=async()=>{
        try {
            await AsyncStorage.setItem("completedTasks", JSON.stringify(tasks));
        } catch (error) {
            console.error("Error saving data: ", error);
        }
    }

    const deleteItem = (item) => {
        const updatedAllTasks = tasks.filter((i) => i.id !== item.id);
        setTasks(updatedAllTasks);
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
            <Text style={{ fontSize: 16,color:"white" }}>Delete</Text>
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
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#007AFF",
                  backgroundColor: "#007AFF",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
              </TouchableOpacity>
              <Text style={{ fontSize: 20,color:"#242424" }}>{item.title}</Text>
            </View>
          </Swipeable>
        );
      };

    return(
      <View style={{flex:1,backgroundColor:"white"}}>
        <FlatList
          data={tasks} renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
}

export default Completed;