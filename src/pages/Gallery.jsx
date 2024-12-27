import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const totalImages = 48;
  const imagesPerBatch = 12;

  const fetchMoreImages = () => {
    if (images.length >= totalImages) {
      setHasMore(false);
      return;
    }

    const galleryImages = [
      {
        src: "https://cdn.pixabay.com/photo/2021/11/01/15/52/spring-roll-6760871_1280.jpg",
        user: "Alex Johnson",
        description: "Delicious grilled salmon served with vegetables.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_640.jpg",
        user: "Emma Brown",
        description: "A cozy dining setup with warm lighting.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_640.jpg",
        user: "John Smith",
        description: "A juicy hamburger loaded with fresh ingredients.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_640.jpg",
        user: "Emily Davis",
        description: "A perfect cup of coffee to start the day.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_640.jpg",
        user: "Sophia Miller",
        description: "Delicious pasta with fresh tomatoes and basil.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2023/09/05/12/44/mug-8235059_640.jpg",
        user: "Oliver Wilson",
        description: "Fresh fruits arranged beautifully on a plate.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2022/05/11/07/10/porridge-7188630_640.jpg",
        user: "Mason Lee",
        description: "A glass of milk and cookies on a cozy table.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg",
        user: "Charlotte Garcia",
        description: "A freshly baked pizza with all the toppings.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2024/02/16/15/36/recipe-8577854_640.jpg",
        user: "James Martinez",
        description: "A chef preparing a delicious meal in the kitchen.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2023/05/31/11/15/fish-8031138_640.jpg",
        user: "Amelia Anderson",
        description: "A beautifully decorated cake with colorful frosting.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2014/06/11/17/00/food-366875_640.jpg",
        user: "Isabella Clark",
        description: "A close-up of vibrant and fresh fruits.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2017/11/25/17/17/sandwich-2977251_640.jpg",
        user: "Ethan Thomas",
        description: "A cozy restaurant setting with soft lighting.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2021/04/01/15/39/copyright-6142611_640.jpg",
        user: "Harper Harris",
        description: "A plate of food served on a wooden table.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_640.jpg",
        user: "Sebastian Hall",
        description: "Delicious sushi with fresh fish and vegetables.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2023/10/05/11/47/sweet-potatoes-8295778_640.jpg",
        user: "Jackson Young",
        description: "A bowl of spaghetti with marinara sauce.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2023/08/26/14/19/cupcake-8215179_640.jpg",
        user: "Amos Lee",
        description: "A delicious burger with cheese and lettuce.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2015/05/07/15/08/cookie-756601_640.jpg",
        user: "Mila King",
        description: "A steaming cup of coffee with a perfect crema.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2022/08/17/07/10/strawberries-7391738_640.jpg",
        user: "Avery Wright",
        description: "A perfectly grilled steak with crispy fries.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2022/02/11/05/54/food-7006591_640.jpg",
        user: "Liam Lopez",
        description: "A box of fresh and colorful donuts.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2023/03/19/15/35/food-7862820_640.jpg",
        user: "Eleanor Scott",
        description: "A fresh salad with vibrant greens and veggies.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2021/10/30/12/50/woman-6754248_640.jpg",
        user: "Benjamin Adams",
        description: "A delicious scoop of ice cream in a cone.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2016/12/06/18/27/cheese-1887233_640.jpg",
        user: "Aiden Carter",
        description: "A freshly baked apple pie with a golden crust.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2023/03/20/10/04/buns-7864270_640.jpg",
        user: "Sofia Green",
        description: "A bowl of ripe strawberries with a shiny red color.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_640.jpg",
        user: "Daniel Walker",
        description: "Assorted fresh fruits on a rustic table.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2023/01/09/10/56/meal-7707134_640.jpg",
        user: "Chloe Perez",
        description: "A refreshing smoothie in a mason jar.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2016/09/15/19/24/salad-1672505_640.jpg",
        user: "Henry Johnson",
        description: "A burger with a thick patty and fresh lettuce.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_640.jpg",
        user: "Lucas Mitchell",
        description: "Ice cream cones with a variety of flavors.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2017/03/31/10/56/waffles-2190961_640.jpg",
        user: "Charlotte Moore",
        description: "Freshly baked bread from the bakery.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2021/11/09/07/21/pastry-6780834_640.jpg",
        user: "Matthew Harris",
        description: "A classic hamburger with a juicy beef patty.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2014/06/16/23/10/spices-370114_640.jpg",
        user: "Ella White",
        description: "Fresh fruit salad with a mix of tropical fruits.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2014/05/23/23/17/dessert-352475_640.jpg",
        user: "James Turner",
        description: "A delicious burger with crispy bacon and cheese.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2017/11/18/17/09/strawberries-2960533_640.jpg",
        user: "Mason Lewis",
        description: "Fresh seafood platter with prawns and crab legs.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2022/05/22/13/36/raspberries-7213407_640.jpg",
        user: "Olivia Martinez",
        description: "Vibrant fruit platter with watermelon and pineapple.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_640.jpg",
        user: "William Allen",
        description: "Grilled chicken served with mixed vegetables.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2014/12/11/02/55/cereals-563796_640.jpg",
        user: "Sophia Harris",
        description: "A beautifully plated gourmet dish with vegetables.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2013/07/12/19/20/sushi-154590_1280.png",
        user: "Grace Walker",
        description: "Pasta with a rich and creamy Alfredo sauce.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2018/09/22/23/43/grapes-3696472_640.jpg",
        user: "Aiden Thomas",
        description: "A hearty meal with roasted vegetables and chicken.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2022/08/14/15/22/tomatoes-7386111_640.jpg",
        user: "Victoria Young",
        description: "Spaghetti pasta topped with rich marinara sauce.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2017/08/05/12/33/flat-lay-2583213_640.jpg",
        user: "Aubrey Clark",
        description: "Sautéed mushrooms with garlic and herbs.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2017/08/30/11/39/glass-2696759_640.jpg",
        user: "Addison Collins",
        description: "Fresh fish served with lemon and parsley.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2020/08/28/12/32/man-5524488_640.jpg",
        user: "Jasper Harris",
        description: "A delightful breakfast of pancakes and berries.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2022/08/12/17/08/food-7382109_640.jpg",
        user: "Zoey Evans",
        description: "A box of assorted donuts with colorful sprinkles.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2024/03/07/19/31/ai-generated-8619138_640.png",
        user: "Henry Walker",
        description: "A gourmet dish served on a white plate.",
      },
      {
        src: "https://cdn.pixabay.com/photo/2022/12/04/18/15/pesto-7635158_640.jpg",
        user: "Mia Thompson",
        description: "Pasta served with a rich and savory sauce.",
      },
    ];

    setTimeout(
      () => {
        setImages((prev) => [
          ...prev,
          ...galleryImages.slice(0, imagesPerBatch),
        ]);
        if (isFirstLoad) {
          setIsFirstLoad(false);
        }
      },
      isFirstLoad ? 0 : 1000
    );
  };

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setOpen(true);
  };

  useEffect(() => {
    fetchMoreImages();
  }, []);

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
      <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreImages}
        hasMore={hasMore}
        loader={
          <h4 className="text-center text-2xl font-bold text-gray-700 my-4">
            Loading...
          </h4>
        }
        endMessage={
          <p className="text-center text-2xl font-bold text-gray-600 my-6">
            🎉 You've reached the end!
          </p>
        }
      >
        <div className="w-11/12 m-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
      </InfiniteScroll>

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
