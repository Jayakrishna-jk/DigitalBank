// FundTransferForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FundTransferForm = () => {
  const initialValues = {
    transferTo: '',
    amount: '',
    sms: '',
    email: '',
    otpMethod: '',
    otp: '',
  };

  const validationSchema = Yup.object({
    transferTo: Yup.string().required('Required'),
    amount: Yup.number().positive('Must be positive').required('Required'),
    sms: Yup.string().matches(/^\d{10}$/, 'Invalid SMS number'),
    email: Yup.string().email('Invalid email'),
    otpMethod: Yup.string().required('Select OTP method'),
    otp: Yup.string().required('Enter OTP'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Fund Transfer Submitted:', values);
    // Add fund transfer logic here
  };

  const handleSendOtp = (method: string) => {
    console.log(`Sending OTP via ${method}`);
    // Add OTP sending logic here (e.g., Axios call)
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Fund Transfer</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, resetForm }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Fund Transfer To</label>
              <Field name="transferTo" className="w-full p-2 border rounded" />
              <ErrorMessage name="transferTo" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Amount</label>
              <Field name="amount" type="number" className="w-full p-2 border rounded" />
              <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
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
              <ErrorMessage name="otpMethod" component="div" className="text-red-500 text-sm mt-1" />
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
              <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Fund Transfer
              </button>
              <button type="button" onClick={() => resetForm()} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
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
