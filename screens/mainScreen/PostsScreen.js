import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedScreens/DefaultScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import LogOutBtn from "../../components/LogOutBtn";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            borderBottomWidth: 1,
            borderBottomColor: "#B3B3B3",
          },
          headerLeftContainerStyle: { marginLeft: 10 },
          headerRightContainerStyle: { marginRight: 10 },
          headerRight: () => <LogOutBtn />,
        }}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerTitle: "Коментарі",
          headerTitleAlign: "center",
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
