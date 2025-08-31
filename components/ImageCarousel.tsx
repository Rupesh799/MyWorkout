import { sliderImage } from "@/constants/sliderData";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

interface ItemCardProps {
  item: ImageSourcePropType;
  index: number;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <View
      className="rounded-2xl overflow-hidden justify-center items-center"
      style={{
        width: width - 10,
        height: height * 0.25, // 25% of screen height
      }}
    >
      <Image
        source={item}
        className="w-full h-full rounded-2xl"
        resizeMode="cover"
      />
    </View>
  );
};

const ImageCarousel = () => {
  const router = useRouter();
  return (
    <Pressable
      style={{ height: height * 0.3 }} // 30% of screen height
      onPress={() => {
        router.push("/workout");
      }}
    >
      <Carousel
        loop
        width={width}
        height={height * 0.3}
        autoPlay
        data={sliderImage}
        scrollAnimationDuration={1000}
        autoPlayInterval={3000}
        renderItem={({ item, index }) => <ItemCard item={item} index={index} />}
      />
    </Pressable>
  );
};

export default ImageCarousel;
