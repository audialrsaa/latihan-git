import Navigasi from "../components/navigasi"
import Banner from "../components/bannerhome"
import CategorySection from "../components/category"
import ForYou from "../components/foryou"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigasi />
      <Banner />
      <section id="category">
        <CategorySection />
      </section>
      <section id="foryou">
        <ForYou />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </main>
  );
}