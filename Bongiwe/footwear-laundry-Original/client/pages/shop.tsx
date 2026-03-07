import { useState } from "react";
import Footer from "@/components/Footer";
import { ShoppingBag, Star } from "lucide-react";

const categories = [
"All",
"Cleaning Kits",
"Brushes",
"Solutions",
"Laces",
"Accessories",
];

const products = [
{
id: 1,
name: "Premium Cleaning Kit",
description: "Complete kit with brush, solution & microfiber cloth",
price: 349,
rating: 4.9,
reviews: 127,
category: "Cleaning Kits",
bestseller: true,
image: "/products/cleaning-kit.jpg",
},
{
id: 2,
name: "Suede Brush Set",
description: "Soft bristle brushes for delicate materials",
price: 129,
rating: 4.8,
reviews: 89,
category: "Brushes",
bestseller: false,
image: "/products/cleaning-spray.jpg",
},
{
id: 3,
name: "Premium Flat Laces",
description: "High-quality flat laces - multiple colors",
price: 79,
rating: 4.7,
reviews: 203,
category: "Laces",
bestseller: true,
image: "/products/laces.jpg",
},
{
id: 4,
name: "Protection Spray",
description: "Water & stain repellent coating - 200ml",
price: 199,
rating: 4.9,
reviews: 156,
category: "Solutions",
bestseller: true,
image: "/products/protection-spray.jpg",
},
];

export default function Shop() {
const [selectedCategory, setSelectedCategory] = useState("All");
const [searchQuery, setSearchQuery] = useState("");

const filteredProducts = products.filter((product) => {
const matchesCategory =
    selectedCategory === "All" || product.category === selectedCategory;
const matchesSearch = product.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
return matchesCategory && matchesSearch;
});

const handleAddToCart = (name: string) => {
alert(`${name} added to cart (MVP).`);
};

return (
<>

    <main className="min-h-screen bg-white">
    {/* Hero */}
    <section className="py-24 text-center bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-4">
            Sneaker <span className="text-yellow-400">Care Products</span>
        </h1>
        <p className="text-lg text-gray-300">
            Premium cleaning products, laces, and accessories to keep your
            kicks fresh.
        </p>
        </div>
    </section>

    {/* Filters */}
    <section className="py-6 border-b sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center gap-4">
        {/* Search */}
        <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Categories */}
        {categories.map((category) => (
            <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                ? "bg-yellow-400 text-black"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            >
            {category}
            </button>
        ))}
        </div>
    </section>

    {/* Products Grid */}
    <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
            <div
            key={product.id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
            <div className="relative">
                {product.bestseller && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Bestseller
                </div>
                )}
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                />
            </div>

            <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-xl font-bold mb-2">R{product.price}</p>
                <button
                onClick={() => handleAddToCart(product.name)}
                className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                <ShoppingBag className="inline h-4 w-4 mr-2" />
                Add to Cart
                </button>
            </div>
            </div>
        ))}
        {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-12">
            No products found.
            </p>
        )}
        </div>
    </section>
    </main>

    <Footer />
</>
);
}
