import CartList from "@/components/pages/cart/CartList";
import CartSummary from "@/components/pages/cart/CartSummary";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto py-20  px-4 flex flex-col lg:flex-row gap-16 items-start">
      <div className="w-full lg:w-[60%]">
        <CartList />
      </div>
      <div className="w-full lg:w-[40%]">
        <CartSummary />
      </div>
    </div>
  );
};

export default Page;
