import React from "react";
import { ActivityIndicator, Text, StyleSheet } from "react-native";
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
  let errorMsg = erronousStates.reduce(
    (prev, cur) => (prev = prev + cur.error?.message + "\n"),
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
      <Text style={{ color: OrangeTheme.colors.text }}>
        {"Error: \n" + errorMsg}
      </Text>
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
