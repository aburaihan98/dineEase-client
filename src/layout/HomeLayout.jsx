import Banner from "../component/Banner";
import ChefsSpecial from "../component/ChefsSpecial";
import CustomerReviews from "../component/CustomerReviews";
import Services from "../component/Services";
import TopFoods from "../component/TopFoods";

export default function HomeLayout() {
  return (
    <>
      <Banner />
      <Services />
      <TopFoods />
      <CustomerReviews />
      <ChefsSpecial />
    </>
  );
}
