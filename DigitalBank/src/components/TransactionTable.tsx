import React from 'react';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  transactionDate: string;
  remarks: string;
}

interface Props {
  transactions: Transaction[];
}

const TransactionTable: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-purple-700">Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-purple-50">
                  <td className="px-4 py-2 font-medium text-gray-700">{tx.type}</td>
                  <td className="px-4 py-2 text-blue-600">₹{tx.amount}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(tx.transactionDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{tx.remarks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No transactions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;