import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

const LogOutBtn = ({ setIsLogIn }) => {
  const handleLogout = () => {
    // navigation.navigate("Register");
    setIsLogIn(false);
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
