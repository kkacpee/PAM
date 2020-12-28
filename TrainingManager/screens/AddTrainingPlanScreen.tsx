import React, { useState } from "react";
import { Text, SafeAreaView, View, Alert, ImageBackground } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, CheckBox, Input, Slider } from "react-native-elements";
import OrangeTheme from "../constants/OrangeTheme";
import styles from "../constants/AddScreenStyles";
import { ExerciseViewModel } from "../src/viewmodel/ViewModelTypes";
import { ScrollView } from "react-native-gesture-handler";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export interface Training{
    id: number,
    name: string,
    isActvie: boolean
}

const items:Training[] = [{
    id: 1,
    name: 'Dupa1',
    isActvie: true
},{
    id: 2,
    name: 'Dupa2',
    isActvie: false
},{
    id: 3,
    name: 'Dupa3',
    isActvie: true
}]

export default function AddTrainingPlanScreen() {
    const [trainings, setTrainings] = useState(items);
    const [selectedTraining, setSelectedTraining] = useState<Training | undefined>();
    const [selectedLength, setSelectedLength] = useState(1);
    const [intensity, setIntensity] = useState(1);
    const [days, setDays] = useState([{
        name: 'Monday', 
        checked: false},
        {
        name: 'Tuesday', 
        checked: false},
        {
        name: 'Wednesday', 
        checked: false},
        {
        name: 'Thursday', 
        checked: false},
        {
        name: 'Friday', 
        checked: false},
        {
        name: 'Saturday', 
        checked: false},
        {
        name: 'Sunday', 
        checked: false}])

  const updateFieldChanged = (index:any) => {
    let newArr = [...days]; // copying the old datas array
    newArr[index].checked = !newArr[index].checked; // replace e.target.value with whatever you want to change it to

    setDays(newArr); // ??
    }

  let daysCheckbox = days.map((s, i) => {
      return <CheckBox
      checkedColor={styles.input.color}
      uncheckedColor={styles.input.color}
      textStyle={styles.inputLabel}
      containerStyle={styles.checkBoxContainer}
      key={i}
      title={s.name}
      checked={s.checked}
      onPress={() => updateFieldChanged(i)}
    />
  })

  const trainingPickerItems = trainings?.map((s, i) => {
    return <Picker.Item key={i} value={s.id} label={s.name} />;
  }); 

  return (
      <ImageBackground source={require('../assets/images/AddBg.png')} style={styles.image}>
          <ScrollView style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            <SafeAreaView style={styles.container}>
            <Text style={styles.pickerLabel}>Pick exercise</Text>
            <View style={styles.pickerContainer}>
                <Picker
                selectedValue={selectedTraining?.id}
                style={styles.picker}
                onValueChange={(value) => {setSelectedTraining(trainings.find(x => x.id == Number(value))), console.log(selectedTraining)}}
                itemStyle={styles.item}
                >
                {trainingPickerItems}
                </Picker>
            </View>
            <Text style={styles.pickerLabel}>Select days</Text>
            {daysCheckbox}
            <Text style={styles.pickerLabel}>Pick length</Text>
            <View style={styles.pickerContainer}>
                <Picker
                selectedValue={selectedLength}
                style={styles.picker}
                onValueChange={(value)=> setSelectedLength(Number(value))}
                itemStyle={styles.item}
                >
                <Picker.Item key={1} value={1} label={'1 week'} />
                <Picker.Item key={2} value={2} label={'2 weeks'} />
                <Picker.Item key={3} value={3} label={'3 weeks'} />
                <Picker.Item key={4} value={4} label={'4 weeks'} />
                </Picker>
            </View>
            <Text style={styles.pickerLabel}>Select intensity</Text>
            <View style={styles.sliderContainer}>
                <Slider
                    value={intensity}
                    onValueChange={(value) => setIntensity(value)}
                    minimumValue={0}
                    maximumValue={2}
                    step={0.5}
                    thumbStyle={styles.thumb}
                    trackStyle={styles.track}
                />
                <Text style={styles.pickerLabel}>Value: {`${intensity * 100}%`}</Text>
            </View>
            <View style={{ marginTop: 50 }}>
                <Button
                title="Add"
                type="outline"
                titleStyle={{ color: OrangeTheme.colors.text }}
                buttonStyle={styles.addButton}
                onPress={() =>
                    {}
                }
                />
            </View>
            </SafeAreaView>
          </ScrollView>
      </ImageBackground>
  );
}