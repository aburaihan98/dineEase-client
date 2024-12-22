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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading food items.</p>;

  return (
    <div className="py-6 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          My Food Items
        </h2>
        {/* Show food items in a grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.length === 0 ? (
            <p className="text-center text-lg">
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
                <h3 className="text-xl font-semibold">{food.foodName}</h3>
                <p className="text-gray-600">Price: ${food.price}</p>
                <p className="text-gray-500">Quantity: {food.quantity}</p>

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
