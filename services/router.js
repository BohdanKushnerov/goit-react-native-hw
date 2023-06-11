import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "../screens/auth/RegistrationScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import CameraScreen from "../screens/CameraScreen";
import Home from "../screens/mainScreen/Home";

import GoBackBtn from "../components/GoBackBtn";

const AuthStack = createStackNavigator();

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
        <AuthStack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={({ navigation }) => ({
            tabBarStyle: { display: "none" },
            headerLeft: () => <GoBackBtn navigation={navigation} />,
            headerLeftContainerStyle: { marginLeft: 20 },
            headerRightContainerStyle: { marginRight: 20 },
          })}
        />
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};

export default useRoute;
