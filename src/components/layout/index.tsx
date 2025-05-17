import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="bg-main w-full flex justify-center items-center">
        <div className="w-page">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
