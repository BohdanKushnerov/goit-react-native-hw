import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";
import { MaterialIcons } from "@expo/vector-icons";

const LogOutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
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
