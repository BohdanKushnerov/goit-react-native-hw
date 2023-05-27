import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "../screens/auth/RegistrationScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import PostsScreen from "../screens/mainScreen/PostsScreen";
import ProfileScreen from "../screens/mainScreen/ProfileScreen";
import CreatePostsScreen from "../screens/mainScreen/CreatePostsScreen";
import Home from "../screens/mainScreen/Home";
import MapScreen from "../screens/mainScreen/MapScreen";
import CommentsScreen from "../screens/mainScreen/CommentsScreen";

import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import { getHeaderTitle } from "@react-navigation/elements";

const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};

export default useRoute;

{
  /* <MainTab.Screen name="MapScreen" component={MapScreen} />
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen name="Comments" component={CommentsScreen} /> */
}
