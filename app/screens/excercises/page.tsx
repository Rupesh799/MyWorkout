import { getBodyPartWorkouts, getWorkoutGIf } from "@/api/excercises";
import WorkoutList from "@/components/WorkoutList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";

const ExcercisesListPage = () => {
  const [exercises, setExercises] = useState([]);
  const [images, setImages] = useState<Record<string, string>>({});

  // console.log(exercises, "exercises");
  const router = useRouter();
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item as string) : null;
  // console.log(item);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await getBodyPartWorkouts(item?.name.toLowerCase());
      setExercises(data);

      // fetch gifs for each exercise
      const gifs: Record<string, string> = {};
      await Promise.all(
        data.map(async (ex: any) => {
          const gifUrl = await getWorkoutGIf(ex.id, "1080");
          // console.log(gifUrl);
          gifs[ex.id] = gifUrl; // already a url
        })
      );

      setImages(gifs);
    };

    fetchExercises();
  }, []);

  const headerComponent = (
    <View className="relative">
      <Image
        source={item?.image}
        style={{ width: "100%", height: 300, borderRadius: 12 }}
      />

      <TouchableOpacity
        className="p-2 bg-red-600 text-white rounded-full absolute top-5 left-2"
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1">
        <WorkoutList
          data={exercises}
          images={images}
          headerComponent={headerComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExcercisesListPage;
