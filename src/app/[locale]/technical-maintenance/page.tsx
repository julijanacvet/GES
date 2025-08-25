
import OurServices from "../components/OurServices";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TechnicalMaintenancePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <OurServices />
      </main>
      <Footer />
    </div>
  );
}
