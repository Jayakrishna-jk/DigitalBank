// import ProtectedRoute from "@/components/ProtectedRoute";
// import Unauthorized from "@/components/UnAuthoraised";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import BankSummaryTable from "../components/BankSummaryTable";
import FundTransferForm from "../components/FundTransfer";
import AccountDetails from "../pages/AccountDetails";

const LoginForm = lazy(() => import("../pages/Login"));
// const Home = lazy(() => import("../pages/Home"));

// const NotFound = lazy(() => import("../components/Notfound"));

export const router: RouteObject[] = [
  { path: "/login", element: <LoginForm /> },
  {
    path: "/home",
    element: (
    //   <ProtectedRoute allowedRoles={["admin"]}>
        <Home />
    //   </ProtectedRoute>
    ),
  },
  {
    path:'/dashboard',
    element:(
        <BankSummaryTable />
    )
  },
  {
    path:'/bankSummaryDetails',
    element:(
        <FundTransferForm />
    )

  },
  {
    path: "/account-details/:id", element: (<AccountDetails/>)
  }
//   {
//     path: "/unauthorized",
//     element: (
//         <Unauthorized />
//     ),
//   },
//   { path: "*", element: <NotFound /> },
];
