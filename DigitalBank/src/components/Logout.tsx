import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // or your icon library

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 w-full bg-white text-indigo-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
    >
      <LogOut size={20} color="blue" />
      Logout
    </button>
  );
};

export default LogoutButton;
