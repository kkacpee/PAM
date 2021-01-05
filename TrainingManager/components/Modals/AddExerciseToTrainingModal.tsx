import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, Input, Overlay } from "react-native-elements";
import styles from "../../constants/TrainingDetailsStyles";
import OrangeTheme from "../../constants/OrangeTheme";
import TrainingController from "../../src/controllers/TrainingController";
import AsyncStateGuard from "../AsyncStateGuard";
import { Exercise } from "../../src/data/models/Exercise";
import { useIsFocused } from "@react-navigation/native";
import useAsync from "react-use/lib/useAsync";

export interface Props {
  title: string;
  fnc: (exercise: Exercise, reps: number, series: number, time: number) => void;
}

const AddExerciseToTrainingModal: React.FC<Props> = (props) => {
  var controller = new TrainingController();

  const [visible, setVisible] = useState(false);
  const [exerciseId, setExerciseId] = useState(1);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [time, setTime] = useState(0);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const state = useAsync(async () => {
    console.log("begin load");
    return await controller.GetAllExercisesAsync();
  }, [useIsFocused()]);
  console.log(state.value);
  const exercises = state.value;
  const currentType = exercises?.find((x) => x.id === exerciseId)?.type.name;
  console.log(currentType);
  let exercisePickerItems = exercises?.map((s, i) => {
    return <Picker.Item key={i} value={s.id} label={s.name} />;
  });

  const getCurrentExercise = () => {
    let exercise = exercises?.find((value) => value.id === exerciseId);
    if (exercise) {
      return exercise;
    } else {
      // Shouldn't happen
      return exercises![0];
    }
  };

  return (
    <>
      <Button
        title="Add exercise"
        onPress={toggleOverlay}
        buttonStyle={{
          marginBottom: 4,
          borderWidth: 1,
          borderColor: OrangeTheme.colors.border,
          borderRadius: 4,
          backgroundColor: OrangeTheme.colors.background,
        }}
        titleStyle={{ color: styles.name.color }}
      />

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.modalContainer}
      >
        <AsyncStateGuard state={state}>
          <>
            <Text style={styles.pickerLabel}>{props.title}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={exercises?.find((x) => x.id === exerciseId)?.id}
                style={styles.picker}
                onValueChange={(itemValue) => setExerciseId(Number(itemValue))}
                itemStyle={styles.item}
              >
                {exercisePickerItems}
              </Picker>
            </View>
            {currentType?.toLowerCase() == "reps" ? (
              <View>
                <Input
                  label="Reps"
                  labelStyle={styles.inputLabel}
                  value={reps.toString()}
                  onChangeText={(value) => setReps(Number(value))}
                  inputStyle={styles.input}
                  inputContainerStyle={{ borderColor: styles.input.color }}
                />
                <Input
                  label="Sets"
                  labelStyle={styles.inputLabel}
                  value={sets.toString()}
                  onChangeText={(value) => setSets(Number(value))}
                  inputStyle={styles.input}
                  inputContainerStyle={{ borderColor: styles.input.color }}
                />
              </View>
            ) : (
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
            )}
            <Button
              title="Ok"
              onPress={() => {
                props.fnc(getCurrentExercise(), reps, sets, time);
                toggleOverlay();
              }}
              buttonStyle={styles.modalOkButton}
              titleStyle={{ color: styles.name.color }}
            />
          </>
        </AsyncStateGuard>
      </Overlay>
    </>
  );
};

export default AddExerciseToTrainingModal;
