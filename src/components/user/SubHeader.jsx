import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import BottomSheetFollowing from "./bottomSheets/BottomSheetFollowing";
import useHandleFollow from "../../hooks/useHandleFollow";
import FastImage from "react-native-fast-image";
import useChatAddUser from "../../hooks/useChatAddUser";

const SubHeader = ({ user, navigation, numberOfPosts }) => {
  const { currentUser } = useUserContext();
  const { handleFollow } = useHandleFollow();
  const { chatAddUser } = useChatAddUser();
  const bottomSheetRefFollowing = useRef(null);

  const handleFollowingModal = () => {
    bottomSheetRefFollowing.current.present();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.userContainer}>
          <TouchableOpacity>
            <FastImage
              source={{ uri: user.profile_picture }}
              style={styles.userImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialColumn}>
            <Text style={styles.socialBoldText}>{numberOfPosts}</Text>
            <Text style={styles.socialText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UserFollow", { user: user })}
            style={styles.socialColumn}
          >
            <Text style={styles.socialBoldText}>
              {user.followers && user.followers.length > 0
                ? user.followers.length
                : 0}
            </Text>
            <Text style={styles.socialText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UserFollow", { user: user })}
            style={styles.socialColumn}
          >
            <Text style={styles.socialBoldText}>
              {user.following && user.following.length > 0
                ? user.following.length
                : 0}
            </Text>
            <Text style={styles.socialText}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.usernameText}>{user.name}</Text>
      {user.bio && user.bio.length > 0 && (
        <Text style={styles.bioText}>{user.bio}</Text>
      )}
      {user.link && user.link.length > 0 && (
        <Text style={styles.bioText}>{user.link}</Text>
      )}

      <View style={styles.btnContainers}>
        {currentUser.following && currentUser.following.includes(user.email) ? (
          <TouchableOpacity
            onPress={() => handleFollowingModal()}
            style={styles.btnWrapper}
          >
            <Text style={styles.btnText}>Following</Text>
            <MaterialIcons name="keyboard-arrow-down" size={22} color="#fff" />
          </TouchableOpacity>
        ) : currentUser.following_request &&
          currentUser.following_request.includes(user.email) ? (
          <TouchableOpacity
            onPress={() => handleFollow(user.email)}
            style={styles.btnWrapper}
          >
            <Text style={styles.btnText}>Requested</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleFollow(user.email)}
            style={styles.btnWrapperBlue}
          >
            <Text style={styles.btnText}>Follow</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            chatAddUser(user);
            navigation.navigate("Chating", { user: user });
          }}
          style={styles.btnWrapper}
        >
          <Text style={styles.btnText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => chatAddUser(user)}
          style={styles.btnAddUser}
        >
          <AntDesign name="adduser" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
      <BottomSheetFollowing
        bottomSheetRef={bottomSheetRefFollowing}
        currentUser={currentUser}
        user={user}
        handleFollow={handleFollow}
      />
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userContainer: {
    alignItems: "flex-start",
  },
  userImage: {
    height: 84,
    width: 84,
    borderRadius: 100,
  },
  usernameText: {
    color: "#fff",
    fontSize: 14.5,
    fontWeight: "500",
    marginTop: 10,
  },
  bioText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 4,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    marginRight: 12,
    gap: 24,
  },
  socialColumn: {
    alignItems: "center",
  },
  socialBoldText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  socialText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 14,
  },
  btnContainers: {
    marginTop: 24,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnWrapper: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
  },
  btnWrapperBlue: {
    flexDirection: "row",
    backgroundColor: "#07f",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
  },
  btnAddUser: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    width: 36,
  },
  btnText: {
    color: "#fff",
    fontSize: 13.5,
    fontWeight: "600",
    paddingVertical: 8,
  },
});
