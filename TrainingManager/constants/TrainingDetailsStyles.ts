import { StyleSheet } from "react-native";
import OrangeTheme from "./OrangeTheme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: OrangeTheme.colors.border,
        marginVertical: 2
    },
    name: {
        color: OrangeTheme.colors.text,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center'
    },
    button: {
      flex: 1,
      borderWidth: 1,
      borderColor: OrangeTheme.colors.border,
      borderRadius: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      color: OrangeTheme.colors.text
    },
    pickerContainer: {
        borderWidth: 1, 
        borderColor: OrangeTheme.colors.border, 
        borderRadius: 4, 
        marginBottom:5,
        flexDirection: 'row'
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
    picker: {
        height: 50, 
        flex: 1,
        color: OrangeTheme.colors.text,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: OrangeTheme.colors.text
    },
    item:{
        backgroundColor: OrangeTheme.colors.background,
        color: OrangeTheme.colors.text
    },
    pickerLabel:{
        color: OrangeTheme.colors.text, 
        alignSelf:'center', 
        fontWeight: "bold"
    },
    input: {
        color: OrangeTheme.colors.text,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      },
      inputLabel: {
          color: OrangeTheme.colors.text,
          alignSelf: 'center'
      }
});

export default styles;