import React from "react";
import Payment from "./Payment";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";

const PaymentMain = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        <h1>SUBSCRIBE TO OUR PLANS</h1>
            <Payment/>
      </div>
    </div>
  );
};

export default PaymentMain;
