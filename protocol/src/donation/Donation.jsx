import React, { useEffect, useState } from "react";
import Logo from "../assets/default_profile_photo.svg";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import css from "./Donation.module.css"

const KEY =
  "pk_test_51KhjjyI7TYGSS0jsLUhfTM1b6D1CGvXdAw90KV1nXso6bES1yebf1jNNjImBF5vbvpYs4BBkM1RYMOj4Q8q9fCUS00UpSjNYNN";

const Donation = () => {
  const [amount, setAmount] = useState(0);
  const [stripetoken, setStripetoken] = useState(null);

  const onToken = (token) => {
    setStripetoken(token);
  };

  useEffect(() => {
    const checkoutStripe = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3001/api/checkout/payment",
          {
            tokenId: stripetoken.id,
            amount: amount * 100,
          }
        );
        console.log(res.data);
        setAmount(0);
      } catch (error) {
        console.log(error);
      }
    };
    stripetoken && checkoutStripe();
  }, [stripetoken, amount]);

  const stripeOptions = {
    name: "Protocol Moon",
    image: Logo,
    description: `Your total donation is ${amount}`,
    amount: amount * 100,
    token: onToken,
    stripeKey: KEY,
  };

  return (
    <div id={css.donationCont}>
      <input type="number" placeholder="USD" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/>
      <StripeCheckout {...stripeOptions} billingAddress shippingAddress> <button id={css.submitBut}>Submit</button> </StripeCheckout>
    </div>
  );
};

export default Donation;
