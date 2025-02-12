import AOS from "aos";
import React, { useEffect } from "react";

export default function ChefsSpecial() {
  const data = [
    {
      id: 1,
      name: "Spicy Garlic Shrimp Pasta",
      description:
        "A rich and creamy pasta dish with a spicy kick, served with fresh garlic shrimp.",
      img: "https://cdn.pixabay.com/photo/2019/03/14/20/13/chefs-4055825_640.jpg",
    },
    {
      id: 2,
      name: "Grilled Herb Chicken",
      description:
        "Juicy grilled chicken marinated in a mix of fresh herbs and spices.",
      img: "https://cdn.pixabay.com/photo/2024/01/12/07/00/bread-8503298_640.jpg",
    },
    {
      id: 3,
      name: "Classic Margherita Pizza",
      description:
        "A timeless favorite topped with fresh basil, mozzarella, and a drizzle of olive oil.",
      img: "https://cdn.pixabay.com/photo/2019/03/14/20/13/chefs-4055824_640.jpg",
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
    <section className="bg-gradient-to-r from-green-400 to-blue-500 py-5 md:py-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 lg:mb-8 text-white">
          Today's Chef's Special
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {data?.map((special, index) => (
            <div
              key={special.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
            >
              <img
                src={special.img}
                alt={special.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{special.name}</h3>
                <p className="text-gray-600 mb-4">{special.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
