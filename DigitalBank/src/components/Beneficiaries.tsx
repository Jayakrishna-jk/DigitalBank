import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBeneficiaryPopover from './AddBeneficiaryPopover';

interface Beneficiary {
  id: number;
  name: string;
  accountNumber: string;
  bank: string;
}

const BeneficiariesTable = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [showPopover, setShowPopover] = useState(false);

  const fetchBeneficiaries = async () => {
    const res = await axios.get('http://localhost:3001/beneficiaries');
    setBeneficiaries(res.data);
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const handleAdd = async (newBeneficiary: Omit<Beneficiary, 'id'>) => {
    await axios.post('http://localhost:3001/beneficiaries', newBeneficiary);
    fetchBeneficiaries();
    setShowPopover(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">Beneficiaries</h2>
        <button
          onClick={() => setShowPopover(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded hover:opacity-90"
        >
          Add Beneficiary
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Account Number</th>
            <th className="px-4 py-2 text-left">Bank</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((b, index) => (
            <tr
              key={b.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-purple-50 transition duration-200`}
            >
              <td className="px-4 py-2 font-medium text-gray-800">{b.name}</td>
              <td className="px-4 py-2 text-blue-600">{b.accountNumber}</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded text-sm">
                  {b.bank}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopover && (
        <AddBeneficiaryPopover
          onClose={() => setShowPopover(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default BeneficiariesTable;