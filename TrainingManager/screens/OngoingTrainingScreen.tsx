import * as React from "react";
import styles from "../constants/OngoingTrainingScreenStyles";
import { ImageBackground } from "react-native";
import { Text, View } from "../components/Themed";
import TimedWorkout from "../components/TimedWorkout";
import CountedWorkout from "../components/CountedWorkout";
import WorkoutDone from "../components/WorkoutDone";
import { Audio } from "expo-av";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import HomeController from "../src/controllers/HomeController";
import useAsync from "react-use/lib/useAsync";
import { OngoingTrainingViewModel } from "viewmodel/ViewModelTypes";
import AsyncStateGuard from "../components/AsyncStateGuard";
import { Interface } from "readline";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeParamList } from "../types";
import { ScrollView } from "react-native-gesture-handler";
import useAsyncFn from "react-use/lib/useAsyncFn";

interface exercise {
  name: string;
  repCount: number;
  setCount: number;
  time: number;
  isTimed: boolean;
}

const items: exercise[] = [
  {
    name: "ex1",
    repCount: 12,
    setCount: 3,
    time: 0,
    isTimed: false,
  },
  {
    name: "ex2",
    repCount: 10,
    setCount: 5,
    time: 0,
    isTimed: false,
  },
  {
    name: "ex3",
    repCount: 8,
    setCount: 6,
    time: 0,
    isTimed: false,
  },
  {
    name: "ex4",
    repCount: 0,
    setCount: 0,
    time: 5,
    isTimed: true,
  },
  {
    name: "ex5",
    repCount: 0,
    setCount: 0,
    time: 10,
    isTimed: true,
  },
  {
    name: "ex6",
    repCount: 20,
    setCount: 3,
    time: 0,
    isTimed: false,
  },
];

interface Props {
  navigation: StackNavigationProp<HomeParamList, "OngoingTrainingScreen">;
  route: RouteProp<HomeParamList, "OngoingTrainingScreen">;
}

export default function OngoingTrainingScreen({ navigation, route }: Props) {
  const [exercises, setExercises] = React.useState<OngoingTrainingViewModel>(
    items
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [min, setMin] = React.useState("");
  const [sec, setSec] = React.useState("");
  const [reps, setReps] = React.useState(10);
  const [sets, setSets] = React.useState(5);
  const [end, setEnd] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [sound, setSound] = React.useState();
  const [soundPlayed, setSoundPlayed] = React.useState(false);
  const [newExercise, setNewExercise] = React.useState(false);

  const controller = new HomeController();
  const state = useAsync(async () => {
    const model = await controller.GetTodaysTraining(route.params.trainingId);
    setExercises(model);
  }, [useIsFocused()]);

  const [doneState, registerFinishedTraining] = useAsyncFn(async () => {
    await controller.RegisterFinishedTraining(
      route.params.trainingId,
      route.params.trainingPlanId
    );
    setEnd(true);
  });

  React.useEffect(() => {
    if (state.loading || state.error) {
      return;
    }
    let intervalId;
    if (newExercise) {
      setCounter(exercises[currentIndex].time);
      setSecondsAndMinutes(exercises[currentIndex].time);
      setReps(exercises[currentIndex].repCount);
      setSets(exercises[currentIndex].setCount);
      setNewExercise(false);
    }

    if (isActive) {
      intervalId = setInterval(() => {
        setSecondsAndMinutes(counter);

        if (counter === 0) {
          setIsActive(false);
          if (!soundPlayed) {
            playSound();
            setSoundPlayed(true);
          }
          handleSetCurrentIndex();
        } else {
          setCounter((counter) => counter - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId), unloadSound;
    };
  }, [isActive, counter, sound, currentIndex, sec, state]);

  const unloadSound = () => {
    return sound
      ? () => {
          console.log("Unloading Sound");
        }
      : undefined;
  };

  const handleDoneButton = () => {
    if (sets > 0) setSets(sets - 1);
    else handleSetCurrentIndex();
  };

  const handleSetCurrentIndex = () => {
    if (currentIndex + 1 < exercises.length) {
      setNewExercise(true);
      setCurrentIndex(currentIndex + 1);
    } else {
      registerFinishedTraining();
    }
  };

  const handelStop = () => {
    setCounter(0);
    setSec("00");
    setMin("00");
    setIsActive(false);
  };

  const setSecondsAndMinutes = (number: number) => {
    const secondCounter = counter % 60;
    const minuteCounter = Math.floor(counter / 60);

    const computedSecond =
      String(secondCounter).length === 1
        ? `0${secondCounter}`
        : String(secondCounter);
    const computedMinute =
      String(minuteCounter).length === 1
        ? `0${minuteCounter}`
        : String(minuteCounter);

    setSec(computedSecond);
    setMin(computedMinute);
  };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/default.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  return (
    <AsyncStateGuard state={[state, doneState]}>
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/images/WorkoutBg.png")}
            style={styles.image}
          >
            <View style={styles.column}>
              <Text style={styles.content}>
                Next:{" "}
                {exercises.length > currentIndex + 1
                  ? exercises[currentIndex + 1].name
                  : "End"}
              </Text>
              <Text style={styles.headerToday}>
                {exercises[currentIndex].name}
              </Text>

              {!end ? (
                exercises[currentIndex].isTimed ? (
                  <TimedWorkout
                    seconds={sec}
                    minutes={min}
                    isActive={isActive}
                    handleStop={handelStop}
                    setIsActive={setIsActive}
                  />
                ) : (
                  <CountedWorkout
                    reps={reps}
                    sets={sets}
                    handleDoneButton={handleDoneButton}
                  />
                )
              ) : (
                <WorkoutDone />
              )}
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </AsyncStateGuard>
  );
}
