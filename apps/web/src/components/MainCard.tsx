import { ReactNode } from "react";
import { Card } from "./ui/card";

type Props = {
  children: ReactNode;
};

export const MainCard = ({ children }: Props) => {
  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl">
      {children}
    </Card>
  );
};
