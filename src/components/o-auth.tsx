import React from 'react'
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, View } from "react-native";

import { googleOAuth } from "@/lib/auth";
import { Button } from './ui/button';
import { Google } from '@/lib/icons/Google';
import { Text } from './ui/text';

export const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/(tabs)/home");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">O</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <Button
        className="mt-5 w-full shadow-none gap-3"
        onPress={handleGoogleSignIn}
        IconRight={Google}
        title="Ingresar con Google"
      />
    </View>
  );
}
