import Navbar from "@/components/main/navbar";
import { Hero } from "@/components/main/hero";
import Footer from "@/components/main/footer";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
