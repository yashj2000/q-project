import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import useHandleFollow from "../../hooks/useHandleFollow";
import FastImage from "react-native-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import useCheckStoriesSeen from "../../hooks/useCheckStoriesSeen";
import Unfollow from "../follow/Unfollow";

const Follow = ({ user, currentUser }) => {
  const { checkStoriesSeen } = useCheckStoriesSeen();
  const { handleFollow } = useHandleFollow({ user });
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
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
          <View style={styles.rowContainer}>
            <Text style={styles.username}>{user.username}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>

      {user.username ===
      currentUser.username ? null : currentUser.following.includes(
          user.email
        ) ? (
        <TouchableOpacity onPress={() => handleModal()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Following</Text>
          </View>
        </TouchableOpacity>
      ) : currentUser.following_request.includes(user.email) ? (
        <TouchableOpacity onPress={() => handleFollow()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Requested</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleFollow()}>
          <View style={styles.blueButton}>
            <Text style={styles.buttonText}>Follow</Text>
          </View>
        </TouchableOpacity>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Unfollow user={user} handleModal={handleModal} />
      </Modal>
    </View>
  );
};

export default Follow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: "row",
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
  },
  username: {
    marginLeft: 12,
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  name: {
    marginTop: 3,
    marginLeft: 12,
    color: "#999",
    fontSize: 13,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 90,
    borderRadius: 10,
  },
  blueButton: {
    backgroundColor: "#08f",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 90,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});
