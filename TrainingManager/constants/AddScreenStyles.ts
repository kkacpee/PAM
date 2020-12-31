import { StyleSheet } from "react-native";
import OrangeTheme from "./OrangeTheme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      marginVertical: 30,
      width: '80%',
      alignSelf: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)'
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
      color: OrangeTheme.colors.text,
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    inputLabel: {
        color: OrangeTheme.colors.text,
        alignSelf: 'center'
    },
    picker: {
      flex: 1,
      color: OrangeTheme.colors.text,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: OrangeTheme.colors.text,
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    plusButton: {
      flex: 1,
      borderWidth: 1,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderColor: OrangeTheme.colors.border,
      borderRadius: 4,
      backgroundColor:'rgba(0, 0, 0, 0.4)',
      color: OrangeTheme.colors.text
    },
    addButton: {
      borderWidth: 1,
      borderColor: OrangeTheme.colors.border,
      borderRadius: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalContainer: {
      width: '80%',
      borderWidth: 1,
      borderColor: OrangeTheme.colors.border,
      borderRadius: 4,
      backgroundColor: OrangeTheme.colors.background,
    },
    modalOkButton: {
      borderWidth: 1,
      borderColor: OrangeTheme.colors.border,
      borderRadius: 4,
      width: '40%',
      alignSelf: 'center',
      backgroundColor: OrangeTheme.colors.background
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center'
    },
    pickerContainer: {
        borderWidth: 1, 
        borderColor: OrangeTheme.colors.border, 
        borderRadius: 4, 
        marginBottom:5,
        flexDirection: 'row'
      },
    item:{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: OrangeTheme.colors.text
    },
    pickerLabel:{
        color: OrangeTheme.colors.text, 
        alignSelf:'center', 
        fontWeight: "bold"
    },
    checkBoxContainer: {
      borderWidth: 1, 
      borderColor: OrangeTheme.colors.border, 
      borderRadius: 4, 
      marginBottom:5,
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    thumb: {
      height: 20, 
      width: 20,
      backgroundColor: OrangeTheme.colors.text
    },
    track:{ 
      color: OrangeTheme.colors.text,
      backgroundColor: 'transparent' 
    },
    sliderContainer: {
      flex: 1, 
      alignItems: 'stretch', 
      justifyContent: 'center'
    }
  });

  export default styles;