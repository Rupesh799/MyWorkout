import { ExcercisesData } from "@/constants/sliderData";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24; // 2 columns with margin

const Excercises = () => {
  return (
    <View className="flex-1 bg-white px-4">
      <Text className="text-xl font-bold text-slate-700 pb-4">Exercises</Text>

      <FlatList
        keyExtractor={(item) => item.name}
        data={ExcercisesData}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 20 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        renderItem={({ item, index }) => (
          <ExcerciseCard item={item} index={index} />
        )}
      />
      {/* <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
          paddingTop: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      >
        {ExcercisesData.map((item, index) => (
          <ExcerciseCard key={item.name} item={item} index={index} />
        ))}
      </ScrollView> */}
    </View>
  );
};

export default Excercises;

const ExcerciseCard = ({ item }: { item: any; index: number }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="rounded-2xl overflow-hidden shadow-md"
      style={{ width: CARD_WIDTH, height: 200 }}
    >
      <Image
        source={item.image}
        className="w-full h-full rounded-2xl"
        resizeMode="cover"
      />

      {/* Bottom Gradient */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <View className="flex-1 justify-end px-2 pb-2">
          <Text className="text-white font-bold text-xl">{item.name}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
