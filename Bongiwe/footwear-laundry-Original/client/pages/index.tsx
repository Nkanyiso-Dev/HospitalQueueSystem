import Head from "next/head";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sneaker Laundry | Professional Cleaning in Maboneng</title>
        <meta
          name="description"
          content="Premium sneaker cleaning and restoration services in Maboneng, Johannesburg."
        />
      </Head>

      {/* <Header /> */}

      <main>
        {/* HERO SECTION */}
        <section className="bg-black text-white py-24 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-6">
              Professional Sneaker Cleaning
            </h1>
            <p className="text-lg mb-8">
              Premium sneaker laundry & restoration services in Maboneng,
              Johannesburg.
            </p>
            <a
              href="/book"
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Book a Clean
            </a>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-20 bg-gray-100 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">
              Our Cleaning Services
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">Standard Clean</h3>
                <p className="mb-4">
                  Surface cleaning, midsole, & laces cleaning.
                </p>
                <p className="font-bold">From R150</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">Deep Clean</h3>
                <p className="mb-4">
                  Standard + inner cleaning & stain removal.
                </p>
                <p className="font-bold">From R200</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">
                  White Sneaker Brightening
                </h3>
                <p className="mb-4">
                  Special treatment to restore white sneakers to their original brightness.
                </p>
                <p className="font-bold">From R180</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">
                  Suede/Nubuck Care
                </h3>
                <p className="mb-4">
                  Gentle dry-clean and conditioning for suede and nubuck materials.
                </p>
                <p className="font-bold">From R180</p>
              </div>  
              <div className="bg-white p-8 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">
                  Kids Sneaker Clean
                </h3>
                <p className="mb-4">
                  Tailored cleaning for children's sneakers, gentle yet effective.
                </p>
                <p className="font-bold">From R120</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">
                  De-Yellowing Treatment
                </h3>
                <p className="mb-4">
                  Specialized process to remove yellowing.
                </p>
                <p className="font-bold">From R180</p>
              </div>                  
            </div>
          </div>
        </section>

        {/* SHOP SECTION */}
        <section className="py-20 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">
              Sneaker Care Products
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <ProductCard
                name="Cleaning Kit"
                price={250}
                image="/products/cleaning-kit.jpg"
              />
              <ProductCard
                name="Protection Spray"
                price={180}
                image="/products/protection-spray.jpg"
              />
              <ProductCard
                name="Premium Laces"
                price={80}
                image="/products/laces.jpg"
              />
            </div>

            <div className="mt-10">
              <a
                href="/shop"
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Visit Shop
              </a>
            </div>
          </div>
        </section>

        {/* BOOKING CTA */}
        <section className="bg-black text-white py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Restore Your Sneakers?
          </h2>
          <a
            href="/book"
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold"
          >
            Book Now
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
