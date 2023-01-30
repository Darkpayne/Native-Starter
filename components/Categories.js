import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client from "../sanity";

const Categories = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
  *[_type == "category" ]`
      )
      .then((data) => setCategory(data));
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      {category.map((cat) => (
        <CategoryCard key={cat._id} imgUrl={cat.image} title={cat.name} />
      ))}
    </ScrollView>
  );
};

export default Categories;
