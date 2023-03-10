import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native-gesture-handler";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured" && _id == $id]{
      ...,restaurants[]->{
        ..., dishes[]->
      }
    }[0]
    `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00ccbb" />
      </View>
      <Text className="px-4 text-gray-500 text-xs">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
        {/* <RestaurantCard
          id={123}
          imgUrl="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          title="Amala 360"
          rating={4.5}
          genre="African"
          address="123 Main street"
          short_description="This is a short description"
          dishes={[]}
          long={232}
          lat={4353254}
        />
        <RestaurantCard
          id={123}
          imgUrl="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          title="Amala 360"
          rating={4.5}
          genre="African"
          address="123 Main street"
          short_description="This is a short description"
          dishes={[]}
          long={232}
          lat={4353254}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
