import { getWorkoutGIf } from "@/api/excercises";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  const instructions = (params.instructions as string) || [];
  const description = (params.description as string) || undefined;
  const difficulty = (params.difficulty as string) || undefined;

  const [gifUrl, setGifUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const url = await getWorkoutGIf(id, "360");
        if (mounted) {
          setGifUrl(url);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const InfoCard = ({
    icon,
    label,
    value,
  }: {
    icon: string;
    label: string;
    value: string;
  }) => (
    <View className="bg-gray-50 rounded-xl p-4 flex-row items-start gap-3 flex-1">
      <View className="bg-red-100 p-2 rounded-lg ">
        <MaterialIcons name={icon as any} size={20} color="red" />
      </View>
      <View className="flex-1">
        <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </Text>
        <Text className="text-sm font-semibold text-gray-900 capitalize mt-0.5">
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image Section */}
        <View className="relative">
          {loading ? (
            <View
              style={{ width: "100%", height: 300 }}
              className="bg-gray-100 justify-center items-center"
            >
              <ActivityIndicator size="large" color="red" />
              <Text className="text-gray-500 mt-2">Loading exercise...</Text>
            </View>
          ) : gifUrl ? (
            <View className="relative">
              <Image
                source={{ uri: gifUrl }}
                style={{ width: "100%", height: 300 }}
                resizeMode="cover"
                className="rounded-b-3xl"
              />
              {/* Gradient overlay for better text visibility */}
              <LinearGradient
                colors={["rgba(0,0,0,0.7)", "transparent"]}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 100,
                }}
                className="rounded-b-3xl"
              />
            </View>
          ) : (
            <View
              style={{ width: "100%", height: 300 }}
              className="bg-gradient-to-b from-gray-200 to-gray-300 justify-center items-center rounded-b-3xl"
            >
              <MaterialIcons name="fitness-center" size={60} color="#9CA3AF" />
              <Text className="text-gray-500 mt-2">No image available</Text>
            </View>
          )}

          {/* Back Button */}
          <TouchableOpacity
            className="absolute top-12 left-4 bg-black/30 backdrop-blur-sm rounded-full p-3"
            onPress={() => router.back()}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View className="px-6 py-6">
          {/* Exercise Title */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-gray-900 capitalize leading-tight">
              {name}
            </Text>
            <View className="w-12 h-1 bg-red-500 rounded-full mt-2" />
          </View>

          {/* Info Cards Grid */}
          <View className="mb-6">
            <View className="flex-1 flex-wrap gap-3 mb-3">
              {equipment && (
                <InfoCard
                  icon="fitness-center"
                  label="Equipment"
                  value={equipment}
                />
              )}
              {bodyPart && (
                <InfoCard
                  icon="accessibility"
                  label="Body Part"
                  value={bodyPart}
                />
              )}
              {target && (
                <View className="flex-row">
                  <InfoCard
                    icon="my-location"
                    label="Target Muscle"
                    value={target}
                  />
                </View>
              )}

              {difficulty && (
                <View className="flex-row">
                  <InfoCard icon="star" label="Difficulty" value={difficulty} />
                </View>
              )}

              {description && (
                <View className="flex-row">
                  <InfoCard
                    icon="description"
                    label="Description"
                    value={description}
                  />
                </View>
              )}
            </View>
          </View>

          {/* Instructions Section */}
          <View className="bg-white rounded-2xl border border-gray-100 p-6">
            <View className="flex-row items-center mb-4">
              <View className="bg-red-100 p-2 rounded-lg mr-3">
                <MaterialIcons name="list-alt" size={24} color="red" />
              </View>
              <Text className="text-xl font-bold text-gray-900">
                Instructions
              </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4">
              {instructions && instructions.length > 0 ? (
                <View className="gap-3">
                  {Array.isArray(instructions)
                    ? instructions.map((instruction, index) => (
                        <View
                          key={index}
                          className="flex-row items-start gap-3"
                        >
                          <View className="bg-red-500 w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                          <Text className="text-base text-gray-700 leading-relaxed flex-1">
                            {instruction}
                          </Text>
                        </View>
                      ))
                    : instructions
                        .split(".,")
                        .filter((step) => step.trim())
                        .map((instruction, index) => (
                          <View
                            key={index}
                            className="flex-row items-center gap-4"
                          >
                            {/* <View className="bg-red-500 w-2 h-2 rounded-full mt-2 flex-shrink-0" /> */}
                            <MaterialCommunityIcons
                              name="dumbbell"
                              size={12}
                              color="black"
                            />
                            <Text className="text-base text-gray-700 leading-relaxed flex-1 font-semibold">
                              {instruction.trim()}.
                            </Text>
                          </View>
                        ))}
                </View>
              ) : (
                <Text className="text-base text-gray-700 leading-relaxed">
                  No instructions available for this exercise.
                </Text>
              )}
            </View>
          </View>

          {/* Action Button
          <TouchableOpacity
            className="bg-blue-500 rounded-2xl p-4 mt-6 flex-row items-center justify-center"
            style={{
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
            }}
          >
            <MaterialIcons name="play-arrow" size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Start Exercise
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsPage;
