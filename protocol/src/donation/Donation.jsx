import React, { useEffect, useState } from "react";
import Logo from "../assets/default_profile_photo.svg";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSeedling } from "@fortawesome/free-solid-svg-icons";

import css from "./Donation.module.css"
import { useSelector } from "react-redux";

const KEY =
  "pk_test_51KhjjyI7TYGSS0jsLUhfTM1b6D1CGvXdAw90KV1nXso6bES1yebf1jNNjImBF5vbvpYs4BBkM1RYMOj4Q8q9fCUS00UpSjNYNN";

const Donation = () => {
  const [amount, setAmount] = useState(0);
  const [stripetoken, setStripetoken] = useState(null);
  const currentUser = useSelector((state) => state.userData.currentUser)
  const user = useSelector((state) => state.user.currentUser)

  const onToken = (token) => {
    setStripetoken(token);
  };

  useEffect(() => {
    const checkoutStripe = async () => {
      try {
        const { data }= await axios.post(
          "/api/checkout/payment",
          {
            tokenId: stripetoken.id,
            amount: amount * 100,
          }
        );
        console.log(data);
        console.log(user, currentUser)
        if(data.success) {
          const order = {
            type: 'donation',
            user: user._id,
            to: currentUser._id,
            amount: amount,
            card: data.success.payment_method_details.card.brand + ' ' + data.success.payment_method_details.card.last4,
            ticket: data.success.receipt_url
          }
          const res = await axios.post(`/api/orders/${currentUser._id}`, order)
          console.log(res.data)
        }
        setAmount(0);
      } catch (error) {
        console.log(error);
      }
    };
    stripetoken && checkoutStripe();
  }, [stripetoken]);

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
      <input id={css.donationInput} type="number" placeholder="USD" value={amount} onChange={(e) => { e.preventDefault()
      setAmount(parseInt(e.target.value))}}/>
      <StripeCheckout {...stripeOptions} billingAddress shippingAddress> <button id={css.submitBut}><FontAwesomeIcon icon={faSeedling}/></button> </StripeCheckout>
    </div>
  );
};

export default Donation;
