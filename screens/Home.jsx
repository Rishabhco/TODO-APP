import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Home({ navigation }) {
  const listsData = [
    { id: "1", title: "My Tasks" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Section 1: Four Boxes */}
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, { backgroundColor: "lightsalmon" }]}
          onPress={() => navigation.navigate("Today")}
        >
          <Text style={styles.boxText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { backgroundColor: "lightgreen" }]}
          onPress={() => navigation.navigate("Scheduled")}
        >
          <Text style={styles.boxText}>Scheduled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { backgroundColor: "lightblue" }]}
          onPress={() => navigation.navigate("All")}
        >
          <Text style={styles.boxText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, { backgroundColor: "lightpink" }]}
          onPress={() => navigation.navigate("Completed")}
        >
          <Text style={styles.boxText}>Completed</Text>
        </TouchableOpacity>
      </View>
      {/* Section 2: My Lists */}
      <View style={styles.listsContainer}>
        <Text style={styles.listsHeading}>My Lists</Text>
        {listsData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => navigation.navigate("All", { listId: item.id })}
          >
            <Text style={styles.listItemText}>{item.title}</Text>
            <Icon name="angle-right" size={20} color="#333"/>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
