import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_640.jpg",
      user: "Alex Johnson",
      description: "Delicious grilled salmon served with vegetables.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_640.jpg",
      user: "Emma Brown",
      description: "A cozy dining setup with warm lighting.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_640.jpg",
      user: "John Smith",
      description: "A juicy hamburger loaded with fresh ingredients.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_640.jpg",
      user: "Sophia Wilson",
      description: "A healthy breakfast bowl with fresh fruits and oats.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2013/06/09/06/07/meat-123668_640.jpg",
      user: "Michael Davis",
      description: "Homemade chocolate chip cookies fresh from the oven.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/08/31/15/42/grill-8225405_640.jpg",
      user: "Isabella Martinez",
      description: "Fluffy pancakes drizzled with maple syrup.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/09/10/12/35/mutton-tikka-boti-7444981_640.jpg",
      user: "Ethan Lee",
      description: "A refreshing salad bowl with greens and dressing.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_640.jpg",
      user: "Olivia Taylor",
      description: "An elegant dessert featuring berries and cream.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/10/29/21/48/food-7556198_640.jpg",
      user: "Daniel Anderson",
      description: "Colorful cupcakes topped with buttercream icing.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2017/08/15/16/13/rib-of-beef-2644538_640.jpg",
      user: "Ava Thomas",
      description: "A classic breakfast spread with eggs and toast.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/07/17/17/53/chicken-7327958_640.jpg",
      user: "Mason White",
      description: "A cup of coffee with latte art in a cozy setting.",
    },
    {
      src: "https://cdn.pixabay.com/photo/2020/05/14/22/31/barbecue-5171549_640.jpg",
      user: "Charlotte Harris",
      description: "A mouthwatering slice of cheesecake with berries.",
    },
  ];

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setOpen(true);
  };

  return (
    <div className="">
      {/* Page Title */}
      <div
        className="relative bg-cover bg-center h-60 flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2020/05/23/03/01/shish-kebab-5207831_640.jpg")',
        }}
      >
        <h1 className="text-4xl font-bold">
          Explore Our <span className="text-blue-500">Food Collection</span>
        </h1>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => handleImageClick(index)}
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.description}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-lg font-bold p-2">{image.user}</h2>
              <p className="text-sm text-center p-2">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map((img) => ({ src: img.src }))}
          index={currentImage}
        />
      )}
    </div>
  );
};

export default Gallery;
