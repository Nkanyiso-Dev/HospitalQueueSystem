import { useState } from "react";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function Contact() {
const [formData, setFormData] = useState({
name: "",
email: "",
phone: "",
subject: "",
message: "",
});

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
alert("Message sent! We'll get back to you within 24 hours.");
setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
};

return (
<>

    <main className="min-h-screen bg-white">
    {/* Hero */}
    <section className="pt-32 pb-20 bg-gray-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
        <span className="text-yellow-400 uppercase tracking-widest text-sm font-medium">
            Contact Us
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-4">
            LET&apos;S <span className="text-yellow-400">TALK</span>
        </h1>
        <p className="text-lg text-gray-200">
            Got questions about our services or products? Want to book a collection? We're here to help.
        </p>
        </div>
    </section>

    {/* Contact Section */}
    <section className="py-24 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-6">
        <h2 className="text-4xl font-bold mb-8">GET IN <span className="text-yellow-400">TOUCH</span></h2>

        <div className="flex items-start gap-5 p-5 bg-gray-100 rounded-xl border">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-gray-600">
                24 Albrecht St<br />
                Jeppestown, Johannesburg<br />
                2043
            </p>
            </div>
        </div>

        <div className="flex items-start gap-5 p-5 bg-gray-100 rounded-xl border">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Phone className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-gray-600">073 902 2082</p>
            </div>
        </div>

        <div className="flex items-start gap-5 p-5 bg-gray-100 rounded-xl border">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Mail className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-gray-600">admin@footwearlaundry.co.za</p>
            </div>
        </div>

        <div className="flex items-start gap-5 p-5 bg-gray-100 rounded-xl border">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
            <h3 className="font-semibold mb-1">Hours</h3>
            <p className="text-gray-600">Mon - Fri: 9am - 6pm</p>
            <p className="text-gray-600">Sat: 9am - 4pm</p>
            <p className="text-gray-600">Sun: Closed</p>
            </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-gray-100 rounded-xl p-6 border flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <MessageCircle className="h-7 w-7 text-green-500" />
            </div>
            <div className="flex-1">
            <h3 className="font-semibold text-xl mb-1">Quick Response on WhatsApp</h3>
            <p className="text-gray-600 text-sm">Get instant replies for bookings and queries</p>
            </div>
            <button className="px-4 py-2 border border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition">
            Chat Now
            </button>
        </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-100 rounded-2xl p-8 border">
        <h2 className="text-3xl font-bold mb-6">SEND US A <span className="text-yellow-400">MESSAGE</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+27 12 345 6789"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                <option value="">Select a subject</option>
                <option value="booking">Book a Cleaning</option>
                <option value="product">Product Inquiry</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
                </select>
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your sneakers or how we can help..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
            </div>

            <button
            type="submit"
            className="w-full px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
            >
            Send Message <Send className="h-5 w-5" />
            </button>
        </form>
        </div>
    </section>
    </main>

    <Footer />
</>
);
}
