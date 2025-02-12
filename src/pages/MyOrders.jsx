import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import moment from "moment";
import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    AOS.refreshHard();
  }, [orders]);

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
      <div className="w-11/12 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4 lg:mb-8 text-gray-600">
          My Orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-center text-2xl font-bold text-gray-600">
            You have no orders yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
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
                  <strong>Quantity:</strong> ${order.quantity}
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
                  className="mt-4 w-full bg-secondary text-white py-2 px-4 rounded-lg transition"
                >
                  {mutation.isLoading ? "Deleting..." : "Delete Order"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
