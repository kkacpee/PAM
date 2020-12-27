import { StyleSheet } from "react-native";
import OrangeTheme from "./OrangeTheme";

const styles = StyleSheet.create({
    column: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      paddingBottom: 40,
      marginBottom: 10,
      padding: 5,
      flex: 1, 
      flexDirection: 'column'
  },
    headerToday: {
      fontSize: 32,
      color: OrangeTheme.colors.text,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      textAlign:'center',
      width: '100%',
      borderTopColor: OrangeTheme.colors.border,
      borderBottomColor: OrangeTheme.colors.border,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      alignSelf: "center"
    },
    content: {
      fontSize: 22,
      color: OrangeTheme.colors.text,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      textAlign:'center',
      width: '100%',
      borderTopColor: OrangeTheme.colors.border,
      borderBottomColor: OrangeTheme.colors.border,
      alignSelf: "center"
    },
    container: {
      flex: 1,
      height:'50%', 
      backgroundColor: OrangeTheme.colors.background,
      borderColor: OrangeTheme.colors.border,
      justifyContent: 'center',
      alignContent: 'center',
      marginVertical: 2
  },
  image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    }
  });

  export default styles;