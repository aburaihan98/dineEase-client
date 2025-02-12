import React from "react";

const services = [
  {
    title: "Home Delivery",
    description: "Order online to get the food at your doorstep",
    icon: "🚴‍♂️",
  },
  {
    title: "Dine-in",
    description:
      "Everything you order will be served hot & fresh at our branch",
    icon: "⏳",
  },
  {
    title: "Take Away",
    description: "Take away your favorite dishes when you are on the move",
    icon: "🥡",
  },
];

export default function Services() {
  return (
    <section className="pt-5 lg:pt-10 bg-primary">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-gray-300 hover:border-secondary"
          >
            <span className="text-4xl">{service.icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-red-800">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
