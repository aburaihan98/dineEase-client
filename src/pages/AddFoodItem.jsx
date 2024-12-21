import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const AddFoodItem = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // Define the mutation function
  const addFoodItem = async (formData) => {
    const response = await axiosSecure.post("/add-food", formData);
    return response.data;
  };
  // Use the mutation hook
  const mutation = useMutation({
    mutationFn: addFoodItem,
    onSuccess: (data) => {
      if (data.insertedId) {
        toast.success("Food item added successfully!");
      } else {
        toast.error("Failed to add food item.");
      }
    },
    onError: () => {
      toast.error("Failed to add food item.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    formObject.addByName = user?.displayName || "Unknown";
    formObject.addByEmail = user?.email || "Unknown";

    // Call the mutate function from useMutation to submit the form
    mutation.mutate(formObject);
    e.target.reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-primary">
      <h2 className="text-2xl font-bold mb-4">Add Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="foodName" className="block  text-lg">
            Food Name
          </label>
          <input
            id="foodName"
            name="foodName"
            type="text"
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
            defaultValue={user?.displayName}
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
            defaultValue={user?.email}
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
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-primary text-[#ffffff] rounded-md hover:bg-red-700 transition duration-300"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
