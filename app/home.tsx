import Excercises from "@/components/Excercises";
import ImageCarousel from "@/components/ImageCarousel";
import React from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white space-y-5 " edges={["top"]}>
      <StatusBar barStyle={"dark-content"} />

      <View className="flex-row justify-between items-center mx-4">
        {/* title */}
        <Animated.View
          entering={FadeInLeft.duration(2000).springify()}
          className="space-y-6 pt-4"
        >
          <Text
            className="uppercase font-bold tracking-wider text-slate-700"
            style={{ fontSize: hp(4.5) }}
          >
            ready to
          </Text>
          <Text
            className=" uppercase tracking-wider text-red-500 font-bold"
            style={{ fontSize: hp(4.5) }}
          >
            workout
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInRight.duration(2000).springify()}>
          <Image
            source={require("@/assets/images/avatar.png")}
            className="w-12 h-12 rounded-full"
          />
        </Animated.View>
      </View>

      <View className="mx-2 pt-6">
        <ImageCarousel />
      </View>

      <View className="flex-1">
        <Excercises />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
