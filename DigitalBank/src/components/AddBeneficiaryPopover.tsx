import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface Props {
  onClose: () => void;
  onAdd: (data: { name: string; accountNumber: string; bank: string }) => void;
}

const AddBeneficiaryPopover: React.FC<Props> = ({ onClose, onAdd }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add Beneficiary</h3>
        <Formik
          initialValues={{ name: '', accountNumber: '', bank: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            accountNumber: Yup.string().required('Required'),
            bank: Yup.string().required('Required'),
          })}
          onSubmit={(values, { resetForm }) => {
            onAdd(values);
            resetForm();
          }}
        >
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <Field name="name" className="w-full p-2 border rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Account Number</label>
              <Field name="accountNumber" className="w-full p-2 border rounded" />
              <ErrorMessage name="accountNumber" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Bank</label>
              <Field name="bank" className="w-full p-2 border rounded" />
              <ErrorMessage name="bank" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-end gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Add
              </button>
              <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddBeneficiaryPopover;