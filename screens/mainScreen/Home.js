import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

import { View } from "react-native";
import GoBackBtn from "../../components/GoBackBtn";
import CameraScreen from "../CameraScreen";
import { useSelector } from "react-redux";

// import { useNavigationState } from "@react-navigation/native";

const MainTab = createBottomTabNavigator();

export default function Home() {
  // const navigationState = useNavigationState((state) => state);
  // const currentRouteName = navigationState.routes[navigationState.index].name;

  // console.log(navigationState); // Имя текущего экрана

  const onCommentOrMapScreen = useSelector(
    (state) => state.auth.isCommentOrMapScreen
  );

  return (
    <MainTab.Navigator
      initialRouteName="PostsScreen"
      // screenListeners={{
      //   state: (event) => {
      //     console.log(event.route); // Текущий маршрут
      //   },
      // }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          display: onCommentOrMapScreen ? "none" : "flex",
          height: 83,
          paddingHorizontal: 70,
        },
        tabBarIconStyle: {
          marginTop: 9,
          marginBottom: 34,
        },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          // ,тут нужно отключать для COMMENTSCREEN и MAPSCREEN
          // tabBarStyle: {
          //   display: onCommentOrMapScreen ? "none" : "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // },
          // {onCommentOrMapScreen && tabBarStyle: { display: "none" }}
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "orange" : null,
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Ionicons
                name="ios-grid-outline"
                size={size}
                color={focused ? "white" : "#212121CC"}
              />
            </View>
          ),
        }}
      />

      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          headerTitle: "Створити публікацію",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            borderBottomWidth: 1,
            borderBottomColor: "#B3B3B3",
          },
          headerLeftContainerStyle: { marginLeft: 20 },
          headerRightContainerStyle: { marginRight: 20 },
          headerLeft: () => <GoBackBtn navigation={navigation} />,
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "orange" : null,
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <AntDesign
                name="plus"
                size={size}
                color={focused ? "white" : "#212121CC"}
              />
            </View>
          ),
        })}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "orange" : null,
                width: 70,
                height: 40,
                borderRadius: 20,
              }}
            >
              <Feather
                name="user"
                size={size}
                color={focused ? "white" : "#212121CC"}
              />
            </View>
          ),
        }}
      />
      {/* ======================================================= */}
      <MainTab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          headerLeft: () => <GoBackBtn navigation={navigation} />,
          headerLeftContainerStyle: { marginLeft: 20 },
          headerRightContainerStyle: { marginRight: 20 },
        })}
      />

      {/* =============================================================== */}
      {/* <MainTab.Screen name="MapScreen" component={MapScreen} /> */}
      {/* <MainTab.Screen name="Home" component={Home} /> */}
      {/* <MainTab.Screen name="Comments" component={CommentsScreen} /> */}
    </MainTab.Navigator>
  );
}
