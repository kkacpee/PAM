import React, { useState } from 'react';


import { Button, Input, Overlay } from 'react-native-elements';
import styles from '../../constants/AddScreenStyles';

export interface Props {
  title: string,
  fnc:(name:string) => void
}

const AddMiscModal: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button title=" + " onPress={toggleOverlay} buttonStyle={styles.plusButton} titleStyle={{color: styles.input.color}}/>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.modalContainer}>
          <>
        <Input
          label={`${props.title} Name`}
          labelStyle={styles.inputLabel}
          value={name}
          onChangeText={setName}
          inputStyle={styles.input}
          inputContainerStyle={styles.item}
        />
        <Button title="Ok" onPress={() => {props.fnc(name)}} 
        buttonStyle={styles.modalOkButton}
        titleStyle={{color: styles.input.color}}
        />
              </>
      </Overlay>
    </>
  );
};

export default AddMiscModal