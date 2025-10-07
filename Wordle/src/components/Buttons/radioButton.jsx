import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { Colors } from "../../constants/colors";

import { useTheme } from "../../context/themeContext";

const RadioButton = ({value, label, selected, onPress, image, style}) => {
  
  const { colorsTheme } = useTheme(); 

  const handleOnPress = (value) => {
    onPress(value);
  };

  return (
    <TouchableOpacity onPress={() => handleOnPress(value)} style={style}>
      <View style={[styles.wrap, {backgroundColor: Colors.primary.green}]}>
        <View style={styles.container}>
          {image && ( <Image style={styles.imageButton} source={image} />)}
          <Text style={[styles.label, {color:colorsTheme.primary}]}>{label}</Text>
        </View>
      <Dot key={'selected'} selected={selected} />
      </View>
    </TouchableOpacity>
  );
};

const Dot = ({ selected }) => {
  return (
    <View style={styles.radio}>
      <View
        style={[
          styles.dot,
          {backgroundColor: selected ? '#FFFFFF' : "transparent"}
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    justifyContent:'space-between',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "transparent",
    overflow: 'hidden'
  },
  label: {
    fontSize: 23,
    color: "white",
  },
  imageButton: {
    width: 46,
    height: 32,
    borderRadius:6
  },
});

export default RadioButton;