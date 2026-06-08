import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import MyProfile from "../screens/MyProfile";
import NewPost from "../screens/NewPost";
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();


function HomeMenu() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (<FontAwesome name="home" color={color} size={size} />),
      }} />
      <Tab.Screen name="NewPost" component={NewPost} options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (<FontAwesome name="plus-square" color={color} size={size} />),
      }} />
      <Tab.Screen name="MyProfile" component={MyProfile} options={{
        headerShown: false, tabBarIcon: ({ color, size }) => (<FontAwesome name="user" color={color} size={size} />),
      }} />
    </Tab.Navigator>
  );
}


export default HomeMenu;

