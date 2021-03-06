import CalendarController from "../src/controllers/CalendarController";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, CalendarDot, DateObject, MultiDotMarking } from "react-native-calendars";
import { FlatList } from "react-native-gesture-handler";
import AsyncStateGuard from "../components/AsyncStateGuard";
import useAsync from "react-use/lib/useAsync";
import { useIsFocused } from "@react-navigation/native";
import {
  CalendarEntryState,
  CalendarEntryViewModel,
} from "viewmodel/ViewModelTypes";
import { calendarTheme, styles } from "../constants/CalendarStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { CalendarParamList } from "../types";
import useAsyncFn from "react-use/lib/useAsyncFn";

interface Props {
  navigation: StackNavigationProp<CalendarParamList, "AddTrainingPlanScreen">;
}

// IMPORTANT:
// Changing calendar background color requires changing background color in package.
// Path: ./node_modules/react-native-calendars/src/styles.js
// CSS prop: calendarBackground
export default function CalendarScreen({ navigation }: Props) {
  const controller = new CalendarController();
  const currentDate = new Date();
  const [entries, setEntries] = useState<CalendarEntryViewModel[]>([]);
  const trainingsState = useAsync(async () => {
    let entries = await controller.GetCalendarEntriesInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    setEntries(entries.sort((a, b) => a.date.getDate() - b.date.getDate()));
  }, [useIsFocused()]);

  const [state, getEntries] = useAsyncFn(async (date: DateObject) => {
    console.log("On month change starting");
    var entries = await controller.GetCalendarEntriesInMonth(
      date.year,
      date.month - 1 //MAGIC
    );
    setEntries(entries);
  });

  var markedDates = mapEntriesToObject(entries);

  return (
    <View style={styles.container}>
      <Calendar
        theme={calendarTheme}
        markedDates={markedDates}
        markingType={'multi-dot'}
        onMonthChange={(month) => {
          getEntries(month);
        }}
      />
      <AsyncStateGuard state={[trainingsState, state]}>
        <FlatList
          data={entries}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.date.getDate().toString()}
          renderItem={(item) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemLabel}>
                {item.item.date.getDate()}
              </Text>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemTitle}>
                  {item.item.title +
                    mapEntryStateToDisplayText(item.item.state)}
                </Text>
              </View>
            </View>
          )}
        />
      </AsyncStateGuard>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AddTrainingPlanScreen");
        }}
      >
        <Text style={{ fontSize: 60, textAlignVertical: "center" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function mapEntriesToObject(entries: CalendarEntryViewModel[] | undefined) 
: ({
  [date: string]: MultiDotMarking;
}) {
  if (!entries) {
    return {};
  }

  var markedDates : ({
    [date: string]: MultiDotMarking;
  }) = {};
  for (var entry of entries) {
    // Add one day for magic.
    const date = new Date(
      entry.date.getFullYear(), 
      entry.date.getMonth(),
      entry.date.getDate() + 1).toISOString().substring(0, 10);
    const dot = mapEntryStateToDot(entry.state, entry.idTrainingPlan.toString()+entry.title);
    const currentDots = markedDates[date]?.dots ?? [];
    markedDates[date] = { dots: [...currentDots, dot] };
  }

  return markedDates;
}

function mapEntryStateToDot(state: CalendarEntryState, key: string) : CalendarDot {
  switch (state) {
    case "finished":
      return {key: key, color: "green"};
    case "missed":
      return {key: key, color: "red"};
    case "notStarted":
      return {key: key, color: "blue"};
    default:
      throw new Error("Unrecognized calendar entry state.");
  }
}

function mapEntryStateToDisplayText(state: CalendarEntryState) {
  switch (state) {
    case "finished":
      return " (Finished)";
    case "missed":
      return " (Missed)";
    case "notStarted":
      return "";
    default:
      throw new Error("Unrecognized calendar entry state.");
  }
}
