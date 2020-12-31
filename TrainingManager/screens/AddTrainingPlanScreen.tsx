import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, CheckBox, Input } from "react-native-elements";
import OrangeTheme from "../constants/OrangeTheme";
import styles from "../constants/AddScreenStyles";
import AsyncStateGuard from "../components/AsyncStateGuard";
import useAsync from "react-use/lib/useAsync";
import TrainingController from "../src/controllers/TrainingController";
import { useIsFocused } from "@react-navigation/native";
import DateInputWithModal from "../components/Modals/DateInputWithModal";
import { TabBar, TabView } from "react-native-tab-view";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { StackNavigationProp } from "@react-navigation/stack";
import { AtlasParamList } from "../types";
import { AddTrainingPlanViewModel } from "viewmodel/ViewModelTypes";

const defaultDays = [
  {
    name: "Monday",
    trainingId: -1,
    key: "1",
  },
  {
    name: "Tuesday",
    trainingId: -1,
    key: "2",
  },
  {
    name: "Wednesday",
    trainingId: -1,
    key: "3",
  },
  {
    name: "Thursday",
    trainingId: -1,
    key: "4",
  },
  {
    name: "Friday",
    trainingId: -1,
    key: "5",
  },
  {
    name: "Saturday",
    trainingId: -1,
    key: "6",
  },
  {
    name: "Sunday",
    trainingId: -1,
    key: "0",
  },
];

const noTrainingDummy = {
  id: -1,
  name: "No training",
  description: "",
  iconName: "",
  isActive: true,
  isFavourite: false,
  history: [],
  exercises: [],
  entries: [],
};

interface Props {
  navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">;
}

export default function AddTrainingPlanScreen({ navigation }: Props) {
  const controller = new TrainingController();

  // MODEL
  const [name, setName] = useState("");
  const [notification, setNotification] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [days, setDays] = useState(defaultDays);

  const model = {
    name: name,
    notification: notification,
    dateFrom: dateFrom,
    dateTo: dateTo,
    entryModels: days
      .filter((x) => x.trainingId !== -1)
      .map((value) => ({
        dayOfWeek: value.name,
        idTraining: value.trainingId,
      })),
  };
  // END MODEL

  // DATA
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "info", title: "Information" },
    { key: "trainings", title: "Trainings" },
  ]);
  // END DATA

  // ASYNC
  const [savingState, AddTrainingPlanAsync] = useAsyncFn(
    async (model: AddTrainingPlanViewModel) => {
      await controller.AddTrainingPlanAsync(model);
      navigation.navigate("TrainingsScreen");
    }
  );

  const trainingsState = useAsync(async () => {
    let trainings = await controller.GetAllTrainings();
    trainings.push(noTrainingDummy);
    return trainings;
  }, [useIsFocused()]);
  // END ASYNC

  // FUNCTION
  const trainingPickerItems = trainingsState.value?.map((s, i) => {
    return <Picker.Item key={i} value={s.id} label={s.name} />;
  });

  const setItem = (dayName: string, trainingId: number) => {
    var items = days.filter((x) => x.name !== dayName);
    var index = controller.mapDayOfWeek(dayName).toString();
    setDays([...items, { name: dayName, trainingId: trainingId, key: index }]);
  };
  // END FUNCTION

  const infoRoute = () => (
    <View style={styles.container}>
      <Input
        label="Name"
        labelStyle={styles.inputLabel}
        value={name}
        onChangeText={(itemValue) => setName(itemValue)}
        inputStyle={styles.input}
        inputContainerStyle={{ borderColor: OrangeTheme.colors.border }}
      />
      <CheckBox
        checkedColor={styles.input.color}
        uncheckedColor={styles.input.color}
        textStyle={styles.inputLabel}
        containerStyle={styles.checkBoxContainer}
        title={"Notifications"}
        checked={notification}
        onPress={() => setNotification(!notification)}
      />
      <DateInputWithModal
        title={"Date from"}
        date={dateFrom}
        setDate={setDateFrom}
      />
      <DateInputWithModal
        title={"Date to"}
        date={dateTo}
        setDate={setDateTo}
      />
    </View>
  );

  const trainingsRoute = () => (
    <View
      style={{
        width: "90%",
        height: "90%",
        alignSelf: "center",
        marginTop: 20,
      }}
    >
      <FlatList
        data={days}
        contentContainerStyle={{
          paddingVertical: 2,
        }}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderColor: OrangeTheme.colors.text,
          borderWidth: 1,
          borderRadius: 4,
        }}
        scrollEnabled={false}
        renderItem={(item) =>
          renderTrainingItem(item, setItem, trainingPickerItems!)
        }
      />
    </View>
  );

  const renderScene = ({
    route,
  }: {
    route: { key: string; title: string };
  }) => {
    switch (route.key) {
      case "info":
        return infoRoute();
      case "trainings":
        return trainingsRoute();
      default:
        return <Text>Invalid routing.</Text>;
    }
  };

  return (
    <AsyncStateGuard state={[trainingsState, savingState]}>
      <ImageBackground
        source={require("../assets/images/AddBg.png")}
        style={styles.image}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{ borderColor: OrangeTheme.colors.text, borderBottomWidth: 1 }}
          renderTabBar={renderTabBar}
        />

        <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
          <Button
            title="Add"
            type="outline"
            titleStyle={{ color: OrangeTheme.colors.text }}
            buttonStyle={styles.addButton}
            onPress={() => AddTrainingPlanAsync(model)}
          />
        </View>
      </ImageBackground>
    </AsyncStateGuard>
  );
}

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    style={{
      backgroundColor: OrangeTheme.colors.background,
    }}
    labelStyle={{
      color: OrangeTheme.colors.text,
    }}
    indicatorStyle={{
      backgroundColor: OrangeTheme.colors.text,
    }}
  />
);

const renderTrainingItem = (
  itemInfo: ListRenderItemInfo<{ name: string; trainingId: number; key: string }>,
  setItem: (dayName: string, id: number) => void,
  pickerItems: JSX.Element[]
) => {
  return (
    <View 
      style={{
        backgroundColor: OrangeTheme.colors.background,
        borderColor: OrangeTheme.colors.text,
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: 5,
        marginVertical: 2,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: OrangeTheme.colors.text,
          width: 100,
        }}
      >
        {itemInfo.item.name}
      </Text>
      <Picker
        selectedValue={itemInfo.item.trainingId}
        onValueChange={(itemValue) => setItem(itemInfo.item.name, itemInfo.item.trainingId)}
        style={{
          height: 40,
          flex: 1,
          color: OrangeTheme.colors.text,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: OrangeTheme.colors.text,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        {pickerItems}
      </Picker>
      <Button
        title={"X"}
        buttonStyle={{
          backgroundColor: OrangeTheme.colors.text,
          width: 30,
          height: 30,
        }}
        onPress={() => setItem(itemInfo.item.name, -1)}
        titleStyle={{
          color: OrangeTheme.colors.background,
        }}
      />
    </View>
  );
};
