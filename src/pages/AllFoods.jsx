import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Error";
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    AOS.refreshHard();
  }, [foods]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="bg-primary">
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
      <div className="flex justify-center font-bold">
        <div className="w-11/12 m-auto py-5 md:py-10 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8">
          <div className="w-full flex gap-4 items-center ">
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

          <div className="w-full flex gap-4 items-center ">
            <input
              type="text"
              name="search"
              placeholder="Search"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-4 rounded-md "
            />
          </div>

          <div className="w-full flex gap-4 items-center ">
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

          <div className="flex gap-4 items-center ">
            <button
              onClick={handleReset}
              className="font-bold bg-secondary text-white py-4 px-6 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Food Cards */}
      <div className="w-11/12 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods?.length > 0 ? (
          foods?.map((food, index) => (
            <div
              key={food._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
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
                  className="block font-bold bg-secondary text-white py-2 px-4 rounded text-center mt-4  transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-2xl font-bold col-span-3 text-gray-700">
            No food items found.
          </p>
        )}
      </div>
      {/* Pagination */}
      <div className="flex flex-col items-center gap-4 p-4 bg-primary rounded-lg shadow-md">
        <p className="text-lg font-medium text-heading">
          Current page:
          <span className="font-bold text-secondary">{currentPage}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md  disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handlePrevItem}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentPage === page
                  ? "bg-secondary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
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
