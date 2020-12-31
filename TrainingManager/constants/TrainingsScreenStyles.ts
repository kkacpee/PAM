import { StyleSheet } from "react-native";
import OrangeTheme from "./OrangeTheme";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 5,
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  row: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    flex: 0.2,
    flexDirection: "row",
    padding: 5,
  },
  column: {
    height: "100%",
    width: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingBottom: 40,
    justifyContent: "center",
    borderColor: OrangeTheme.colors.border,
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 0,
    flex: 1,
    flexDirection: "column",
    borderRadius: 20,
  },
  icon: {
    alignSelf: "center",
  },
  item: {
    margin: 10,
    borderRadius: 40,
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: "#ffa500",
    borderRadius: 100,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  headerText: {
    color: OrangeTheme.colors.text,
    alignSelf: "center",
    fontSize: 20,
  },
});

export default styles;
