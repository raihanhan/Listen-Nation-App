import Layout from "../../components/Layout/Layout";
import Hero from "../../components/Hero/Hero";
import HomePageEventCard from "../../components/HomePageEventCard/Events";
// import HomePageArchiveCard from "../../components/HomePageArchiveCard/Archives";
const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <HomePageEventCard />
      {/* <HomePageArchiveCard /> */}
    </Layout>
  );
};

export default HomePage;
