import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetching ordered food items for the logged-in user
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/my-orders/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  // Deleting an order
  const mutation = useMutation({
    mutationFn: async (orderId) => {
      const response = await axiosSecure.delete(`/orders/${orderId}`);
      return response.data;
    },
    onSuccess: (_, orderId) => {
      // Update the cache to remove the deleted order
      queryClient.setQueryData(["myOrders", user?.email], (oldOrders) => {
        return oldOrders.filter((order) => order._id !== orderId);
      });
      toast.success("Order deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete order.");
    },
  });

  const handleDelete = (orderId) => {
    mutation.mutate(orderId);
  };

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
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <img
                src={order.foodImage}
                alt={order.foodName}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{order.foodName}</h3>
              <p className="text-gray-600">
                <strong>Price:</strong> ${order.price.toFixed(2)}
              </p>
              <p className="text-gray-600">
                <strong>Owner:</strong> {order.foodOwner}
              </p>
              <p className="text-gray-600">
                <strong>Ordered On:</strong>{" "}
                {moment(order.buyingDate).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
              <button
                onClick={() => handleDelete(order._id)}
                className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                {mutation.isLoading ? "Deleting..." : "Delete Order"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
