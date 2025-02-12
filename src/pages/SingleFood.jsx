import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../Loading";

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <section className="py-5 md:py-10 bg-primary">
      {/* Food Details */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 bg-white shadow-md rounded-lg p-4 lg:p-8">
        <div>
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold">{food.foodName}</h2>
          <p className="text-gray-700 mt-2">
            <strong>Description:</strong> {food.shortDescription}
          </p>
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
            <strong>Origin:</strong> {food.foodOrigin}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Purchase:</strong> {food.purchase_count || 0}
          </p>
          <button
            className="bg-secondary text-white px-6 py-2 rounded-lg mt-6 transition"
            onClick={() => navigate(`/purchase/${id}`, { state: { food } })}
          >
            Purchase
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleFood;
