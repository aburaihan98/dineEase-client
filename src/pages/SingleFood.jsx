import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SingleFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch single food item
  const fetchFood = async () => {
    const response = await axiosSecure.get(`/foods/${id}`);
    return response.data;
  };

  const {
    data: food,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["food", id],
    queryFn: fetchFood,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading food: {error.message}</div>;

  return (
    <div className="py-10">
      {/* Food Details */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="mt-6">
          <h2 className="text-2xl font-bold">{food.foodName}</h2>
          <p className="text-gray-700 mt-2">
            <strong>Category:</strong> {food.foodCategory}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Price:</strong> ${food.price}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Quantity:</strong> {food.quantity}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Purchase Count:</strong> {food.purchaseCount || 0}
          </p>
          <button
            className="bg-primary text-white px-6 py-2 rounded-lg mt-6 hover:bg-red-700 transition"
            onClick={() => navigate(`/purchase/${id}`, { state: { food } })}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;
