import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";

import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../App";

const MainTab = createBottomTabNavigator();

const CustomHeader = ({ setIsLogIn }) => {
  const handleLogout = () => {
    // navigation.navigate("Register");
    setIsLogIn(false);
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 19,
  },
});

export default function Home() {
  const { isLogIn, setIsLogIn } = useUser();

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      // initialRouteName="CreatePosts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 83, paddingHorizontal: 70 },
        tabBarIconStyle: {
          marginTop: 9,
          marginBottom: 34,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            borderBottomWidth: 1,
            borderBottomColor: "#B3B3B3",
          },
          headerLeftContainerStyle: { marginLeft: 20 },
          headerRightContainerStyle: { marginRight: 20 },
          headerRight: () => <CustomHeader setIsLogIn={setIsLogIn} />,

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
        })}
        // options={{

        // }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          // tabBarStyle: { display: "none" },
          headerTitle: "Створити публікацію",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            borderBottomWidth: 1,
            borderBottomColor: "#B3B3B3",
          },
          headerLeftContainerStyle: { marginLeft: 20 },
          headerRightContainerStyle: { marginRight: 20 },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="#212121cc" />
            </TouchableOpacity>
          ),

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
          // tabBarStyle: { display: "none" },
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
    </MainTab.Navigator>
  );
}
