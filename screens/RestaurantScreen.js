import { View, ScrollView, Image, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
// import { IoLocationSharp } from "react-native-heroicons/solid";

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
          className="absolute -top-[190px]  rounded-full left-5 p-2 bg-gray-100 "
        >
          <ArrowLeftIcon color="#00ccbb" size={20} />
        </TouchableOpacity>
      </View>

      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>

          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
              <StarIcon color="green" opacity={1.5} size={22} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> .{" "}
                {genre ? genre : "Rating"}
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="green" opacity={1.5} size={22} />
              <Text className="text-xs text-gray-500 break-words">
                Nearby ?? {address}
              </Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-2 pb-5">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row  items-center space-x-2 border-y border-gray-200 p-4">
          <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
          <Text className="pl-2 flex-1 text-md font-bold ">
            Have a food allergy?
          </Text>
          <ChevronRightIcon />
        </TouchableOpacity>
      </View>

      <View>
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
        {/* Dishes */}
        {dishes?.map((dish) => (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
