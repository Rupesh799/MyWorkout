import { sliderImage } from "@/constants/sliderData";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface ItemCardProps {
  item: ImageSourcePropType;
  index: number;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <View
      style={{
        width: wp("100%") - 10,
        height: hp("25%"),
        borderRadius: 30,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={item}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 30,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

// const router = useRouter()

const ImageCarousel = () => {
  const router = useRouter();
  return (
    <Pressable
      style={{ height: hp(30) }}
      onPress={() => {
        router.push("/workout");
      }}
    >
      <Carousel
        loop
        width={wp("100%")}
        height={hp("30%")}
        autoPlay={true}
        // hasParallaxImages={true}
        data={sliderImage}
        scrollAnimationDuration={1000}
        autoPlayInterval={3000}
        renderItem={({ item, index }) => <ItemCard item={item} index={index} />}
      />
    </Pressable>
  );
};

export default ImageCarousel;
