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
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    timer : {
      fontSize: 80,
      color: OrangeTheme.colors.text,
      borderTopColor: OrangeTheme.colors.border,
      borderBottomColor: OrangeTheme.colors.border,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      textAlign:'center',
      alignSelf: "center",
      width: '100%',
      marginVertical: 120
    },
    button: {
        borderWidth: 1, 
        borderColor: OrangeTheme.colors.border, 
        borderRadius: 4, 
        marginTop: 40, 
        width:'30%', 
        backgroundColor:'rgba(0, 0, 0, 0.6)', 
        alignSelf: 'center',
    },
    icon: {
        alignSelf:'center'
    },
    row: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        flex: 0.25, 
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent:'space-around'
    }
  });

  export default styles;