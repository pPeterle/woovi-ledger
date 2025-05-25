"use client";
import { AddAccountButton } from "@/components/AddAcountButton";
import { AmountInput } from "@/components/AmountInput";
import { Headline } from "@/components/Headline";
import { MainButton } from "@/components/MainButton";
import { MainCard } from "@/components/MainCard";
import { SelectAccount } from "@/components/SelectAccount";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");

  const [accounts, setAccounts] = useState([
    { id: "1", name: "Main Checking", type: "checking", balance: 2500.0 },
    { id: "2", name: "Savings", type: "savings", balance: 15000.0 },
  ]);

  const handleDeposit = () => {
    if (!amount || !selectedAccount) {
      toast.error("Please enter an amount and select an account");

      return;
    }

    toast.success("Deposit Successful", {
      description: `$${amount} deposited to ${accounts.find(
        (acc) => acc.id === selectedAccount
      )?.name}`,
    });

    setAmount("");
    setSelectedAccount("");
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="max-w-md mx-auto">
        <Headline
          title="Transfer Funds"
          subtitle="Transfer money between accounts"
        />

        <MainCard>
          <AmountInput />

          <div>
            <label className="text-sm font-medium text-gray-700">
              From Account
            </label>
            <SelectAccount />
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              To Account
            </label>
            <AddAccountButton />
          </div>
          <SelectAccount />

          <MainButton
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            title="Transfer"
            onClick={handleDeposit}
          />
        </MainCard>
      </section>
    </main>
  );
}
