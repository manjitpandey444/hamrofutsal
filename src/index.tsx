
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import './styles/FutsalApp.css';// Import the FutsalApp CSS file
import AuthForm from './components/AuthForm'; // Import the new AuthForm component

const FutsalApp = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [location, setLocation] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("home");
    const [selectedDateBS, setSelectedDateBS] = useState("");
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // State for auth modal

    const nepaliMonths = ["बैशाख", "जेठ", "असार", "श्रावण", "भदौ", "असोज", "कार्तिक", "मंसिर", "पुष", "माघ", "फाल्गुन", "चैत"];
    const bsBaseYear = 2082;
    const selectableBsYears = Array.from({ length: 5 }, (_, i) => bsBaseYear + i);

    const [currentBsMonth, setCurrentBsMonth] = useState(nepaliMonths[0]);
    const [currentBsYear, setCurrentBsYear] = useState(selectableBsYears[0]);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (selectedDateBS) {
            const parts = selectedDateBS.split(" ");
            if (parts.length === 3) {
                setCurrentBsMonth(parts[1]);
                setCurrentBsYear(parseInt(parts[2], 10));
            }
        } else {
            setCurrentBsMonth(nepaliMonths[0]);
            setCurrentBsYear(selectableBsYears[0]);
        }
    }, [selectedDateBS]);

    const handleOpenAuthModal = () => {
        setIsAuthModalOpen(true);
        setIsMobileMenuOpen(false); // Close mobile menu if open
    };
    const handleCloseAuthModal = () => setIsAuthModalOpen(false);


    const featuredFutsals = [
        { id: 1, name: "Kathmandu Futsal", location: "Thamel, Kathmandu", price: "Rs 1500/hr", rating: 4.5, imageUrl: "https://readdy.ai/api/search-image?query=Modern%20indoor%20futsal%20field%20with%20green%20artificial%20turf%2C%20white%20markings%2C%20and%20netting%20surrounding%20the%20court.%20Professional%20lighting%20system%20overhead%2C%20clean%20and%20well-maintained%20facility%20with%20minimalist%20design%20and%20dark%20background&width=600&height=337&seq=1&orientation=landscape" },
        { id: 2, name: "Chabahil Futsal", location: "Chabahil, Kathmandu", price: "Rs 1200/hr", rating: 4.2, imageUrl: "https://readdy.ai/api/search-image?query=Indoor%20futsal%20court%20with%20vibrant%20green%20turf%2C%20white%20boundary%20lines%2C%20and%20goal%20posts.%20Modern%20sports%20facility%20with%20overhead%20lighting%2C%20surrounded%20by%20protective%20netting%2C%20clean%20environment%20with%20dark%20background&width=600&height=337&seq=2&orientation=landscape" },
        { id: 3, name: "Lalitpur Futsal Arena", location: "Patan, Lalitpur", price: "Rs 1800/hr", rating: 4.8, imageUrl: "https://readdy.ai/api/search-image?query=Premium%20indoor%20futsal%20field%20with%20professional-grade%20artificial%20grass%2C%20bright%20white%20markings%2C%20and%20high-quality%20goal%20posts.%20State-of-the-art%20lighting%20system%20e%20spacious%20playing%20area%20with%20dark%20background&width=600&height=337&seq=3&orientation=landscape" },
        { id: 4, name: "Bhaktapur Futsal", location: "Bhaktapur Durbar Square", price: "Rs 1300/hr", rating: 4, imageUrl: "https://readdy.ai/api/search-image?query=Modern%20futsal%20court%20with%20green%20synthetic%20turf%2C%20clearly%20marked%20playing%20lines%2C%20and%20sturdy%20goal%20posts.%20Well-lit%20indoor%20facility%20with%20protective%20barriers%2C%20clean%20and%20professional%20atmosphere%20with%20dark%20background&width=600&height=337&seq=4&orientation=landscape" }
    ];

    const navItems = [
        { id: "grounds", label: "Futsal Grounds" },
        { id: "tournaments", label: "Tournaments" }
    ];

    const renderRatingStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`star-${i}`} className="fas fa-star text-yellow-400"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key="half-star" className="fas fa-star-half-alt text-yellow-400"></i>);
        }
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-star-${i}`} className="far fa-star text-yellow-400"></i>);
        }
        return stars;
    };
    
    const daysInMonth = (month: string, year: number) => {
        // Note: This is a simplified BS calendar logic. Real BS calendar is more complex.
        if (["बैशाख", "जेठ", "असार", "श्रावण", "भदौ"].includes(month)) return 31;
        if (["असोज", "कार्तिक", "मंसिर", "पुष", "माघ"].includes(month)) return 30;
        if (month === "फाल्गुन") return year % 4 === 0 ? 30 : 29; // Simplified leap year
        if (month === "चैत") return 30;
        return 30; 
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-colors duration-300 font-['Inter',_sans-serif]`}>
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
                        <div 
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setActiveTab("home");
                                setIsMobileMenuOpen(false); 
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label="Go to homepage"
                        >
                            <i className="fas fa-futbol text-blue-500 text-2xl mr-2"></i>
                            <h1 className="text-2xl font-bold font-pacifico">HamroFutsal</h1>
                        </div>
                        <button
                            className="md:hidden cursor-pointer !rounded-button whitespace-nowrap p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl ${isDarkMode ? "text-white" : "text-gray-800"}`}></i>
                        </button>
                    </div>
                    <nav className={`${isMobileMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center w-full md:w-auto transition-all duration-300 ease-in-out`}>
                        <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 w-full md:w-auto">
                            {navItems.map(item => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`block py-2 px-4 md:px-2 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-blue-600 hover:text-white ${activeTab === item.id ? "bg-blue-600 text-white" : isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-white"}`}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 md:ml-6 space-y-3 md:space-y-0 md:space-x-3">
                            <button 
                                onClick={handleOpenAuthModal}
                                className={`py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
                            >
                                My Account
                            </button>
                    
                           
                        </div>
                    </nav>
                </header>

                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                        Book and Play Futsal in Nepal
                    </h2>
                    <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Find and book the best futsal grounds across Nepal with ease. Play your favorite sport anytime, anywhere.
                    </p>
                </div>

                <div className={`mb-12 p-6 rounded-lg shadow-lg mx-auto max-w-3xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                    <div className="flex flex-col md:flex-row gap-4 md:items-baseline">
                        <div className="flex-1 relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-map-marker-alt text-gray-500 text-sm relative top-[1px]"></i>
                            </div>
                            <input
                                type="text"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"}`}
                                placeholder="Location"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 relative w-full">
                            <div
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border-none cursor-pointer text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"}`}
                                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                role="button"
                                tabIndex={0}
                                aria-haspopup="dialog"
                                aria-expanded={isDatePickerOpen}
                            >
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-calendar-alt text-gray-500 text-sm"></i>
                                </div>
                                <span className={`${selectedDateBS ? "" : (isDarkMode? "text-gray-400" : "text-gray-500") }`}>
                                    {selectedDateBS || "Select Date (BS)"}
                                </span>
                            </div>
                            {isDatePickerOpen && (
                                <div className={`absolute top-full left-0 mt-2 w-72 rounded-lg shadow-lg z-50 ${isDarkMode ? "bg-gray-800" : "bg-white"}`} role="dialog" aria-label="Date Picker">
                                    <div className="p-4">
                                        <div className="flex justify-between mb-4">
                                            <select
                                                className={`w-1/2 mr-2 p-2 rounded text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"}`}
                                                value={currentBsMonth}
                                                onChange={e => {
                                                    setCurrentBsMonth(e.target.value);
                                                }}
                                                aria-label="Select Month"
                                            >
                                                {nepaliMonths.map(m => <option key={m} value={m}>{m}</option>)}
                                            </select>
                                            <select
                                                className={`w-1/2 p-2 rounded text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"}`}
                                                value={currentBsYear}
                                                onChange={e => {
                                                    setCurrentBsYear(parseInt(e.target.value,10));
                                                }}
                                                aria-label="Select Year"
                                            >
                                                {selectableBsYears.map(y => <option key={y} value={y}>{y}</option>)}
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 text-sm">
                                            {["आ", "सो", "मं", "बु", "बि", "शु", "श"].map(day => (
                                                <div key={day} className="text-center font-semibold p-1">{day}</div>
                                            ))}
                                            {Array.from({ length: daysInMonth(currentBsMonth, currentBsYear) }, (_, i) => i + 1).map(day => (
                                                <div
                                                    key={day}
                                                    className={`text-center p-2 rounded cursor-pointer hover:text-white ${selectedDateBS.startsWith(day + " ") && selectedDateBS.includes(currentBsMonth) && selectedDateBS.includes(String(currentBsYear)) ? "bg-blue-500 text-white" : (isDarkMode ? "hover:bg-blue-600" : "hover:bg-blue-500")}`}
                                                    onClick={() => {
                                                        setSelectedDateBS(`${day} ${currentBsMonth} ${currentBsYear}`);
                                                        setIsDatePickerOpen(false);
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                >
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="w-full md:w-auto md:self-stretch bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out cursor-pointer !rounded-button whitespace-nowrap">
                            <i className="fas fa-search mr-2"></i>Search
                        </button>
                    </div>
                </div>
                
                <div className={`mb-12 rounded-lg p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                    <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "fa-search", title: "1. Search & Explore", description: "Find the perfect futsal ground by location and date." },
                            { icon: "fa-calendar-check", title: "2. Book Your Slot", description: "Select your preferred time slot and confirm your booking." },
                            { icon: "fa-futbol", title: "3. Play & Enjoy", description: "Complete your payment and have a great time playing futsal!" }
                        ].map(step => (
                            <div key={step.title} className="flex flex-col items-center text-center">
                                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
                                    <i className={`fas ${step.icon}`}></i>
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6">Featured Futsal Grounds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredFutsals.map(futsal => (
                            <div key={futsal.id} className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                <div className="relative h-48 overflow-hidden">
                                    <img src={futsal.imageUrl} alt={futsal.name} className="w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                </div>
                                <div className="p-4">
                                    <h4 className="text-lg font-bold mb-1">{futsal.name}</h4>
                                    <div className="flex items-center mb-2 text-sm text-gray-400">
                                        <i className="fas fa-map-marker-alt mr-2"></i>
                                        <span>{futsal.location}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-blue-400">{futsal.price}</span>
                                        <div className="flex">{renderRatingStars(futsal.rating)}</div>
                                    </div>
                                    <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer !rounded-button whitespace-nowrap">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out cursor-pointer !rounded-button whitespace-nowrap">
                            View All Futsal Grounds
                        </button>
                    </div>
                </div>

                <div className={`rounded-lg p-8 mb-12 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                    <h3 className="text-2xl font-bold mb-6 text-center">Why Choose HamroFutsal?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: "fa-bolt", title: "Quick Booking", description: "Book your favorite futsal ground in less than a minute with our simple booking process." },
                            { icon: "fa-search-location", title: "Find Nearby Courts", description: "Easily discover futsal grounds near your location with our advanced search feature." },
                            { icon: "fa-shield-alt", title: "Secure Payments", description: "Pay conveniently and securely with Esewa and Khalti." }
                        ].map(reason => (
                             <div key={reason.title} className="text-center">
                                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className={`fas ${reason.icon} text-2xl text-white`}></i>
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{reason.title}</h4>
                                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className={`rounded-lg p-8 mb-12 text-center ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Own a Futsal Ground? Partner with Us!</h3>
                    <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Reach more players and manage your bookings effortlessly. Join HamroFutsal today.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="fas fa-handshake mr-2"></i>List Your Ground
                    </button>
                </div>

                <footer className={`mt-16 pt-8 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="text-lg font-bold mb-4 font-pacifico">HamroFutsal</h4>
                            <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>The premier platform for booking futsal grounds across Nepal.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-blue-500 hover:text-blue-400 cursor-pointer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="text-blue-500 hover:text-blue-400 cursor-pointer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="text-blue-500 hover:text-blue-400 cursor-pointer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                            <ul className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {["Home", "About Us", "Futsal Grounds", "Tournaments", "Blog", "FAQs", "Privacy Policy", "Terms & Conditions", "Cancellation Policy", "Contact"].map(link => (
                                    <li key={link}><a href="#" className="hover:text-blue-500 cursor-pointer">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Cities</h4>
                            <ul className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur"].map(city => (
                                   <li key={city}><a href="#" className="hover:text-blue-500 cursor-pointer">{city}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                            <ul className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                <li className="flex items-center"><i className="fas fa-map-marker-alt mr-2 text-blue-500"></i><span>Thamel, Kathmandu, Nepal</span></li>
                                <li className="flex items-center"><i className="fas fa-phone-alt mr-2 text-blue-500"></i><span>+977 1234567890</span></li>
                                <li className="flex items-center"><i className="fas fa-envelope mr-2 text-blue-500"></i><span>info@hamrofutsal.com</span></li>
                            </ul>
                            <h4 className="text-lg font-bold mb-4 mt-6">Stay Updated</h4>
                            <p className={`mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Join our newsletter for the latest futsal news & offers.</p>
                            <div className="flex">
                                <input type="email" placeholder="Your email address" className={`flex-grow py-2 px-3 rounded-l-lg border-none focus:ring-2 focus:ring-blue-500 text-sm ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"}`} />
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out cursor-pointer !rounded-button whitespace-nowrap">Subscribe</button>
                            </div>
                        </div>
                    </div>
                     <div className={`text-center py-6 mt-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <h4 className="text-lg font-bold mb-4">Payment Partners</h4>
                        <div className="flex justify-center items-center space-x-6">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Esewa_logo.png/1200px-Esewa_logo.png" 
                                alt="Esewa" 
                                className={`h-10 opacity-75 hover:opacity-100 transition-opacity duration-300 ${isDarkMode ? 'payment-logo-dark-mode' : 'payment-logo-light-mode'}`}
                            />
                            <img 
                                src="https://khalti-blog.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/04/khalti-blog-logo.png" 
                                alt="Khalti" 
                                className={`h-10 opacity-75 hover:opacity-100 transition-opacity duration-300 ${isDarkMode ? 'payment-logo-dark-mode' : 'payment-logo-light-mode'}`}
                            />
                        </div>
                    </div>
                    <div className={`text-center py-6 border-t ${isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-600"}`}>
                        <p>&copy; {new Date().getFullYear()} HamroFutsal. All rights reserved.</p>
                    </div>
                </footer>
            </div>

            {isAuthModalOpen && (
                <div className="auth-modal-overlay" onClick={handleCloseAuthModal}>
                    <div className="auth-form-outer-container" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={handleCloseAuthModal} 
                            className="auth-modal-close-button"
                            aria-label="Close authentication form"
                        >
                            &times;
                        </button>
                        <AuthForm />
                    </div>
                </div>
            )}
        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <FutsalApp />
        </React.StrictMode>
    );
}
