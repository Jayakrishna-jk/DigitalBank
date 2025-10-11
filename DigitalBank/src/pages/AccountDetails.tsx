import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailForm from "../components/pages/detail-form";
import DataView from "../components/data-view/index";
const AccountDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [account, setAccount] = useState(state || null);

  useEffect(() => {
    if (!state) {
      axios.get(`http://localhost:3001/accounts/${id}`).then((res) => {
        setAccount(res.data);
      });
    }
  }, [id, state]);
  console.log(account.transactions);
  if (!account) return <div>Loading...</div>;

  return (
    <>
      <DetailForm
        title="Account Details"
        fields={[
          { id: 1, label: "Name", value: account.holderName },
          { id: 2, label: "Type", value: account.accountType },
          { id: 3, label: "Email Id", value: account.email || "N/A" },
          { id: 4, label: "Account Number", value: account.accountNumber },
          {
            id: 5,
            label: "Creation Date",
            value: account.creationDate || "N/A",
          },
          { id: 6, label: "Phone Number", value: account.phoneNumber || "N/A" },
        ]}
        buttons={[
          { id: 1, text: "View Beneficiaries", to: "/viewbenificiary" },
          { id: 2, text: "Fund Transfer", to: "/bankSummaryDetails" },
        ]}
      />
      {/* <TransactionTable transactions={account.transactions} /> */}
      {/* <DataView /> */}
      {/* <DataView
        title="Transaction History"
        data={account.transactions}
        columns={[
          { id: 1, text: 'Type', key: 'type' },
          { id: 2, text: 'Amount', key: 'amount' },
          { id: 3, text: 'Date	', key: 'date' },
          { id: 4, text: 'Remarks', key: 'remarks' },
  
        ]}
        search={true}
        paginations={true}
        dateRange={true}
      /> */}
      <DataView
        title="Transaction History"
        data={account.transactions}
        columns={[
          { id: 1, text: "Type", key: "type" },
          { id: 2, text: "Amount", key: "amount" },
          {
            id: 3,
            text: "Date",
            key: "transactionDate",
            render: (value: string) => new Date(value).toLocaleString(),
          },
          { id: 4, text: "Remarks", key: "remarks" },
        ]}
        search={true}
        paginations={true}
        dateRange={true}
      />
    </>
  );
};

export default AccountDetails;
