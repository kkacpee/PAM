import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import OrangeTheme from "../../constants/OrangeTheme";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  title: string
}

export default function DateInputWithModal({ date, setDate, title }: Props) {
  const [isVisible, setVisible] = useState(false);

  const parsedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Input 
        label={title}
        value={parsedDate} 
        editable={false} 
        style={{
            color: OrangeTheme.colors.text,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            textAlign: 'center'
        }}
        inputContainerStyle={{ borderColor: OrangeTheme.colors.border }}
        labelStyle={{
            color: OrangeTheme.colors.text,
            alignSelf: 'center'
        }}/>
      </TouchableOpacity>
      {isVisible && (
        <RNDateTimePicker
          value={date}
          onChange={(e, date) => {
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
