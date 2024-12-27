import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch the food items using TanStack Query (react-query)
  const {
    data: foodItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myFoods", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/my-foods/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdate = (foodId) => {
    navigate(`/update-food/${foodId}`);
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold text-red-500">
          Something went wrong! Please try again.
        </p>
      </div>
    );
  }
  return (
    <div className="py-6 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">
          My Food Items
        </h2>
        {/* Show food items in a grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.length === 0 ? (
            <p className="text-center text-2xl font-bold">
              You haven't added any food items yet.
            </p>
          ) : (
            foodItems.map((food) => (
              <div key={food._id} className="bg-white shadow-md rounded-lg p-6">
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-600">
                  {food.foodName}
                </h3>
                <p className="text-gray-600">
                  <strong>Price: </strong>${food.price}
                </p>
                <p className="text-gray-500">
                  <strong>Quantity: </strong> {food.quantity}
                </p>
                <p className="text-gray-500">
                  <strong>Category: </strong>
                  {food.foodCategory}
                </p>

                {/* Update button */}
                <button
                  onClick={() => handleUpdate(food._id)}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Update
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFoods;
