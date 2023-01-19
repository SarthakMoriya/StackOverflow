import {
  CardElement,
  PaymentElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51MRccSSBHS26neoyDUFRmmicu0J6VEURVx4vuyoVH1sbg6QpBavU622j0jSWxClwXYcAMUojnpjY2zZDNKrCiQ2p007zBMjGCS"
  );

  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createSubscription = async () => {
    try {
    } catch (error) {
      alert("Payemnt Failed!" + error.message);
    }
  };
  return (
    <div>
      Name:{" "}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      Email:{" "}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <CardElement />
      <br />
      {/* <button onClick={createSubscription}>Subscribe</button> */}
    </div>
  );
};

export default Payment;
