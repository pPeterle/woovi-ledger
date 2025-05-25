import { Metadata } from "next";
import { ReactNode } from "react";
import { Layout } from "../components/Layout";
import "./styles.css";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Woovi",
  description: "",
};

export default ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};
