import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  // Function to navigate to All Foods page
  const redirectToAllFoods = () => {
    navigate("/all-foods");
  };

  return (
    <section
      className="relative bg-cover bg-center h-96 flex items-center justify-center text-center px-4"
      style={{
        backgroundImage:
          'url("https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=1024x1024&w=is&k=20&c=QPHFTWoscwMSXOEGKoAKOjlCnMGszppFBrqQHdy4EGc=")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Dark overlay for better readability */}
      <div className="relative z-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Delicious Foods
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Explore our wide range of delicious and healthy meals to satisfy your
          cravings.
        </p>
        <button
          onClick={redirectToAllFoods}
          className="bg-primary text-white py-3 px-6 rounded-lg text-lg hover:bg-red-700 transition duration-300"
        >
          View All Foods
        </button>
      </div>
    </section>
  );
};

export default Banner;
