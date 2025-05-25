import { Toaster } from "sonner";
import { Navigation } from "./Navigation";

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <Toaster />
        <div className="min-h-screen">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
};
