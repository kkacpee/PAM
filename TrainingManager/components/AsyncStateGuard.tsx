import React from "react";
import { ActivityIndicator, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AsyncState } from "react-use/lib/useAsync";
import OrangeTheme from "../constants/OrangeTheme";

interface Props {
  children: JSX.Element;
  state: AsyncState<any> | Array<AsyncState<any>>;
}

export default function AsyncStateGuard({ children, state }: Props) {
  const states = state instanceof Array ? state : [state];
  const isLoading = states.find((value) => value.loading) != null;
  const erronousStates = states.filter((value) => value.error != null);
  const errorMsg = erronousStates.reduce(
    (prev, cur) => (prev = prev + cur.error?.message + "\n"),
    ""
  );
  const stackTraces = erronousStates.reduce(
    (prev, cur) => (prev = prev + cur.error?.stack + "\n"),
    ""
  );

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={OrangeTheme.colors.text}
        style={styles.spinner}
      />
    );
  } else if (errorMsg.length != 0) {
    console.log(errorMsg);
    return (
      <ScrollView>
        <Text style={{ color: OrangeTheme.colors.text }}>
          {"Error: \n" + errorMsg + "\n" + stackTraces}
        </Text>
      </ScrollView>
    );
  } else {
    return children;
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});
