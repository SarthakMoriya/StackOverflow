import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm";

import "./Payment.css"

const Payment = () => {
  const publicKey =
    "pk_test_51MRccSSBHS26neoyDUFRmmicu0J6VEURVx4vuyoVH1sbg6QpBavU622j0jSWxClwXYcAMUojnpjY2zZDNKrCiQ2p007zBMjGCS";
  const stripeTestPromise = loadStripe(publicKey);
  const [firstPack, setFirstPack] = useState(false);
  const [secondPack, setSecondPack] = useState(false);
  return (
    <div className="payment-container">
      <div className="payment-box">
        <div className="">1 Question Per Month</div>
        <div className="">Free</div>
        <div className="">
          <button disabled>Buy</button>
        </div>
      </div>
      <div className="payment-box">
        <div className="">2 Question Per Month</div>
        <div className="">100/PerMonth</div>
        <div className="">
          {!firstPack && (
            <button
              onClick={() => {
                setFirstPack(!firstPack);
                setSecondPack(false);
              }}
            >
              Buy
            </button>
          )}
        </div>
      </div>
      <div className="payment-box">
        <div className="">5 Question Per Month</div>
        <div className="">1000/PerMonth</div>
        <div className="">
          {!secondPack && (
            <button
              onClick={() => {
                setSecondPack(!secondPack);
                setFirstPack(false);
              }}
            >
              Buy
            </button>
          )}
        </div>
      </div>
      {firstPack && (
        <div>
          <h2>SUBSCRIBE TO $10 Per Month Pack!</h2>
          <Elements stripe={stripeTestPromise}>
            <StripePaymentForm />
          </Elements>
          <button
            type="button"
            onClick={() => {
              setFirstPack(!firstPack);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      {secondPack && (
        <div>
          <h2>SUBSCRIBE TO $100 Per Month Pack!</h2>
          <Elements stripe={stripeTestPromise}>
            <StripePaymentForm />
            <button
              type="button"
              onClick={() => {
                setSecondPack(!secondPack);
              }}
            >
              Cancel
            </button>
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Payment;
