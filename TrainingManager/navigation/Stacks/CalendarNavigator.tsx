import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../../screens/CalendarScreen";
import { CalendarParamList } from "../../types";

const CalendarStack = createStackNavigator<CalendarParamList>();

export default function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ headerTitle: 'CALENDAR' }}
      />
    </CalendarStack.Navigator>
  );
}