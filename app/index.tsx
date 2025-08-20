import "@/global.css";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StatusBar, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const Index = () => {
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
        <View className="flex items-center  py-10">
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
        </View>
      </LinearGradient>
    </View>
  );
};

export default Index;
