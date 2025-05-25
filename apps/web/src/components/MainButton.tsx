import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export const MainButton = ({ title, onClick, disabled, className }: Props) => {
  return (
    <Button
      onClick={onClick}
      className={cn("w-full h-14 mt-4 text-lg font-semibold", className)}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};
