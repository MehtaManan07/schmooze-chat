import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { pickImage, takePhoto } from "../../../../utils/mediaUtils";

const CustomActions = ({onSend}: {onSend: () => void}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const onPress = () => {
    const options = [
      "Image from library",
      "Take a picture",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            return pickImage(onSend);
          case 1:
            return takePhoto(onSend);
        }
      }
    );
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View style={[styles.wrapper]}>
        <Text style={[styles.iconText]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomActions;


const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 15,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });
  