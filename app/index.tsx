import "@/global.css";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const Index = () => {
  const router = useRouter();
  return (
    <View className="flex-1  flex justify-end">
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("@/assets/images/welcome.png")}
        className="h-full w-full absolute"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={{
          width: wp(100),
          height: hp(70),
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          className="flex items-center  py-10"
        >
          <Text
            className="text-white  font-semibold tracking-wide"
            style={{ fontSize: hp(4) }}
          >
            Best Workout ,
            <Text>
              <Text
                className="text-red-600 text-lg font-semibold"
                style={{ fontSize: hp(4) }}
              >
                {" "}
                Best You
              </Text>
            </Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(1500).springify()}>
          <TouchableOpacity
            className="flex-row items-center justify-center bg-red-600 rounded-full px-6 py-3 mx-4"
            onPress={() => {
              router.push("/home");
            }}
          >
            <Text
              className="text-white font-semibold"
              style={{ fontSize: hp(2) }}
            >
              Get Started
            </Text>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default Index;
