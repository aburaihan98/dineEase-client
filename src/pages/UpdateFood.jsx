import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Error from "../Error";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../Loading";

const UpdateFood = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
        navigate("/my-foods");
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

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <section className="py-5 md:py-10 bg-primary ">
      <div className="w-11/12 m-auto">
        <h2 className="text-2xl text-center font-bold mb-4 lg:mb-8">
          Update Food Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-2">
              <div>
                <label htmlFor="foodName" className="block text-lg font-medium">
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
                  defaultValue={data?.foodImage}
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
                <label htmlFor="price" className="block text-lg font-medium">
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
            </div>
            <div className="space-y-2">
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
                  defaultValue={data?.addByName}
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
                  defaultValue={data?.addByEmail}
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
                  defaultValue={data?.foodOrigin}
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
                  defaultValue={data?.shortDescription}
                  required
                  className="w-full py-[11px] px-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-secondary text-[#ffffff] rounded-md  transition duration-300"
          >
            {mutation.isLoading ? "Updating..." : "Update food"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateFood;
