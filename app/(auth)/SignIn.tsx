import { View, Text, Image, Pressable, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import TextInputField from "@/components/Shared/TextInputField";
import Button from "@/components/Shared/Button";
import Colors from "@/data/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/FirebaseConfig";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const onSignInBtnClick = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter email & password!", ToastAndroid.BOTTOM);
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        if (resp.user) {
          console.log(resp.user.email);
          // API to fetch user data
          const result = await axios.get(
            process.env.EXPO_PUBLIC_HOST_URL + "/user?email=" + resp.user?.email
          );
          console.log(result.data);
          setUser(result?.data);
          // Save to Context to share across application
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        ToastAndroid.show("Incorrect email & Password", ToastAndroid.BOTTOM);
      });
  };
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
      <TextInputField label="College Email" onchangeText={(v) => setEmail(v)} />
      <TextInputField
        label="Password"
        password={true}
        onchangeText={(v) => setPassword(v)}
      />

      <Button
        text="Sign In"
        onPress={() => onSignInBtnClick()}
        loading={loading}
      />
      <Pressable onPress={() => router.push("/(auth)/SignUp")}>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: Colors.GRAY,
            marginTop: 7,
          }}
        >
          New to College Campus App? Create Account Here
        </Text>
      </Pressable>
    </View>
  );
}
