import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/data/Colors";
import TextInputField from "@/components/Shared/TextInputField";
import Button from "@/components/Shared/Button";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/FirebaseConfig";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/configs/CloudinaryConfig";
import axios from "axios";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const onBtnPress = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show("Please enter all details!", ToastAndroid.BOTTOM);
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        console.log(userCredentials);

        // Upload Profile Image
        await upload(cld, {
          file: profileImage,
          options: options,
          callback: async (error: any, response: any) => {
            if (error) {
              console.log(error);
            }
            if (response) {
              console.log(response?.url);
              const result = await axios.post(
                process.env.EXPO_PUBLIC_HOST_URL + "/user",
                {
                  name: fullName,
                  email: email,
                  image: response?.url,
                }
              );
              console.log(result);
              setLoading(false);
              // Route to Homescreen
              router.push("/landing");
            }
          },
        });
      })
      .catch((error) => {
        setLoading(false);
        const errorMsg = error?.message;
        ToastAndroid.show(errorMsg, ToastAndroid.BOTTOM);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        paddingTop: 60,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Create New Account
      </Text>

      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <View>
          <TouchableOpacity onPress={() => pickImage()}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Image
                source={require("./../../assets/images/profile.png")}
                style={styles.profileImage}
              />
            )}
            <Ionicons
              name="camera"
              size={24}
              color={Colors.PRIMARY}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TextInputField label="Full Name" onchangeText={(v) => setFullName(v)} />
      <TextInputField label="Email" onchangeText={(v) => setEmail(v)} />
      <TextInputField label="Password" password={true} onchangeText={(v) => setPassword(v)} />

      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 10 }} />}

      <Button text="Create Account" onPress={onBtnPress} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
    marginTop: 20,
  },
});