import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import Unfollow from "./Unfollow";
import FastImage from "react-native-fast-image";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";
import { LinearGradient } from "expo-linear-gradient";

const Following = ({ user, currentUser }) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      {checkStoriesSeen(user.username, currentUser.email) ? (
        <LinearGradient
          start={[0.9, 0.45]}
          end={[0.07, 1.03]}
          colors={["#ff00ff", "#ff4400", "#ffff00"]}
          style={styles.rainbowBorder}
        >
          <FastImage
            source={{ uri: user.profile_picture }}
            style={styles.image}
          />
        </LinearGradient>
      ) : (
        <FastImage
          source={{ uri: user.profile_picture }}
          style={styles.nonRainbowImage}
        />
      )}
      <View style={styles.userContainer}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <TouchableOpacity onPress={() => handleModal()}>
        <View style={styles.button}>
          <Text style={styles.removeText}>Following</Text>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Unfollow user={user} handleModal={handleModal} />
      </Modal>
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
  },
  rainbowBorder: {
    borderRadius: 100,
    height: 64,
    width: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#000",
  },
  nonRainbowImage: {
    height: 64,
    width: 64,
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 100,
  },
  userContainer: {
    justifyContent: "center",
    marginLeft: -60,
  },
  username: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  name: {
    color: "#999",
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 100,
    borderRadius: 10,
  },
  buttonText: {
    color: "#08f",
    fontWeight: "700",
    fontSize: 14,
  },
  removeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
