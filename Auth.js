import React, {useState, useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default () => {
  const [compatible, setIscompatible] = useState(false);
  const [fingerprints, setHasfingerprints] = useState(false);
  const [result, setResult] = useState(false);

  useEffect(() => {
    checkDeviceForHardware();
    checkForFingerprints();
  }, []);

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    setIscompatible(compatible);
  };

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    setHasfingerprints(fingerprints);
  };

  scanFingerprint = async () => {
    let {success} = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan your finger.",
    });
    console.log("Scan Result:", result);
    setResult(success);
  };

  showAndroidAlert = () => {
    Alert.alert(
      "Fingerprint Scan",
      "Place your finger over the touch sensor and press scan.",
      [
        {
          text: "Scan",
          onPress: () => {
            this.scanFingerprint();
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Compatible Device ? {compatible === true ? "True" : "False"}
      </Text>
      <Text style={styles.text}>
        Fingerprings Saved ? {fingerprints === true ? "True" : "False"}
      </Text>
      <TouchableOpacity
        onPress={
          Platform.OS === "android"
            ? this.showAndroidAlert
            : this.scanFingerprint
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}> SCAN </Text>
      </TouchableOpacity>
      {result ? <Text> You win</Text> : <Text> Scan to win</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: "#ecf0f1",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 60,
    backgroundColor: "#056ecf",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 30,
    color: "#fff",
  },
});
