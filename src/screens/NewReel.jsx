import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Animated, { FadeIn, ZoomInDown } from "react-native-reanimated";
import { SIZES } from "../constants";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import useUploadStory from "../hooks/useUploadStory";
import useResizePictures from "../hooks/useResizePictures";
import FastImage from "react-native-fast-image";
import { Video, ResizeMode } from "expo-av";

const NewReel = ({ navigation, route }) => {
  const { selectedImage } = route.params || {};
  const { uploadStory, loader } = useUploadStory();
  const { resizeStoryPicture } = useResizePictures();
  const { currentUser } = useUserContext();

  const [opacity, setOpacity] = useState(0);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [videoUri, setVideoUri] = useState();

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 400);
  }, []);

  const handleSubmitButton = async () => {
    Alert.alert(
      "Upload not allowed",
      "We apologize, but the upload is currently unavailable due to server storage limitations."
    );
    navigation.navigate("Main Screen");
  };

  return (
    <View style={[styles.container, { opacity: opacity }]}>
      <View style={styles.imageContainer}>
        <Animated.View
          style={styles.topButtonsContainer}
          entering={ZoomInDown.duration(550)}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonContainer}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={"#fff"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <View style={styles.modButtonsContainer}>
            <TouchableOpacity style={styles.modButtonContainer}>
              <Feather name="volume-2" size={28} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modButtonContainer}>
              <Text style={styles.modButtonText}>Aa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modButtonContainer}>
              <MaterialCommunityIcons
                name="sticker-emoji"
                size={27}
                color={"#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modButtonContainer}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={27}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.Image
          source={{ uri: selectedImage.uri }}
          style={styles.image}
          sharedTransitionTag={selectedImage.id.toString()}
        />
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: selectedImage.localUri,
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          isMuted={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      <Animated.View
        style={styles.bottomButtonsContainer}
        entering={FadeIn.duration(1000)}
      >
        <TouchableOpacity style={styles.userContainer}>
          <FastImage
            source={{ uri: currentUser.profile_picture }}
            style={styles.userImage}
          />
          <Text style={styles.userText}>Your story</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userContainer}>
          <View style={styles.iconBorder}>
            <MaterialIcons name="stars" size={23} color={"#3b3"} />
          </View>
          <Text style={styles.userText}>Close Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSubmitButton()}
          style={styles.nextButtonContainer}
        >
          <Ionicons name="arrow-forward" size={30} color={"#000"} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default NewReel;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight,
    backgroundColor: "#000",
    flex: 1,
  },
  topButtonsContainer: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginTop: -50,
    top: 56,
    marginHorizontal: 12,
  },
  modButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  modButtonContainer: {
    height: 44,
    width: 44,
    borderRadius: 100,
    backgroundColor: "#484040",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.92,
  },
  modButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
  image: {
    position: "absolute",
    top: -5,
    width: "100%",
    height: SIZES.Height * 0.825,
    resizeMode: "cover",
    borderRadius: 25,
    zIndex: -1,
  },
  video: {
    width: "100%",
    height: SIZES.Height * 0.825,
    borderRadius: 25,
  },
  backButtonContainer: {
    height: 45,
    width: 45,
    borderRadius: 100,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444040",
    opacity: 0.99,
  },
  buttonIcon: {
    paddingLeft: 10,
  },
  bottomButtonsContainer: {
    height: SIZES.Height * 0.08,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userContainer: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: "#333",
  },
  userImage: {
    height: 26,
    width: 26,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  nextButtonContainer: {
    backgroundColor: "#fff",
    height: 45,
    width: 45,
    borderRadius: 100,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  iconBorder: {
    backgroundColor: "#fff",
    borderRadius: 100,
  },
});

// import * as React from "react";
// import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
// import { Video, ResizeMode } from "expo-av";

// const NewReel = ({ navigation, route }) => {
//   const { selectedImage } = route.params || {};

//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Text style={{ color: "#fff", marginTop: 50 }}>CANCEL</Text>
//       </TouchableOpacity>
//       <Video
//         ref={video}
//         style={styles.video}
//         source={{
//           uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
//         }}
//         // useNativeControls
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping
//         isMuted={false}
//         onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//       />
//       <View style={styles.buttons}>
//         <Button
//           title={status.isPlaying ? "Pause" : "Play"}
//           onPress={() =>
//             status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
//           }
//         />
//       </View>
//     </View>
//   );
// };

// export default NewReel;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   video: {
//     height: 300,
//     width: 300,
//   },
// });
