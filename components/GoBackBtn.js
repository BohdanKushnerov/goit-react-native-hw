import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const GoBackBtn = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <AntDesign name="arrowleft" size={24} color="#212121cc" />
    </TouchableOpacity>
  );
};

export default GoBackBtn;
