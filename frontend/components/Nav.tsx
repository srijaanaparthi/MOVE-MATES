import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1 rounded ${isActive ? "bg-emerald-500 text-white" : "hover:bg-emerald-50 text-gray-700"}`;

export function Nav() {
  return (
    <nav className="flex gap-2 flex-wrap">
      <NavLink to="/dashboard" className={linkClass} end>
        Dashboard
      </NavLink>
      <NavLink to="/circles" className={linkClass}>
        Study Circles
      </NavLink>
      <NavLink to="/peer" className={linkClass}>
        Peer Learning
      </NavLink>
      <NavLink to="/booking" className={linkClass}>
        Tutor Booking
      </NavLink>
      
    </nav>
  );
}


