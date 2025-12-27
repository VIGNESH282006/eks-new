

const Contact = () => {
    return (
        <div className="pt-32 px-8 min-h-screen bg-white">
            <h1 className="text-5xl font-bold text-primary mb-12 text-center">Contact Us</h1>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-primary">Get in Touch</h3>
                    <p className="text-gray-600">Have a project in mind? We'd love to hear from you.</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-700">
                            <span>📍</span> <span>123 Construction Ave, City, State</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <span>📞</span> <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <span>✉️</span> <span>info@eksconstruction.in</span>
                        </div>
                    </div>
                </div>

                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                    <input type="email" placeholder="Your Email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
                    <textarea placeholder="Message" rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"></textarea>
                    <button className="w-full py-4 bg-primary-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
