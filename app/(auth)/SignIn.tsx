import { View, Text, Image } from "react-native";
import React from "react";
import TextInputField from "@/components/Shared/TextInputField";
import Button from "@/components/Shared/Button";

export default function SignIn() {

  const onSignInBtnClick=()=>{
    
  }

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Image
          source={require("./../../assets/images/logo.png")}
          style={{
            width: 250,
            height: 250,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Sign In To college Campus
        </Text>
      </View>
      <TextInputField
        label="College Email"
        onchangeText={(v) => console.log(v)}
      />
      <TextInputField label="Password" onchangeText={(v) => console.log(v)} />

        <Button text="Sign In" onPress={()=>onSignInBtnClick()}/>
    </View>
  );
}
