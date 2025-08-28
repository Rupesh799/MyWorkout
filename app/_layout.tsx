import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="workout"
        options={{ headerShown: false, presentation: `modal` }}
      />
      <Stack.Screen
        name="screens/excercises/page"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="screens/excercises/[details]/page"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
};

export default _layout;
