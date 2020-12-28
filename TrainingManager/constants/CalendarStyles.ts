import { CalendarTheme } from "react-native-calendars";
import OrangeTheme from "./OrangeTheme";
import { StyleSheet } from "react-native";

export const calendarTheme: CalendarTheme = {
  backgroundColor: OrangeTheme.colors.background,
  dayTextColor: OrangeTheme.colors.text,
  arrowColor: OrangeTheme.colors.text,
  monthTextColor: OrangeTheme.colors.text,
  textSectionTitleColor: OrangeTheme.colors.text,
  selectedDayBackgroundColor: OrangeTheme.colors.background,
  selectedDayTextColor: OrangeTheme.colors.primary,
  dotColor: "white",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: OrangeTheme.colors.background,
  },
  list: {
    borderTopColor: OrangeTheme.colors.text,
    borderTopWidth: 1,
    borderBottomWidth: 2,
    overflow: "hidden",
  },
  listContainer: {
    paddingHorizontal: 2,
    paddingTop: 5,
    overflow: "hidden",
  },
  listItem: {
    borderColor: OrangeTheme.colors.border,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 5,
    padding: 5,
    flexDirection: "row",
    overflow: "hidden",
  },
  listItemLabel: {
    color: OrangeTheme.colors.card,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 5,
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    fontSize: 30,
    width: 60,
    height: 60,
    backgroundColor: OrangeTheme.colors.text,
  },
  listItemContent: {
    color: OrangeTheme.colors.text,
    flexWrap: "wrap",
    padding: 2,
    flexShrink: 1,
    alignContent: "stretch",
  },
  listItemTitle: {
    color: OrangeTheme.colors.text,
    fontWeight: "bold",
  },
  listItemText: {
    color: OrangeTheme.colors.text,
    paddingLeft: 5,
    fontSize: 12,
    textAlign: "justify",
  },
  button: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height:70,
    backgroundColor:'#ffa500',
    borderRadius:35,
  },
});
