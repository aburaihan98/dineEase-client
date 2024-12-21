import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllFoods = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch function to get all food items
  const fetchFoods = async () => {
    const response = await axiosSecure.get("/foods");
    return response.data;
  };

  // Fix the useQuery hook to use the object syntax
  const {
    data: foods,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  // Ensure foods is an array before filtering
  const filteredFoods = Array.isArray(foods)
    ? foods.filter((food) =>
        food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading foods: {error.message}</div>;

  return (
    <div className="bg-gray-100">
      {/* Page Title */}
      <div
        className="relative bg-cover bg-center h-60 flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2021/11/01/15/52/spring-roll-6760871_1280.jpg")',
        }}
      >
        <h1 className="text-4xl font-bold">All Foods</h1>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mt-6">
        <input
          type="text"
          placeholder="Search by food name or category"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Food Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-4">
        {filteredFoods?.length > 0 ? (
          filteredFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{food.foodName}</h2>
                <p className="text-gray-700 mb-2">
                  <strong>Category:</strong> {food.foodCategory}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Price:</strong> ${food.price}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Quantity:</strong> {food.quantity}
                </p>
                <Link
                  to={`/foods/${food._id}`}
                  className="block bg-primary text-white text-center py-2 rounded-lg mt-4 hover:bg-red-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-700">
            No food items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
