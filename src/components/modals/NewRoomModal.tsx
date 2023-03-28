import React from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
type IProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  roomName: string;
  setRoomName: (text: string) => void;
  onSubmit: () => void;
};
const NewRoomModal = ({roomName,setRoomName,setVisible,visible, onSubmit}: IProps) => {
  const hideModal = () => setVisible(false);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal}>
        <Dialog.Content>
          <TextInput
            label="Room Name"
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideModal}>Cancel</Button>
          <Button onPress={onSubmit}>Submit</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default NewRoomModal;
