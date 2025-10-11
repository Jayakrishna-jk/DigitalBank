import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store";
import { fetchAccounts } from "../Store/Slices/accountSlice";
import { useNavigate } from "react-router-dom";
import Beneficiaries from "./Beneficiaries";

export default function BankSummaryTable() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state: RootState) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const navigatetoDetails = () => {
    navigate("/bankSummaryDetails");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Bank Account Summary</h2>
      <table className="min-w-full border border-gray-300 rounded overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <th className="p-3 text-left">Holder Name</th>
            <th className="p-3 text-left">Account Type</th>
            <th className="p-3 text-left">Account Number</th>
            <th className="p-3 text-left">Balance</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((account, index) => (
            <tr
              key={account.id}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
            >
              <td className="p-3">{account.holderName}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    account.accountType === "Savings"
                      ? "bg-green-500"
                      : account.accountType === "Current"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`}
                >
                  {account.accountType}
                </span>
              </td>
              <td className="p-3">{account.accountNumber}</td>
              <td className="p-3 text-right text-blue-600 font-semibold">
                ₹{account.balance.toLocaleString()}
              </td>
              <td className="p-3">
                <button
                  className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                  onClick={navigatetoDetails}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <Beneficiaries />
      </div>
    </div>
  );
}