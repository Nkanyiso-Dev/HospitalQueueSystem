import Head from "next/head";
import Footer from "@/components/Footer";
import { Target, Heart, Award, Users } from "lucide-react";

const values = [
{
icon: Target,
title: "Precision",
description: "Every sneaker receives meticulous attention to detail.",
},
{
icon: Heart,
title: "Passion",
description: "We're sneakerheads who understand your love for kicks.",
},
{
icon: Award,
title: "Quality",
description: "Only premium products and proven cleaning methods.",
},
{
icon: Users,
title: "Community",
description: "Building a community of sneaker lovers in South Africa.",
},
];

export default function About() {
return (
<>
    <Head>
    <title>About Us | Sneaker Laundry</title>
    </Head>

    <main className="min-h-screen bg-white">
    {/* Hero Section */}
    <section className="py-24 text-center bg-black text-white">
        <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6">
            We Live for Fresh Kicks
        </h1>
        <p className="text-lg text-gray-300">
            Founded by sneaker enthusiasts in Johannesburg, Sneaker Laundry
            was built to give every pair the premium care it deserves.
        </p>
        </div>
    </section>

    {/* Story Section */}
    <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
            <p>
                It started in 2020 in a small garage in Johannesburg.
                Armed with passion and professional-grade products, we
                restored our first pair of worn-out Jordans.
            </p>
            <p>
                Word spread quickly. Friends became customers. Customers
                became regulars. Soon we had cleaned thousands of pairs
                across South Africa.
            </p>
            <p>
                Today, Sneaker Laundry stands as a trusted sneaker care
                service in Maboneng — combining culture, craftsmanship,
                and quality service.
            </p>
            </div>
        </div>

        <div className="bg-gray-100 rounded-2xl flex items-center justify-center h-96 relative">
            <span className="text-8xl font-bold text-gray-300">
            SL
            </span>

            <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-xl shadow-lg">
            <p className="text-3xl font-bold">10K+</p>
            <p className="text-sm">Sneakers Restored</p>
            </div>
        </div>
        </div>
    </section>

    {/* Values Section */}
    <section className="py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
            What We Stand For
            </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
            <div
                key={value.title}
                className="bg-white p-8 rounded-xl text-center shadow"
            >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-black text-white rounded-lg">
                <value.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                {value.title}
                </h3>
                <p className="text-gray-600">
                {value.description}
                </p>
            </div>
            ))}
        </div>
        </div>
    </section>
    </main>

    <Footer />
</>
);
}
