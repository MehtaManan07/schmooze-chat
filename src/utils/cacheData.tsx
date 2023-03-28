import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveChatData = async (chatData: any) => {
  try {
    await AsyncStorage.setItem("@chatData", JSON.stringify(chatData));
  } catch (e) {
    console.log("Error saving chat data: ", e);
  }
};
export const loadChatDataFromLocal = async () => {
  try {
    const chatData = await AsyncStorage.getItem("@chatData");
    return chatData !== null ? JSON.parse(chatData) : [];
  } catch (e) {
    console.log("Error loading chat data: ", e);
    return [];
  }
};
