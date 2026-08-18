import { Link } from "react-router-dom";
import { Star, MapPin, Wifi, Waves, Coffee, ParkingCircle, Dumbbell, Wind, Utensils, ShieldCheck, ArrowUpRight, PawPrint, BedDouble } from "lucide-react";

const AMENITY_ICONS = {
  "Free WiFi": Wifi,
  "Swimming Pool": Waves,
  "Breakfast Included": Coffee,
  "Free Parking": ParkingCircle,
  Spa: ShieldCheck,
  Gym: Dumbbell,
  "Airport Shuttle": ArrowUpRight,
  Bar: Utensils,
  Restaurant: Utensils,
  "Air Conditioning": Wind,
  "Pet Friendly": PawPrint,
  "Room Service": BedDouble,
};

export default function HotelCard({ hotel, nights = 1 }) {
  const total = hotel.pricePerNight * nights;

  return (
    <div className="bg-white rounded-2xl border border-navy-50 shadow-card overflow-hidden flex flex-col sm:flex-row">
      <div className="sm:w-64 shrink-0 h-48 sm:h-auto">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} size={13} className="fill-sun text-sun" />
              ))}
            </div>
            <h3 className="font-display text-lg font-semibold text-navy-800 leading-snug">{hotel.name}</h3>
            <p className="text-xs text-navy-500 flex items-center gap-1 mt-1">
              <MapPin size={12} className="text-teal-600 shrink-0" />
              {hotel.area}, {hotel.destination} · {hotel.distanceKm} km from centre
            </p>
          </div>
          <div className="shrink-0 text-right hidden sm:block">
            <div className="stub-label bg-teal-50 text-teal-700 px-2 py-1 rounded-md inline-block">
              {hotel.rating.toFixed(1)}
            </div>
            <p className="text-xs text-navy-500 mt-1">{hotel.reviews.toLocaleString("en-IN")} reviews</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
          {hotel.amenities.slice(0, 5).map((a) => {
            const Icon = AMENITY_ICONS[a] || ShieldCheck;
            return (
              <span key={a} className="flex items-center gap-1.5 text-xs text-navy-600">
                <Icon size={13} className="text-teal-600 shrink-0" />
                {a}
              </span>
            );
          })}
        </div>

        <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs text-navy-500">{hotel.board} · {hotel.refundable ? "Free cancellation" : "Non-refundable"}</p>
            <p className="font-display text-2xl font-semibold text-navy-800">
              ₹{hotel.pricePerNight.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-navy-500"> /night</span>
            </p>
            <p className="text-xs text-navy-500">₹{total.toLocaleString("en-IN")} total for {nights} night{nights > 1 ? "s" : ""}</p>
          </div>
          <Link to="/plan-your-trip" className="btn btn-primary shrink-0 justify-center">
            Enquire Now <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
