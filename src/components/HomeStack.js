import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../screens/HomePage";
import Comments from "../screens/Comments";

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Comments"
                component={Comments}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;