import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const FundTransferForm = () => {
  const [generatedOtp, setGeneratedOtp] = useState("");
  const navigate=useNavigate();
  const initialValues = {
    transferTo: "",
    amount: "",
    sms: "",
    email: "",
    otpMethod: "",
    otp: "",
  };

  const validationSchema = Yup.object({
    transferTo: Yup.string().required("Required"),
    amount: Yup.number().positive("Must be positive").required("Required"),
    sms: Yup.string().matches(/^\d{10}$/, "Invalid SMS number"),
    email: Yup.string().email("Invalid email"),
    otpMethod: Yup.string().required("Select OTP method"),
    otp: Yup.string().required("Enter OTP"),
  });
  const resetForm = ()=>{
    navigate('/dashboard')
  }
  const handleSendOtp = (method: string) => {
    if (!method) {
      toast.error("Please select OTP method");
      return;
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
    setGeneratedOtp(otp);

    toast.success(`OTP sent via ${method}: ${otp}`);
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      // Validate OTP
      if (values.otp !== generatedOtp) {
        toast.error("Invalid OTP");
        return;
      }

      const senderAccountNumber = "1234567890"; // Replace with dynamic value if needed
      const transferAmount = Number(values.amount);

      // Fetch sender and recipient accounts by accountNumber
      const [senderRes, recipientRes] = await Promise.all([
        axios.get(
          `http://localhost:3001/accounts?accountNumber=${senderAccountNumber}`
        ),
        axios.get(
          `http://localhost:3001/accounts?accountNumber=${values.transferTo}`
        ),
      ]);

      const sender = senderRes.data[0];
      const recipient = recipientRes.data[0];

      if (!sender || !recipient) {
        toast.error("Account not found.");
        return;
      }
      const transactionDate = new Date().toISOString();
      await axios.patch(`http://localhost:3001/accounts/${sender.id}`, {
        balance: sender.balance - transferAmount,
        transactionDate,
        transactions: [
          ...(sender.transactions || []),
          {
            id: Date.now(),
            type: "debit",
            amount: transferAmount,
            transactionDate,
            remarks: `Transferred to ${recipient.accountNumber}`,
          },
        ],
      });
    await axios.patch(`http://localhost:3001/accounts/${recipient.id}`, {
            balance: recipient.balance + transferAmount,
            transactionDate,
            transactions: [
            ...(sender.transactions || []),
            {
                id: Date.now(),
                type: "credit",
                amount: transferAmount,
                transactionDate,
                remarks: `Transferred to ${recipient.accountNumber}`,
            },
            ],
        });

      if (sender.balance < transferAmount) {
        toast.error("Insufficient balance.");
        return;
      }

      await Promise.all([
        axios.patch(`http://localhost:3001/accounts/${sender.id}`, {
          balance: sender.balance - transferAmount,
        }),
        axios.patch(`http://localhost:3001/accounts/${recipient.id}`, {
          balance: recipient.balance + transferAmount,
        }),
      ]);

      toast.success("Transfer successful!");
      resetForm();
    } catch (error) {
      console.error("Transfer failed:", error);
      toast.error("Transfer failed. Please check account numbers.");
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Fund Transfer</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">
                Fund Transfer To (Account Number)
              </label>
              <Field name="transferTo" className="w-full p-2 border rounded" />
              <ErrorMessage
                name="transferTo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Amount</label>
              <Field
                name="amount"
                type="number"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Send OTP via</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <Field type="radio" name="otpMethod" value="sms" />
                  SMS
                </label>
                <label className="flex items-center gap-2">
                  <Field type="radio" name="otpMethod" value="email" />
                  Email
                </label>
              </div>
              <ErrorMessage
                name="otpMethod"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <button
                type="button"
                onClick={() => handleSendOtp(values.otpMethod)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Send OTP
              </button>
            </div>

            <div>
              <label className="block font-medium">Enter OTP</label>
              <Field name="otp" className="w-full p-2 border rounded" />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Fund Transfer
              </button>
              <button
                type="button"
                onClick={() => resetForm()}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FundTransferForm;
