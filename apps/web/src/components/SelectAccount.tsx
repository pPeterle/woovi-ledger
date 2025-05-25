import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SelectAccount = () => {
  const [accounts, setAccounts] = useState([
    { id: "1", name: "Main Checking", type: "checking", balance: 2500.0 },
    { id: "2", name: "Savings", type: "savings", balance: 15000.0 },
  ]);
  return (
    <Select>
      <SelectTrigger className="h-14 w-full">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            <div className="flex justify-between items-center w-full">
              <span>{account.name}</span>
              <span className="text-gray-500 ml-4">
                ${account.balance.toFixed(2)}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
