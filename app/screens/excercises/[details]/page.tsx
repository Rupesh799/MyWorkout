import { getWorkoutGIf } from "@/api/excercises";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DetailsPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Params come in as strings from the router
  const id = String(params.id || params.exerciseId || "");
  const name = (params.name as string) || "Exercise";
  const equipment = (params.equipment as string) || undefined;
  const bodyPart = (params.bodyPart as string) || undefined;
  const target = (params.target as string) || undefined;

  const [gifUrl, setGifUrl] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      const url = await getWorkoutGIf(id, "360");
      if (mounted) setGifUrl(url);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="relative">
          {gifUrl ? (
            <Image
              source={{ uri: gifUrl }}
              style={{ width: "100%", height: 320 }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{ width: "100%", height: 320 }}
              className="bg-gray-200"
            />
          )}

          <TouchableOpacity
            className="p-2 bg-black/50 rounded-full absolute top-5 left-3"
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="p-4 gap-2">
          <Text className="text-2xl font-bold uppercase">{name}</Text>
          {equipment ? (
            <Text className="text-base text-gray-700">
              Equipment: {equipment}
            </Text>
          ) : null}
          {bodyPart ? (
            <Text className="text-base text-gray-700">
              Body part: {bodyPart}
            </Text>
          ) : null}
          {target ? (
            <Text className="text-base text-gray-700">Target: {target}</Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsPage;
