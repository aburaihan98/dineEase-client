import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateFood = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch the food item using useQuery with an object for the query options
  const { data, isLoading, error } = useQuery({
    queryKey: ["foodItem", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/foods/${id}`);
      return response.data;
    },
  });

  const updateFoodItem = async (formData) => {
    const response = await axiosSecure.put(`/update-food/${id}`, formData);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateFoodItem,
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        queryClient.invalidateQueries(["foods"]);
        toast.success("Food item updated successfully!");
      } else {
        toast.error("Failed to update food item.");
      }
    },
    onError: () => {
      toast.error("Failed to update food item.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    mutation.mutate(formObject);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching food item</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 text-primary">
      <h2 className="text-2xl font-bold mb-4">Update Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="foodName" className="block  text-lg">
            Food Name
          </label>
          <input
            id="foodName"
            name="foodName"
            type="text"
            defaultValue={data?.foodName}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="foodImage" className="block text-lg">
            Food Image URL
          </label>
          <input
            id="foodImage"
            name="foodImage"
            type="text"
            defaultValue={data?.foodImage}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="foodCategory" className="block text-lg">
            Food Category
          </label>
          <input
            id="foodCategory"
            name="foodCategory"
            type="text"
            defaultValue={data?.foodCategory}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-lg">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            defaultValue={data?.quantity}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            defaultValue={data?.price}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="addByName" className="block text-lg">
            Add By (Name)
          </label>
          <input
            id="addByName"
            name="addByName"
            type="text"
            defaultValue={data?.addByName}
            disabled={true}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="addByEmail" className="block text-lg">
            Add By (Email)
          </label>
          <input
            id="addByEmail"
            name="addByEmail"
            type="email"
            defaultValue={data?.addByEmail}
            disabled={true}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="foodOrigin" className="block text-lg">
            Food Origin (Country)
          </label>
          <input
            id="foodOrigin"
            name="foodOrigin"
            type="text"
            defaultValue={data?.foodOrigin}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="shortDescription" className="block text-lg">
            Short Description
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            defaultValue={data?.shortDescription}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-primary text-[#ffffff] rounded-md hover:bg-red-700 transition duration-300"
        >
          {mutation.isLoading ? "Updating..." : "Update food"}
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
