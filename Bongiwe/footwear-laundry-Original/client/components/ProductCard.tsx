type ProductCardProps = {
name: string;
price: number;
image: string;
};

export default function ProductCard({
name,
price,
image,
}: ProductCardProps) {
const whatsappMessage = `Hi 👋 I’d like to order the ${name} (R${price}).`;
const whatsappLink = `https://wa.me/27739022082?text=${encodeURIComponent(
whatsappMessage
)}`;

return (
<div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
    <img
    src={image}
    alt={name}
    className="w-full h-48 object-cover rounded-lg mb-4"
    />

    <h3 className="text-xl font-semibold mb-2">{name}</h3>

    <p className="text-lg font-bold mb-4">R{price}</p>

    <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-black text-white px-4 py-2 rounded-lg inline-block"
    >
    Order via WhatsApp
    </a>
</div>
);
}
