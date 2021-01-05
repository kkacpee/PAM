import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import OrangeTheme from "../../constants/OrangeTheme";
import { View } from "../Themed";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  title: string;
}

export default function DateInputWithModal({ date, setDate, title }: Props) {
  const [isVisible, setVisible] = useState(false);

  const parsedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <>
      <TouchableOpacity onPressIn={() => setVisible(true)}>
        <View style={{backgroundColor: 'transparent'}}>
          <Input
            label={title}
            value={parsedDate}
            editable={false}
            style={{
              color: OrangeTheme.colors.text,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
            inputContainerStyle={{ borderColor: OrangeTheme.colors.border }}
            labelStyle={{
              color: OrangeTheme.colors.text,
              alignSelf: "center",
            }}
          />
        </View>
      </TouchableOpacity>
      {isVisible && (
        <RNDateTimePicker
          value={date}
          onChange={(e, date) => {
            console.log(e);
            setVisible(false);
            if (date) {
              setDate(date);
            }
          }} 
        />
      )}
    </>
  );
}
