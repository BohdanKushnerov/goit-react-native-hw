import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

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
