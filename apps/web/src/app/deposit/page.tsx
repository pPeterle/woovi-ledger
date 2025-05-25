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

  const handleDeposit = () => {
    if (!amount || !selectedAccount) {
      toast.error("Please enter an amount and select an account");

      return;
    }

    // toast.success("Deposit Successful", {
    //   description: `$${amount} deposited to ${accounts.find(
    //     (acc) => acc.id === selectedAccount
    //   )?.name}`,
    // });

    setAmount("");
    setSelectedAccount("");
  };

  return (
    <>
      <main className="container mx-auto px-4 py-12">
        <section className="max-w-md mx-auto">
          <Headline
            title="Make a deposit"
            subtitle="Add funds to your account"
          />

          <MainCard>
            <AmountInput />
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Fromm Account
              </label>
              <AddAccountButton />
            </div>

            <SelectAccount />

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-2"
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>

            <MainButton
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              title="Deposit"
              onClick={handleDeposit}
            />
          </MainCard>
        </section>
      </main>
    </>
  );
}
