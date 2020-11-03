import { StyleSheet } from "react-native";
import OrangeTheme from "./OrangeTheme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      marginVertical: 30,
      width: '80%',
      alignSelf: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    input: {
      color: OrangeTheme.colors.text
    },
    inputLabel: {
        color: OrangeTheme.colors.text,
        alignSelf: 'center'
    },
    picker: {
      height: 50, 
      width: 150,
      color: OrangeTheme.colors.text,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: OrangeTheme.colors.text
    },
    pickerContainer: {
        borderWidth: 1, 
        borderColor: OrangeTheme.colors.border, 
        borderRadius: 4, 
        marginBottom:5
      },
    item:{
      backgroundColor: OrangeTheme.colors.background,
      color: OrangeTheme.colors.text
    },
    pickerLabel:{
        color: OrangeTheme.colors.text, 
        alignSelf:'center', 
        fontWeight: "bold"
    }
  });

  export default styles;