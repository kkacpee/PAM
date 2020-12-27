import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  DrawerLayoutAndroidComponent
} from "react-native";
import {  Picker } from "@react-native-community/picker"
import { Avatar, Button, Icon, Input, ListItem } from 'react-native-elements';
import OrangeTheme from "../constants/OrangeTheme";
import styles from '../constants/AddScreenStyles'

const Trainings = [{title: "dupa", icon: 'av-timer'}, {title: "dupa", icon: 'av-timer'}, {title: "dupa", icon: 'av-timer'}]

export default function AddTrainingScreen() {
  const [selectedValue, setSelectedValue] = useState("Reps");
  const [trainings, setTrainings] = useState(Trainings);
  const [description, setDescription] = useState("");

    return (
      <SafeAreaView style={styles.container}>
        {
            trainings.map((item, i) => (
            <ListItem key={i} bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))
        }
      </SafeAreaView>
    );
  }
