"use client";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Log form data for debugging
        alert("Message sent!"); // Replace with actual submission logic
    };

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full height-800  shadow-md p-4 flex justify-between items-center px-10 z-50 bg-white">
                <h1 className="text-4xl font-bold italic text-gray-900">
                    Stock<span className="text-blue-600">Nexis</span>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="/" className="text-gray-700 text-3xl font-CascadiaCode hover:text-blue-600">Home</a></li>
                        <li><a href="/dashboard" className="text-gray-700 text-3xl  font-CascadiaCode hover:text-blue-600">Dashboard</a></li>
                    </ul>
                </nav>
            </header>

            <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6 pt-24">  {/* Added pt-24 */}
                <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full">
                    {/* Left Panel - Contact Info */}
                    <div className="bg-blue-900 text-white p-8 w-full md:w-1/3 flex flex-col justify-between">
                        <div> {/* Added a wrapper div */}
                            <h2 className="text-2xl font-bold mb-6">Drop At Us</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <MapPin className="w-6 h-6" />
                                    <p>Vijayawada, Andhra Pradesh, India</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-6 h-6" />
                                    <a href="mailto:contact@stocknexis.com" className="hover:underline">contact@stocknexis.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-6 h-6" />
                                    <a href="tel:+918331004877" className="hover:underline">+91 8331004877</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-500" />
                            <Twitter className="w-6 h-6 cursor-pointer hover:text-blue-500" />
                            <Linkedin className="w-6 h-6 cursor-pointer hover:text-blue-500" />
                        </div>
                    </div>


                    {/* Right Panel - Contact Form */}
                    <div className="p-8 w-full md:w-2/3">
                        <h2 className="text-2xl font-bold text-blue-900 mb-2">Get in Touch</h2>
                        <p className="text-gray-600 mb-6">Feel free to drop us a line below!</p>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Type your message here..."
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg  transition duration-300"
                            >
                                SEND
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;