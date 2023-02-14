import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatCurrencyNaira } from "../lib/utils";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItems,
  selectBasketItemWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const items = useSelector((state) => selectBasketItemWithId(state, id));
  const dispatch = useDispatch();
  const [isPressed, setIsPressed] = useState(false);

  const addItemsToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemsFromBasket = () => {
    dispatch;
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400 ">{description}</Text>
            <Text className="text-gray-400 mt-2">
              {formatCurrencyNaira(price)}
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3 ">
            <TouchableOpacity>
              <MinusCircleIcon
                size={40}
                // color={items.length > 0 ? "#00ccbb" : "gray"}
                color="#00ccbb"
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon
                size={40}
                color="#00ccbb"
                // color={items.length > 0 ? "#00ccbb" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
