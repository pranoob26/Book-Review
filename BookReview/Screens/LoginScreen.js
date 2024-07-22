import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { firebase } from "../firebase";
import { useAuth } from "../AuthContext"; // Import the AuthContext

const LoginScreen = () => {
  const { setUserEmail } = useAuth(); // Access setUserEmail from the AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user.uid);
        setUserEmail(email); // Store user's email in the context
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login Error:", errorMessage);
      });
  };

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user.uid);
        setUserEmail(email); // Store user's email in the context
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign Up Error:", errorMessage);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/backami.jpg")}
      style={style.backimg}
    >
      <KeyboardAvoidingView style={style.container} behavior="padding">
        <View style={style.heading}>
          <Text style={style.headingtext}>REVIEW iT</Text>
        </View>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={style.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={style.input}
            secureTextEntry
          />

          <View style={style.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={style.button}>
              <Text style={style.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignUp}
              style={[style.button, style.buttonOutline]}
            >
              <Text style={style.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  backimg: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    justifyContent: "center",
  },
  headingtext: {
    marginTop: 200,
    fontSize: 60,
    marginLeft: "15%",
    textAlign: "left",
    color: "white",
    alignItems: "flex-start",
  },
  inputContainer: {
    marginLeft: 20,
    width: "90%",
    marginTop: 10,
    color: "white",
  },
  input: {
    backgroundColor: "burlywood",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    height: 60,
    color: "white",
    fontSize: 25,
    borderColor: "white",
    borderWidth: 2,
  },
  buttonContainer: {
    marginLeft: 40,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    borderColor: "white",
    backgroundColor: "#EE7008",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    height: 58,
    borderWidth: 2,

    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#EE7008",
    marginTop: 8,
    borderColor: "white",
    borderWidth: 2,
    height: 58,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});
