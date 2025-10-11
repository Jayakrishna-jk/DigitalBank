import { useLocation, useRoutes } from "react-router-dom";
import { router } from "../Routing/routes";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {!isLoginPage && <Header />}
        {useRoutes(router)}
        {!isLoginPage && <Footer />}
      </div>
    </>
  );
}
