import DetailForm from "../components/pages/detail-form";
import DataView from '../components/data-view';
import { useNavigate } from "react-router-dom";

const transactionData = [
  { id: 1, name: 'John Doe', type: 'Savings', email: 'john.doe@example.com', accountNumber: '1234567890', creationDate: '2023-01-01', phoneNumber: '1234567890' },
  { id: 2, name: 'Jane Smith', type: 'Checking', email: 'jane.smith@example.com', accountNumber: '0987654321', creationDate: '2023-02-01', phoneNumber: '0987654321' },
  { id: 3, name: 'Bob Johnson', type: 'Savings', email: 'bob.johnson@example.com', accountNumber: '1122334455', creationDate: '2023-03-01', phoneNumber: '1122334455' },
  { id: 4, name: 'Alice Brown', type: 'Checking', email: 'alice.brown@example.com', accountNumber: '5566778899', creationDate: '2023-04-01', phoneNumber: '5566778899' },
  { id: 5, name: 'Charlie Davis', type: 'Savings', email: 'charlie.davis@example.com', accountNumber: '9988776655', creationDate: '2023-05-01', phoneNumber: '9988776655' },
  { id: 6, name: 'Emily Wilson', type: 'Savings', email: 'emily.wilson@example.com', accountNumber: '4455667788', creationDate: '2023-06-01', phoneNumber: '9988123456' },
  { id: 7, name: 'Michael Taylor', type: 'Checking', email: 'michael.taylor@example.com', accountNumber: '2233445566', creationDate: '2023-06-15', phoneNumber: '9876543210' },
  { id: 8, name: 'Sarah Miller', type: 'Savings', email: 'sarah.miller@example.com', accountNumber: '3344556677', creationDate: '2023-07-01', phoneNumber: '8765432109' },
  { id: 9, name: 'David Anderson', type: 'Checking', email: 'david.anderson@example.com', accountNumber: '6677889900', creationDate: '2023-07-20', phoneNumber: '7654321098' },
  { id: 10, name: 'Olivia Thomas', type: 'Savings', email: 'olivia.thomas@example.com', accountNumber: '7788990011', creationDate: '2023-08-05', phoneNumber: '6543210987' },
  { id: 11, name: 'Ethan Moore', type: 'Checking', email: 'ethan.moore@example.com', accountNumber: '8899001122', creationDate: '2023-08-20', phoneNumber: '5432109876' },
  { id: 12, name: 'Sophia Jackson', type: 'Savings', email: 'sophia.jackson@example.com', accountNumber: '9900112233', creationDate: '2023-09-01', phoneNumber: '4321098765' },
  { id: 13, name: 'Liam White', type: 'Checking', email: 'liam.white@example.com', accountNumber: '1011121314', creationDate: '2023-09-15', phoneNumber: '3210987654' },
  { id: 14, name: 'Ava Harris', type: 'Savings', email: 'ava.harris@example.com', accountNumber: '1213141516', creationDate: '2023-10-01', phoneNumber: '2109876543' },
  { id: 15, name: 'Noah Martin', type: 'Checking', email: 'noah.martin@example.com', accountNumber: '1314151617', creationDate: '2023-10-10', phoneNumber: '1098765432' },
  { id: 16, name: 'Isabella Lee', type: 'Savings', email: 'isabella.lee@example.com', accountNumber: '1415161718', creationDate: '2023-11-01', phoneNumber: '9988775544' },
  { id: 17, name: 'James Perez', type: 'Checking', email: 'james.perez@example.com', accountNumber: '1516171819', creationDate: '2023-11-20', phoneNumber: '8877665544' },
  { id: 18, name: 'Mia Walker', type: 'Savings', email: 'mia.walker@example.com', accountNumber: '1617181920', creationDate: '2023-12-01', phoneNumber: '7766554433' },
  { id: 19, name: 'Lucas Hall', type: 'Checking', email: 'lucas.hall@example.com', accountNumber: '1718192021', creationDate: '2023-12-15', phoneNumber: '6655443322' },
  { id: 20, name: 'Amelia Allen', type: 'Savings', email: 'amelia.allen@example.com', accountNumber: '1819202122', creationDate: '2024-01-01', phoneNumber: '5544332211' }
];


export default function AccountDetails() {

  const navigate = useNavigate();

  return (
    <>
      <DetailForm
        title="Account Details"
        fields={[
          { id: 1, type: 'text', placeholder: 'Name' },
          { id: 2, type: 'text', placeholder: 'Type' },
          { id: 3, type: 'email', placeholder: 'Email Id' },
          { id: 4, type: 'text', placeholder: 'Account Number' },
          { id: 5, type: 'text', placeholder: 'Creation Date' },
          { id: 6, type: 'number', placeholder: 'Phone Number' }
        ]}

        buttons={[
          { id: 1, text: ' View Beneficiaries', to: '/dashboard' },
          { id: 2, text: 'Fund Transfer', to: '/bankSummaryDetails' }
        ]}
      />
      <DataView
        data={transactionData}
        columns={[
          { id: 1, text: 'Name', key: 'name' },
          { id: 2, text: 'Type', key: 'type' },
          { id: 3, text: 'Email Id', key: 'email' },
          { id: 4, text: 'Account Number', key: 'accountNumber' },
          { id: 5, text: 'Creation Date', key: 'creationDate' },
          { id: 6, text: 'Phone Number', key: 'phoneNumber' }
        ]}
        search={true}
        paginations={true}
        dateRange={true}
      />

    </>
  )
}
