import React from "react";
import Swipeout from 'react-native-swipeout';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

let swipeBtns = [{
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)'
    //onPress: () => { this.deleteNote(rowData) }
  }];

const Item = ({ title}: { title: string }) => (
    
    <Swipeout right={swipeBtns}
    autoClose= {true}
    backgroundColor= 'transparent'>
    <TouchableHighlight
      underlayColor='rgba(192,192,192,1,0.6)'
      //onPress={this.viewNote.bind(this, rowData)} 
      >
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    </TouchableHighlight>
  </Swipeout>
  );

  const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: "#ffa500"
      },
      item: {
        backgroundColor: "#000",
        padding: 20
      },
    });

export default Item;