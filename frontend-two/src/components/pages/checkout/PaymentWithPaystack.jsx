import React from "react";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import validator from "validator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/utils/helper";

const PaymentWithPaystack = ({ customerDetails }) => {
  const { totalCost, cartItems } = useSelector((state) => state.cart);
  const router = useRouter();

  const config = {
    reference: new Date().getTime().toString(),
    email: customerDetails.email,
    amount: totalCost * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
  };

  // you can call this function anything
  const onSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log("Payment Ref: ", reference);
    console.log("Amount Paid: ", totalCost);
    console.log("Items Ordered: ", cartItems);
    console.log("Customer Details: ", customerDetails);

    try {
      const res = await axios.post(`${SERVER_URL}/api/v1/order/create`, {
        reference: reference,
        totalCost: totalCost,
        cartItems: cartItems,
        customerDetails: customerDetails,
      });
      console.log(res);
      alert("Thanks you order has been placed successfully");
      router.push("/"); // this is to direct to the homepage
    } catch (error) {
      console.log(error);
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  function handlePaystackPayment(event) {
    event.preventDefault();
    // check to confirm user supplied name
    if (validator.isEmpty(customerDetails.name, { ignore_whitespace: true })) {
      return alert("Please provide name");
    }
    // check to confirm user supply email
    if (validator.isEmail(customerDetails.email) === false) {
      return alert("Please provide a valid email");
    }
    // check to confirm user supply addeess
    if (
      validator.isEmpty(customerDetails.address, { ignore_whitespace: true })
    ) {
      return alert("Please provide your hoiuse address");
    }
    // check to confirm the Total cost is not zero
    if (totalCost <= 0) {
      return alert("Please you must order an item");
    }

    initializePayment({ onSuccess, onClose });
  }

  return (
    <div>
      {/* <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button> */}
      <button
        onClick={handlePaystackPayment}
        className="text-black font-bold text-lg bg-amber-800 w-full p-2 cursor-pointer hover:opacity-45 rounded-md shadow-2xl mb-4"
      >
        Pay now
      </button>
    </div>
  );
};

export default PaymentWithPaystack;
