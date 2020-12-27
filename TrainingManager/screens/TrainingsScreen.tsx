import * as React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { TrainingsParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Badge, Divider, Icon } from 'react-native-elements';
import styles from '../constants/TrainingsScreenStyles';

interface Props {
    navigation: StackNavigationProp<TrainingsParamList, "TrainingsScreen">
  }

  export interface Training {
    id: number,  
    name: string,
    icon: string,
    isFavourite: boolean,
    isActive: boolean
  }

  const items:Training[] = [
      {
    id: 1, 
    name: 'Dupa1', 
    icon: 'run-fast', 
    isFavourite: true,
    isActive: true
},
{
    id: 2, 
    name: 'Dupa2', 
    icon: 'run-fast', 
    isFavourite: true,
    isActive: true
},
{
    id: 3, 
    name: 'Dupa3', 
    icon: 'run-fast', 
    isFavourite: true,
    isActive: true
},
{
    id: 4, 
    name: 'Dupa4', 
    icon: 'run-fast', 
    isFavourite: false,
    isActive: true
},
{
    id: 5, 
    name: 'Dupa5', 
    icon: 'run-fast', 
    isFavourite: false,
    isActive: true
},
{
    id: 6, 
    name: 'Dupa6', 
    icon: 'run-fast', 
    isFavourite: false,
    isActive: true
},
{
    id: 7, 
    name: 'Dupa7', 
    icon: 'run-fast', 
    isFavourite: false,
    isActive: false
},
{
    id: 8, 
    name: 'Dupa8', 
    icon: 'run-fast', 
    isFavourite: false,
    isActive: false
},
{
    id: 9, 
    name: 'Dupa9', 
    icon: 'run-fast', 
    isFavourite: false,
    isActive: true
},
{
    id: 10, 
    name: 'Dupa10', 
    icon: 'run-fast', 
    isFavourite: false,
    isActive: true
}] 

export default function TrainingsScreen({ navigation } : Props) {

    let favourites = items.filter(x => x.isFavourite && x.isActive)?.map((s, i) => {
        return (
        <View style={styles.column} key={i}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('TrainingDetailsScreen', {trainingId: s.id})}>
                <Text style={{color:OrangeTheme.colors.text, alignSelf:'center', fontWeight: "bold", marginTop: 10}}>{s.name}</Text>
                <MaterialCommunityIcons name={s.icon} style={styles.icon} size={70} color={OrangeTheme.colors.text} />
            </TouchableOpacity>
        </View>)
      });

      let notFavouritesList = items.filter(x => !x.isFavourite && x.isActive);

      const listToGrid = (totalColumns:Number) => {
        let gridArray: [Training[]] = [[]];

        let countColumns = 1;
        for (var i = 0; i < notFavouritesList.length; i++) {
          gridArray[gridArray.length - 1].push(notFavouritesList[i]);
          if (countColumns <= totalColumns) {
            countColumns++;
          }
          if (countColumns > totalColumns && i !== notFavouritesList.length - 1) {
            countColumns = 1;
            gridArray.push([]);
          }
        }
    
        return gridArray;
      }

      let notFavouritesGrid = listToGrid(3);


      let notFavourites = 
      notFavouritesGrid.map(row => (
        <View style={styles.row} >
        {
        row.map((s, i) => (
            <View style={styles.column} key={i}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('TrainingDetailsScreen', {trainingId: s.id})}>
                    <Text style={{color:OrangeTheme.colors.text, alignSelf:'center', fontWeight: "bold", marginTop: 10}}>{s.name}</Text>
                    <MaterialCommunityIcons name={s.icon} style={styles.icon} size={70} color={OrangeTheme.colors.text} />
                </TouchableOpacity>
            </View>))
        }
         </View>
         ));

  return (
      <>
    <ImageBackground source={require('../assets/images/TrainingsBg.png')} style={styles.image}>
     <View style={styles.container}>
     <Text style={{color:OrangeTheme.colors.text, alignSelf: "center"}}>Favourites</Text>
        <View style={styles.row} >
            {favourites}
        </View>
        <Divider style={{backgroundColor:OrangeTheme.colors.text, width:'100%', height: 2, marginTop:10}} />
           {notFavourites}
    </View>
    </ImageBackground>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("AddTrainingScreen")}>
          <Text style={{fontSize: 60}}>+</Text>
        </TouchableOpacity>
    </>
  );
}