import React from "react";

export default function ChefsSpecial() {
  return (
    <section className="bg-gradient-to-r from-green-400 to-blue-500 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Today's Chef's Special
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((special) => (
            <div
              key={special}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`https://source.unsplash.com/400x300/?food,${special}`}
                alt="Chef Special"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Special Dish {special}
                </h3>
                <p className="text-gray-600 mb-4">
                  A mouthwatering dish prepared by our expert chefs. Try it
                  today!
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
