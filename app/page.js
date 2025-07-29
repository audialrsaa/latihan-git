import NavbarComponent from "./components/navbar"
import Banner from "./components/banner"
import CategorySection from "./components/categorylan"
import Best from "./components/bestSeller"
import Footer from "./components/Footer"

export default function Landing() {
  return (
    <main className="min-h-screen bg-white">
      <NavbarComponent /> 
      <Banner />
      <CategorySection />
      <Best />
      <Footer />
    </main>
  );
}