import { DollarSign } from "lucide-react";
import { Input } from "./ui/input";

interface Props extends React.ComponentProps<"input"> {}

export const AmountInput = (props: Props) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        Amount (cents)
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          {...props}
          type="number"
          className="pl-10 text-xl font-semibold h-14"
        />
      </div>
    </div>
  );
};
