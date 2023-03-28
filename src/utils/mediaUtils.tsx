import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import { Platform } from "react-native";
export const pickImage = async (
  onSend: (images: { image: string }[]) => void
) => {
  try {
    if (await ImagePicker.requestMediaLibraryPermissionsAsync()) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.assets) {
        const imageUrl = result.assets[0].uri;
        const imageLink = await uploadImage(imageUrl);

        onSend([{ image: imageLink as string }]);
      }
    }
  } catch (e) {
    console.log("error in imagePicker", e);
  }
};
export const takePhoto = async (
  onSend: (images: { image: string }[]) => void
) => {
  try {
    if (await ImagePicker.requestCameraPermissionsAsync()) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.assets) {
        const imageUrl = result.assets[0].uri;
        const imageLink = await uploadImage(imageUrl);
        onSend([{ image: imageLink as string }]);
      }
    }
  } catch (e) {
    console.log("error in imagePicker");
  }
};
export const uploadImage = async (uri: string) => {
  console.log(uri);
  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
  const task = await storage().ref(filename).putFile(uploadUri);
  const firebaseURI = await storage().ref(filename).getDownloadURL();
  return firebaseURI;
};
