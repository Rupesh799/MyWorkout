import { getBodyPartWorkouts } from "@/api/excercises";
import WorkoutList from "@/components/WorkoutList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const ExcercisesListPage = () => {
  const [exercises, setExercises] = useState([]);

  console.log(exercises, "exercises");
  const router = useRouter();
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item as string) : null;
  console.log(item);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await getBodyPartWorkouts(item?.name.toLowerCase());
      setExercises(data);
    };

    fetchExercises();
  }, []);

  return (
    <SafeAreaView className="flex-1 ">
      {/* <View className="p-4 flex-row  items-center justify-between">
        <TouchableOpacity
          className="p-2 bg-red-500/20 rounded-full"
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View>
          <Text className="font-bold text-xl tracking-wide ">
            {item?.name} Workout
          </Text>
        </View>
        <View></View>
      </View> */}

      <ScrollView>
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
        <View className="flex-1">
          {exercises?.map((ex: any) => (
            <WorkoutList key={ex.id} data={[ex]} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExcercisesListPage;
