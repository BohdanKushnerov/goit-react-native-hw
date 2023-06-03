import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";

const LogOutBtn = ({ setIsLogIn }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // navigation.navigate("Register");
    // setIsLogIn(false);
    dispatch(authSignOutUser());
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

export default LogOutBtn;
