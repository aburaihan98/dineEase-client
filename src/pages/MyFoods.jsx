import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../Loading";
import { AuthContext } from "../provider/AuthProvider";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    AOS.refreshHard();
  }, [foodItems]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="py-6 lg:py-12 bg-primary">
      <div className="w-11/12 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4 lg:mb-8 text-heading">
          My Food Items
        </h2>
        {/* Show food items in a grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.length === 0 ? (
            <p className="text-center text-2xl font-bold">
              You haven't added any food items yet.
            </p>
          ) : (
            foodItems.map((food, index) => (
              <div
                key={food._id}
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                className="bg-white shadow-md rounded-lg p-6"
              >
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
                  className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg "
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
