import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedScreens/DefaultScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import LogOutBtn from "../../components/LogOutBtn";
import { db } from "../../firebase/config";
// import { useUser } from "../../App";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  // const { isLogIn, setIsLogIn } = useUser();

  return (
    // <NestedScreen.Navigator>
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
          // headerRight: () => <LogOutBtn setIsLogIn={setIsLogIn} />,
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
