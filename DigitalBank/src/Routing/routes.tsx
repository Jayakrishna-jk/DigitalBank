import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import FundTransferForm from "../components/FundTransfer";
import AccountDetails from "../pages/AccountDetails";

const LoginForm = lazy(() => import("../pages/Login"));
const BankSummaryTable = lazy(() => import("../components/BankSummaryTable"));

const NotFound = lazy(() => import("../components/NotFound"));
// const AccountDetails = lazy(() => import("../pages/AccountDetails"));
const Beneficiaries = lazy(() => import("../components/Beneficiaries"));


export const router: RouteObject[] = [
  { path: "/login", element: <LoginForm /> },
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
  },
  {
    path: "/viewbenificiary", element: (<Beneficiaries/>)
  },
  { path: "*", element: <NotFound /> },
];
