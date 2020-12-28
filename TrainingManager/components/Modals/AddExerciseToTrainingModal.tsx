import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from "@react-native-community/picker";
import { Button, Input, Overlay } from 'react-native-elements';
import styles from '../../constants/TrainingDetailsStyles';

export interface Props {
  title: string,
  fnc:(name:string) => void
}

export interface Exercise {
    id: number,
    name: string,
    type: number
}

const items:Exercise[] = [{
    id: 1,
    name: 'Dupa1',
    type: 1
},{
    id: 2,
    name: 'Dupa2',
    type: 2
},{
    id: 3,
    name: 'Dupa3',
    type: 1
},{
    id: 4,
    name: 'Dupa4',
    type: 2
},{
    id: 5,
    name: 'Dupa5',
    type: 1
}]
const AddExerciseToTrainingModal: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  const [exerciseId, setExerciseId] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>(items);
  const [reps, setReps] = useState(0);
  const [time, setTime] = useState(0);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  let exercisePickerItems = exercises?.map((s, i) => {
    return <Picker.Item key={i} value={s.id} label={s.name} />;
  });

  return (
    <>
      <Button title='Add Exercise' onPress={toggleOverlay} buttonStyle={styles.button} titleStyle={{color: styles.name.color}} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.modalContainer}>
          <>
          <Text style={styles.pickerLabel}>{props.title}</Text>
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={exercises?.find(x => x.id == exerciseId)?.name}
            style={styles.picker}
            onValueChange={(itemValue) =>
                setExerciseId(Number(itemValue))
            }
            itemStyle={styles.item}
          >
            {exercisePickerItems}
          </Picker>
        </View>
        {(exercises?.find(x => x.id == exerciseId)?.type == 1) ?
        <View>
            <Input 
             label="Reps"
             labelStyle={styles.inputLabel}
             value={reps.toString()}
             onChangeText={(value) => setReps(Number(value))}
             inputStyle={styles.input}
             inputContainerStyle={{ borderColor: styles.input.color }}
            />
        </View>    
        :
        <View>
            <Input 
             label="Time"
             labelStyle={styles.inputLabel}
             value={time.toString()}
             onChangeText={(value) => setTime(Number(value))}
             inputStyle={styles.input}
             inputContainerStyle={{ borderColor: styles.input.color }}
            />
        </View>   
    }
        <Button title="Ok" onPress={() => {}} 
        buttonStyle={styles.modalOkButton}
        titleStyle={{color: styles.name.color}}
        />
       </>
      </Overlay>
    </>
  );
};

export default AddExerciseToTrainingModal