import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { FlightBookingProvider } from "./context/FlightBookingContext";
import { ReferenceDataProvider } from "./context/ReferenceDataContext";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import PackageDetail from "./pages/PackageDetail";
import Services from "./pages/Services";
import Visa from "./pages/Visa";
import Flights from "./pages/Flights";
import FlightResults from "./pages/flights/FlightResults";
import FlightReview from "./pages/flights/FlightReview";
import PassengerDetails from "./pages/flights/PassengerDetails";
import AddOns from "./pages/flights/AddOns";
import Payment from "./pages/flights/Payment";
import BookingSuccess from "./pages/flights/BookingSuccess";
import Hotels from "./pages/Hotels";
import HotelResults from "./pages/hotels/Hotelresults";
import ManageBooking from "./pages/ManageBooking";
import Insurance from "./pages/Insurance";
import MICE from "./pages/MICE";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PlanTrip from "./pages/PlanTrip";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <ReferenceDataProvider>
        <FlightBookingProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/packages/:slug" element={<PackageDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/visa-services" element={<Visa />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/flights/results" element={<FlightResults />} />
            <Route path="/flights/review" element={<FlightReview />} />
            <Route path="/flights/passengers" element={<PassengerDetails />} />
            <Route path="/flights/add-ons" element={<AddOns />} />
            <Route path="/flights/payment" element={<Payment />} />
            <Route path="/booking/success" element={<BookingSuccess />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/results" element={<HotelResults />} />
            <Route path="/manage-booking" element={<ManageBooking />} />
            <Route path="/travel-insurance" element={<Insurance />} />
            <Route path="/mice-events" element={<MICE />} />
            <Route path="/travel-guide/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plan-your-trip" element={<PlanTrip />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FlightBookingProvider>
        </ReferenceDataProvider>
      </main>
      <Footer />
    </div>
  );
}
