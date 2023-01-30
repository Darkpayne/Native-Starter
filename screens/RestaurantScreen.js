import { View, ScrollView, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView>
      <View className="relative">
        <Image
          source={{ uri: urlFor(imgUrl).url() }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute rounded-full -top-[190px] left-5 p-2 bg-gray-100 "
        >
          <ArrowLeftIcon color="#00ccbb" size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
