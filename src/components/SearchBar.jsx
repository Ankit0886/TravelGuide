import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, MapPin, CalendarDays, Users } from "lucide-react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(q ? `/destinations?q=${encodeURIComponent(q)}` : "/destinations");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl sm:rounded-full shadow-pop p-2.5 flex flex-col sm:flex-row items-stretch gap-2 w-full max-w-2xl"
    >
      <div className="flex items-center gap-2.5 flex-1 px-4 py-2.5 sm:border-r border-navy-50">
        <MapPin size={17} className="text-teal-600 shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          placeholder="Where to? Try 'Kashmir' or 'Thailand'"
          className="outline-none text-sm w-full placeholder:text-navy-400 text-navy-800"
        />
      </div>
      <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 border-r border-navy-50">
        <CalendarDays size={17} className="text-teal-600 shrink-0" />
        <input type="month" className="outline-none text-sm w-[130px] text-navy-800 bg-transparent" />
      </div>
      <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5">
        <Users size={17} className="text-teal-600 shrink-0" />
        <input type="number" min="1" placeholder="Travellers" className="outline-none text-sm w-[90px] placeholder:text-navy-400 text-navy-800" />
      </div>
      <button type="submit" className="btn btn-primary justify-center shrink-0">
        <Search size={16} /> Search
      </button>
    </form>
  );
}
