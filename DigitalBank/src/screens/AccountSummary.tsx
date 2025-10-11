import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../components/ui/table';
import customerData from '../assets/db.json';

// Mock data with multiple customers
const customersData = [
  {
    customerId: 'CUST001',
    userName: 'John Doe',
    accounts: [
      {
        accountType: 'Savings',
        accountNumber: '1234567890',
        balance: 50000.00,
        status: 'active'
      },
      {
        accountType: 'Checking',
        accountNumber: '0987654321',
        balance: 35000.00,
        status: 'active'
      }
    ]
  },
  {
    customerId: 'CUST002',
    userName: 'Jane Smith',
    accounts: [
      {
        accountType: 'Savings',
        accountNumber: '2345678901',
        balance: 25000.00,
        status: 'active'
      },
      {
        accountType: 'Fixed Deposit',
        accountNumber: '8765432109',
        balance: 100000.00,
        status: 'locked'
      }
    ]
  },
  {
    customerId: 'CUST003',
    userName: 'Robert Johnson',
    accounts: [
      {
        accountType: 'Checking',
        accountNumber: '3456789012',
        balance: 75000.00,
        status: 'active'
      },
      {
        accountType: 'Investment',
        accountNumber: '7654321098',
        balance: 250000.00,
        status: 'active'
      }
    ]
  }
];

interface Account {
  accountType: string;
  accountNumber: string;
  balance: number;
  status: 'active' | 'locked';
}

interface Customer {
  customerId: string;
  userName: string;
  status: 'premium' | 'standard';
  accounts: Account[];
}

const AccountSummary = () => {
  const getTotalBalance = (accounts: Account[]) => {
    return accounts.reduce((sum, account) => sum + account.balance, 0);
  };

  const getStatusColor = (status: 'premium' | 'standard') => {
    return status === 'premium' ? 'bg-purple-100' : 'bg-gray-50';
  };

  const getAccountStatusColor = (status: 'active' | 'locked') => {
    return status === 'active' ? 'text-green-600' : 'text-amber-600';
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Account Summary Dashboard</h1>

      {customersData.map((customer) => (
        <div 
          key={customer.customerId}
          className={`rounded-lg shadow-sm p-6`}
        >
          {/* Customer Header */}
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {customer.userName}
              </h2>
              <p className="text-gray-600">ID: {customer.customerId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-xl font-bold text-gray-900">
                ${getTotalBalance(customer?.accounts?.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Accounts Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Type</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.accounts.map((account) => (
                <TableRow key={account.accountNumber}>
                  <TableCell className="font-medium">{account.accountType}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center ${getAccountStatusColor(account.status)}`}>
                      {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default AccountSummary;
