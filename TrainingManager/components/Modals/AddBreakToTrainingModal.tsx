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

const AddBreakToTrainingModal: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const lengths = [0.5, 1, 2, 4, 5, 10];

  let exercisePickerItems = lengths?.map((s, i) => {
    return <Picker.Item key={i} value={s} label={`${s} min`} />;
  });

  return (
    <>
      <Button title='Add Break' onPress={toggleOverlay} buttonStyle={styles.button} titleStyle={{color: styles.name.color}} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.modalContainer}>
          <>
          <Text style={styles.pickerLabel}>{props.title}</Text>
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selected}
            style={styles.picker}
            onValueChange={(itemValue) =>
                setSelected(Number(itemValue))
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

export default AddBreakToTrainingModal