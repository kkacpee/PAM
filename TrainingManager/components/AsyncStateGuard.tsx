import React from "react";
import { ActivityIndicator, Text, StyleSheet } from "react-native";
import { AsyncState } from "react-use/lib/useAsync";
import OrangeTheme from "../constants/OrangeTheme";

interface Props {
  children: JSX.Element;
  asyncState: AsyncState<any>;
}

export default function AsyncStateGuard({ children, asyncState }: Props) {
  if (asyncState.loading) {
    return (
      <ActivityIndicator 
        size="large"
        color={OrangeTheme.colors.text}
        style={styles.spinner}/>
    );
  } else if (asyncState.error != null) {
    console.log(asyncState.error);
    return (
      <Text style={{ color: OrangeTheme.colors.text }}>
        {"Error: " +
          asyncState.error.message +
          "\n StackTrace: \n" +
          asyncState.error.stack}
      </Text>
    );
  } else {
    return children;
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1
  }
});
