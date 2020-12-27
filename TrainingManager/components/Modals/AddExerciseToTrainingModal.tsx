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
    name: string
}

const AddExerciseToTrainingModal: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  const [exerciseId, setExerciseId] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>();
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