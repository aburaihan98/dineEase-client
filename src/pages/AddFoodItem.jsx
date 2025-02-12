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
    const response = await axiosSecure.post("/add-foods", formData);
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
    // Convert price to a number
    formObject.quantity = Number(formObject.quantity) || 0;
    formObject.price = Number(formObject.price) || 0;
    formObject.addByName = user?.displayName || "Unknown";
    formObject.addByEmail = user?.email || "Unknown";
    formObject.purchase_count = 0;

    // Call the mutate function from useMutation to submit the form
    mutation.mutate(formObject);
    e.target.reset();
  };

  return (
    <section className="py-5 md:py-10 bg-primary ">
      <div className="w-11/12 m-auto">
        <h2 className="text-2xl text-heading text-center font-bold mb-4 lg:mb-8">
          Add Food Item
        </h2>
        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="foodName"
                  className="block  text-lg font-medium"
                >
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
                <label
                  htmlFor="foodImage"
                  className="block text-lg font-medium"
                >
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
                <label
                  htmlFor="foodCategory"
                  className="block text-lg font-medium"
                >
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
                <label htmlFor="quantity" className="block text-lg font-medium">
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
                <label htmlFor="price" className="block text-lg font-medium">
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
            </div>
            <div className=" space-y-2">
              <div>
                <label
                  htmlFor="addByName"
                  className="block text-lg font-medium"
                >
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
                <label
                  htmlFor="addByEmail"
                  className="block text-lg font-medium"
                >
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
                <label
                  htmlFor="foodOrigin"
                  className="block text-lg font-medium"
                >
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
                <label
                  htmlFor="shortDescription"
                  className="block text-lg font-medium"
                >
                  Short Description
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  rows="4"
                  required
                  className="w-full py-[11px] px-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 mt-4 bg-secondary text-[#ffffff] rounded-md transition duration-300"
          >
            Add Item
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddFoodItem;
