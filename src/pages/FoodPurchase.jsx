import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const FoodPurchase = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { foodName, foodImage, price, quantity, addByEmail } =
    location.state.food;
  const [purchaseQuantity, setPurchaseQuantity] = useState(quantity);

  // Define the mutation using react-query
  const purchaseFoodItem = async (formData) => {
    const response = await axiosSecure.post(
      `/add-purchase-foods/${id}`,
      formData
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: purchaseFoodItem,
    onSuccess: (data) => {
      if (data.insertedId) {
        toast.success("Purchase food  item added successfully!");
        navigate("/my-orders");
      } else {
        toast.error("Failed to add Purchase food item.");
      }
    },
    onError: () => {
      toast.error("Failed to  add Purchase food item.");
    },
  });

  const handlePurchase = (e) => {
    e.preventDefault();

    if (user.email === location.state.food.addByEmail) {
      return toast.error("You cannot purchase your own added items!");
    }

    if (parseInt(quantity) === 0) {
      return toast.error("This item is not available for purchase!");
    }

    if (purchaseQuantity > quantity) {
      return toast.error(
        `You cannot buy more than ${quantity} items! Please adjust your quantity.`
      );
    }

    const purchaseData = {
      foodName,
      foodImage,
      price: parseFloat(price),
      quantity: parseInt(purchaseQuantity),
      buyerName: user.displayName,
      buyerEmail: user.email,
      buyingDate: Date.now(),
      foodOwner: addByEmail,
    };

    mutation.mutate(purchaseData);
  };

  return (
    <section className="py-5 md:py-10 bg-primary">
      <div className="w-11/12 m-auto">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4 lg:md-8">
            Food Purchase
          </h2>
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label
                htmlFor="foodName"
                className="block text-lg font-medium text-gray-700"
              >
                Food Name
              </label>
              <input
                type="text"
                id="foodName"
                defaultValue={foodName}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-lg font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                defaultValue={price}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                readOnly
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-lg font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={purchaseQuantity}
                onChange={(e) => {
                  setPurchaseQuantity(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
            </div>
            <div>
              <label
                htmlFor="buyerName"
                className="block text-lg font-medium text-gray-700"
              >
                Buyer Name
              </label>
              <input
                type="text"
                id="buyerName"
                defaultValue={user?.displayName}
                readOnly
                className="w-full px-4 py-2 border bg-gray-100 rounded hover:cursor-not-allowed "
              />
            </div>
            <div>
              <label
                htmlFor="buyerEmail"
                className="block text-lg font-medium text-gray-700"
              >
                Buyer Email
              </label>
              <input
                type="email"
                id="buyerEmail"
                defaultValue={user?.email}
                readOnly
                className="w-full px-4 py-2 border bg-gray-100 rounded hover:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Purchasing..." : "Purchase"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FoodPurchase;
