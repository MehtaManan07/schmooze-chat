import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import NewRoomModal from "../../../../components/modals/NewRoomModal";
import LogoutModal from "../../../../components/modals/LogoutModal";
import { styles } from "./styles";
import { Avatar, Divider, FAB, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { IThread } from "./index";
type IProps = {
  onSubmit: () => void;
  roomName: string;
  setRoomName: (room: string) => void;
  setVisible: (visible: boolean) => void;
  visible: boolean;
  visibleLogout: boolean;
  setVisibleLogout: (visible: boolean) => void;
  showModal: (visible: GestureResponderEvent) => void;
  threads: IThread[];
};
const AllChatView = ({
  onSubmit,
  roomName,
  setRoomName,
  setVisible,
  visible,
  visibleLogout,
  setVisibleLogout,
  showModal,
  threads,
}: IProps) => {
  const { navigate } = useNavigation();
  return (
    <>
      <NewRoomModal
        onSubmit={onSubmit}
        roomName={roomName}
        setRoomName={setRoomName}
        setVisible={setVisible}
        visible={visible}
      />
      <LogoutModal visible={visibleLogout} setVisible={setVisibleLogout} />
      <View style={styles.container}>
        <FlatList
          data={threads}
          style={{ paddingHorizontal: 8 }}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigate("Home", {
                  screen: "RoomScreen",
                  params: { thread: item },
                })
              }
            >
              <List.Item
                title={item.name}
                description={
                  item.latestMessage
                    ? item.latestMessage.text
                    : "Start of an awesome chat"
                }
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                right={() => (
                  <Text style={{ marginTop: 28, color: "gray" }}>
                    {item.latestMessage?.localTime
                      .toDate()
                      .toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                  </Text>
                )}
                left={() => (
                  <Avatar.Text
                    size={36}
                    label={`${item.name.split(" ")[0][0]}${
                      item.name.split(" ")[1] ? item.name.split(" ")[1][0] : ""
                    }`}
                  />
                )}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <FAB
        style={styles.fab}
        label={"New Chat"}
        icon={"plus-circle-outline"}
        color={"#10194A"}
        onPress={showModal}
      />
    </>
  );
};

export default AllChatView;
