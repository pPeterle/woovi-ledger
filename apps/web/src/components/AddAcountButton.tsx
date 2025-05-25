"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AccountModal } from "./AccountModal";
import { Button } from "./ui/button";

export const AddAccountButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="text-xs"
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Account
      </Button>

      <AccountModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
