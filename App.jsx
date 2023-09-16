import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home,TODO,All,Completed,Scheduled} from './screens/index';

const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ title: 'TO DO Lists'}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TODO" component={TODO}/>
        <Stack.Screen name="All" component={All} options={{title:'All Tasks'}}/>
        <Stack.Screen name="Completed" component={Completed} options={{title:'Completed Tasks'}}/>
        <Stack.Screen name="Scheduled" component={Scheduled} options={{title:'Scheduled Tasks'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
