import Head from "next/head";
import { useState } from "react";
import Footer from "@/components/Footer";
import {
Sparkles,
Droplets,
Shield,
Wrench,
SprayCan,
Check,
} from "lucide-react";

const services = [
{
icon: Sparkles,
title: "Deep Clean",
description:
    "Complete restoration for heavily soiled sneakers including sole cleaning, upper treatment, and deodorizing.",
price: 250,
duration: "3-5 days",
materials: ["Canvas", "Mesh", "Knit", "Synthetic"],
includes: [
    "Full exterior clean",
    "Sole restoration",
    "Insole treatment",
    "Deodorizing",
    "Lace cleaning",
],
},
{
icon: Droplets,
title: "Suede & Nubuck Care",
description:
    "Gentle cleaning for delicate suede and nubuck materials.",
price: 350,
duration: "4-6 days",
materials: ["Suede", "Nubuck", "Velvet"],
includes: [
    "Gentle brushing",
    "Stain treatment",
    "Texture restoration",
    "Color refresh",
    "Protective coating",
],
},
{
icon: Shield,
title: "Leather Treatment",
description:
    "Premium care for leather sneakers including conditioning and protection.",
price: 300,
duration: "3-5 days",
materials: ["Leather", "Patent Leather"],
includes: [
    "Deep clean",
    "Conditioning",
    "Polish",
    "Crack repair",
    "Protective layer",
],
},
{
icon: Wrench,
title: "Sole Restoration",
description:
    "Whitening and de-oxidation for yellowed or dirty soles.",
price: 200,
duration: "2-4 days",
materials: ["Rubber", "EVA", "Boost"],
includes: [
    "Deep sole cleaning",
    "Whitening treatment",
    "Edge cleaning",
    "Final polish",
],
},
{
icon: SprayCan,
title: "Protection Service",
description:
    "Water and stain repellent coating to keep sneakers fresh longer.",
price: 150,
duration: "1-2 days",
materials: ["All materials"],
includes: [
    "Surface preparation",
    "Protection spray",
    "Curing",
    "Quality check",
],
},
];

export default function Services() {
const [selectedService, setSelectedService] = useState<string | null>(null);

return (
<>
    <Head>
    <title>Our Services | Sneaker Laundry</title>
    </Head>


    <main className="min-h-screen bg-white">
    {/* Hero Section */}
    <section className="py-24 text-center bg-black text-white">
        <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6">
            Professional Sneaker Care
        </h1>
        <p className="text-lg text-gray-300">
            All services include a R50 collection fee for door-to-door pickup and delivery.
        </p>
        </div>
    </section>

    {/* Services List */}
    <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
        {services.map((service) => (
            <div
            key={service.title}
            className="border rounded-2xl p-8 shadow-sm"
            >
            <div
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer"
                onClick={() =>
                setSelectedService(
                    selectedService === service.title
                    ? null
                    : service.title
                )
                }
            >
                <div className="flex items-center gap-5 flex-1">
                <div className="w-14 h-14 bg-black text-white rounded-xl flex items-center justify-center">
                    <service.icon size={24} />
                </div>

                <div>
                    <h3 className="text-2xl font-semibold">
                    {service.title}
                    </h3>
                    <p className="text-gray-600">
                    {service.description}
                    </p>
                </div>
                </div>

                <div className="text-right">
                <p className="text-sm text-gray-500">Starting from</p>
                <p className="text-3xl font-bold">
                    R{service.price}
                </p>
                </div>
            </div>

            {/* Expanded Section */}
            {selectedService === service.title && (
                <div className="mt-8 border-t pt-8 grid md:grid-cols-3 gap-8">
                <div>
                    <h4 className="font-semibold mb-3">
                    Suitable Materials
                    </h4>
                    <div className="flex flex-wrap gap-2">
                    {service.materials.map((material) => (
                        <span
                        key={material}
                        className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                        >
                        {material}
                        </span>
                    ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">
                    What's Included
                    </h4>
                    <ul className="space-y-2">
                    {service.includes.map((item) => (
                        <li
                        key={item}
                        className="flex items-center gap-2 text-gray-600"
                        >
                        <Check size={16} />
                        {item}
                        </li>
                    ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">
                    Turnaround Time
                    </h4>
                    <p className="text-xl font-semibold">
                    {service.duration}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                    Express service available for additional fee.
                    </p>
                </div>
                </div>
            )}
            </div>
        ))}
        </div>
    </section>
    </main>

    <Footer />
</>
);
}
