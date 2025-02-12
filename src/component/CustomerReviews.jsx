import AOS from "aos";
import { useEffect } from "react";

export default function CustomerReviews() {
  const data = [
    {
      name: "John Doe",
      review: "The food was absolutely fantastic! A perfect dining experience.",
    },
    {
      name: "Jane Smith",
      review: "Loved the ambiance and the dishes. Will visit again!",
    },
    {
      name: "Mike Johnson",
      review: "Great service and delicious food. Highly recommended.",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    AOS.refreshHard();
  }, [data]);

  return (
    <section className="pb-5 md:pb-10 bg-primary">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 lg:mb-8 text-heading">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((customer, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
            >
              <img
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt={customer.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <p className="text-lg font-semibold mb-2">{customer.name}</p>
              <p className="text-gray-600 mb-4">{customer.review}</p>
              <span className="text-yellow-500">★★★★★</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
