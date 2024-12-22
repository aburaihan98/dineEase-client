import Banner from "../component/Banner";
import CustomerReviews from "../component/CustomerReviews";
import TopFoods from "../component/TopFoods";

export default function HomeLayout() {
  return (
    <>
      <Banner />
      <TopFoods />
      <CustomerReviews />
    </>
  );
}
