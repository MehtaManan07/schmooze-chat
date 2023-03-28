import {Text } from "react-native";
import React, { useContext } from "react";
import { Button, Dialog, Portal} from "react-native-paper";
import { AuthContext } from "../../context/AuthProvider";
type IProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};
const LogoutModal = ({ setVisible, visible }: IProps) => {
  const { logout } = useContext(AuthContext);
  const hideModal = () => setVisible(false);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal}>
        <Dialog.Content>
          <Text>Are you sure you want to Logout?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideModal}>Cancel</Button>
          <Button onPress={logout}>Logout</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LogoutModal;
