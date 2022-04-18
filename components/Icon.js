import React from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  EvilIcons,
  Fontisto,
  Foundation,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  EvilIcons,
  Fontisto,
  SimpleLineIcons,
  Octicons,
  Foundation,
  Zocial,
};

const Icon = ({ type, name, color, size = 24, style }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};

export default Icon;
