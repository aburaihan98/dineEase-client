import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    AOS.refreshHard();
  }, [topFoods]);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl font-bold">Loading...</p>
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
    <section className="py-5 md:py-10 bg-primary">
      <div className="w-11/12 m-auto">
        <h2 className="text-2xl font-bold text-center mb-4 lg:mb-8 text-heading">
          Top Foods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topFoods && topFoods.length > 0 ? (
            topFoods?.map((food, index) => (
              <div
                key={food._id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              >
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold">{food?.foodName}</h3>
                  <p className="flex-grow">{food?.shortDescription}</p>
                  <button
                    onClick={() => navigate(`/foods/${food._id}`)}
                    className="mt-4 font-bold bg-secondary text-white py-2 px-4 rounded self-start"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 text-lg font-semibold text-gray-500">
              No items available at the moment.
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/all-foods")}
            className="bg-secondary text-white font-bold py-2 px-6 rounded"
          >
            See All
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopFoods;
