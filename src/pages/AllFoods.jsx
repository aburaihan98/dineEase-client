import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllFoods = () => {
  const axiosSecure = useAxiosSecure();
  const [origin, setOrigin] = useState("");
  const [search, setSearch] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  // Pagination
  const [count, setCount] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsParPage, setItemsParPage] = useState(9);
  const numberOfPages = Math.ceil(count / itemsParPage);
  const pages = [...Array(numberOfPages).keys()];

  // foods fun
  const fetchFoods = async () => {
    const response = await axiosSecure.get(
      `/foods?search=${search}&sortByPrice=${sortByPrice}&origin=${origin}&page=${currentPage}&limit=${itemsParPage}`
    );
    return response.data;
  };
  // count fun
  const fetchCount = async () => {
    const response = await axiosSecure.get("/productsCount");
    setCount(response.data.count);
    return response.data;
  };
  // foods query
  const {
    data: foods = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foods", origin, search, sortByPrice, currentPage, itemsParPage],
    queryFn: fetchFoods,
  });
  // count query
  const { data } = useQuery({
    queryKey: ["count", count],
    queryFn: fetchCount,
  });

  const uniqueOrigins = [...new Set(foods.map((food) => food.foodOrigin))];

  const handleReset = () => {
    setOrigin("");
    setSearch("");
    setSortByPrice("");
    setCurrentPage(0);
  };

  // Pagination
  const handleItemParPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsParPage(val);
    setCurrentPage(0);
  };

  const handlePrevItem = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextItem = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="text-center py-10">
  //       <p className="text-2xl font-bold">Loading...</p>
  //     </div>
  //   );
  // }

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
    <div className="">
      {/* Page Title */}
      <div
        className="relative bg-cover bg-center h-60 flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2020/04/04/15/08/barbecue-5002642_640.jpg")',
        }}
      >
        <h1 className="text-4xl font-bold">
          Discover Our{" "}
          <span className="text-primary">Delicious Food Items</span>
        </h1>
      </div>

      {/* Filter Section */}
      <div className="w-11/12 m-auto mt-6 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex gap-4 items-center col-span-1">
          <select
            name="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full border p-4 rounded-md"
          >
            <option value="">Select Origin</option>
            {uniqueOrigins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 items-center col-span-1">
          <input
            type="text"
            name="search"
            placeholder="Search"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-4 rounded-md"
          />
        </div>

        <div className="flex gap-4 items-center col-span-1">
          <select
            name="sortByPrice"
            id="sortByPrice"
            onChange={(e) => setSortByPrice(e.target.value)}
            className="w-full border p-4 rounded-md"
            value={sortByPrice}
          >
            <option value="">Sort By Price</option>
            <option value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>

        <div className="flex gap-4 items-center col-span-1">
          <button onClick={handleReset} className="btn">
            Reset
          </button>
        </div>
      </div>

      {/* Food Cards */}
      <div className="w-11/12 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-4">
        {foods?.length > 0 ? (
          foods.map((food) => (
            <motion.div
              key={food._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 300 }}
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
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-700">
            No food items found.
          </p>
        )}
      </div>
      {/* Pagination */}
      <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg font-medium text-gray-700">
          Current page:{" "}
          <span className="font-bold text-red-600">{currentPage}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handlePrevItem}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentPage === page
                  ? "bg-red-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleNextItem}
          >
            Next
          </button>
        </div>
        <select
          value={itemsParPage}
          onChange={handleItemParPage}
          className="w-24 px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="5">5</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default AllFoods;
