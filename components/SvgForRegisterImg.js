import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function SvgForRegisterImg({ image = false }) {
  return (
    <Svg
      width={13}
      height={13}
      fill={image ? "#BDBDBD" : "#FF6C00"}
      transform={
        image
          ? [({ rotateY: "45deg" }, { rotateZ: "45deg" })]
          : [({ rotateY: 0 }, { rotateZ: 0 })]
      }
    >
      <Path d="M7 0H6v6H0v1h6v6h1V7h6V6H7V0Z" clipRule="evenodd" />
    </Svg>
  );
}
