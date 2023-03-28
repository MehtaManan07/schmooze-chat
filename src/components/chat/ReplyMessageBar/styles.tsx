import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
      height: 50,
    },
    replyImage: {
      width: 20,
      height: 20,
    },
    replyImageContainer: {
      paddingLeft: 8,
      paddingRight: 6,
      borderRightWidth: 2,
      borderRightColor: '#2196F3',
      marginRight: 6,
      height: '100%',
      justifyContent: 'center',
    },
    crossButtonIcon: {
      width: 24,
      height: 24,
    },
    crossButton: {
      padding: 4,
    },
    messageContainer: {
      flex: 1,
    },
  });