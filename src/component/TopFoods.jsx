import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TopFoods = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const fetchTopFoods = async () => {
    const response = await axiosSecure.get("/top-foods");
    return response.data;
  };
  // TanStack Query for fetching top foods
  const {
    data: topFoods = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchTopFoods,
  });

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold text-red-500">
          Something went wrong! Please try again.
        </p>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="w-11/12 m-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Top Foods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topFoods?.map((food) => (
            <div
              key={food._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{food.foodName}</h3>
                <p className="text-gray-500">Price: ${food.price}</p>
                <p className="text-gray-500">
                  Purchases: {food.purchase_count || 0}
                </p>
                <button
                  onClick={() => navigate(`/foods/${food._id}`)}
                  className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/all-foods")}
            className="bg-primary text-white py-2 px-6 rounded hover:bg-red-700"
          >
            See All
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopFoods;
