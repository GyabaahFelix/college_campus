import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'

type TextInputFieldProps={
    label: string,
    onchangeText:(text:string)=>void,
    password?:boolean
}
export default function TextInputField({label,onchangeText,password=false}:TextInputFieldProps) {
  return (
    <View style={{
        marginTop: 15
    }}>
      <Text style={{color: Colors.GRAY}}>{label}</Text>
      <TextInput placeholder={label} style={styles.textInput} secureTextEntry={password}
      />
     
    </View>
  )
}

const styles = StyleSheet  .create({
    textInput: {
        padding: 15,
        borderWidth: 0.3,
        borderRadius: 5,
        marginTop: 5,
        fontSize: 17
    }
})