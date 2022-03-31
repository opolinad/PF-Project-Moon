import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { LOADING_0 } from "../ReduxToolkit/consts";
import { portfolioByPage } from "../ReduxToolkit/apiCalls/portfolioCall";
import { portfolioReset } from "../ReduxToolkit/reducers/portfolioSlice";
import StripeCheckout from "react-stripe-checkout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSeedling } from "@fortawesome/free-solid-svg-icons";

import css from "./UserPortfolio.module.css";

const amount = 10;
const KEY ="pk_test_51KhjjyI7TYGSS0jsLUhfTM1b6D1CGvXdAw90KV1nXso6bES1yebf1jNNjImBF5vbvpYs4BBkM1RYMOj4Q8q9fCUS00UpSjNYNN";

function ImgsPortfolioGen()
{
    const portfolio = useSelector(state => state.portfolio);

    const navigate = useNavigate();

    let imgsArrShell = portfolio.posts?.map((element,index)=><div onClick={() => navigate("/post/" + element._id)}><img src={element.img}/></div>)

    return(
        <div id={css.imgsArrShell}>
            {imgsArrShell}
        </div>
    )
}

export default function Portfolio()
{
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser);
    const userData = useSelector(state => state.userData.currentUser);
    const portfolio = useSelector(state => state.portfolio);

    const params = useParams()

    useEffect(()=>{dispatch(portfolioReset())},[params])

    //const [options, setOption] = useState({order:"",filter:""});

    function handleMore()
    {
        portfolioByPage(portfolio.page,user?._id,userData?._id,dispatch,"more","")
    }

    function handleOrder(e)
    {
        portfolioByPage(1,user?._id,userData?._id,dispatch,"order",e.target.value)
    }
    
    function handleFilter(e)
    {
        portfolioByPage(1,user?._id,userData?._id,dispatch,"filter",e.target.value)
    }

    let isPremium = user.premium.includes(userData._id);

    return(
        <div id={css.portfolioCont}>

            <div id={css.filtershell}>

                <select name="portfolioType" value={portfolio.filter} id={css.selectFilter} onChange={(e)=>handleFilter(e)}>
                    <option id={css.optionFree} value="free">Free</option>
                    <option id={isPremium ? css.optionPremium : css.optionSubscribe} value={isPremium ? "premium" : "subscribe"}>{isPremium ? "Premium" : "Subscribe!"}</option>
                </select>

                <select name="portfolioOrder" value={portfolio.order} id={css.selectOrder} onChange={(e)=>handleOrder(e)}>
                    <option value="rating">Rating</option>
                    <option value="recent">By Date</option>
                </select>

                {isPremium ? <SubscriptionBut>Subscribe!</SubscriptionBut> : <button id={css.subscribedBut}>Subscribed</button>}
            </div>

            <div id={css.imgsArrShell}>
                {portfolio.post.length? <ImgsPortfolioGen/> : <h2 id={css.insideStatus}> {portfolio.statusPortolio===LOADING_0 ? "Loading..." : "Error 404..."} </h2>}
            </div>

            <p id={css.buttonStatus}> {portfolio.post.length? (portfolio.statusPortolio===LOADING_0? "Loading More...": "Error Loading More...") : "" } </p>
            <button onClick={handleMore} id={css.loadMore}>Load More</button>

        </div>
    )
}


function SubscriptionBut()
{
    // const [amount, setAmount] = useState(0);
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
            "/api/checkout/payment", //CAMBIAR A LA RUTA VERDADERA
            {
              tokenId: stripetoken.id,
              amount: amount * 100,
            }
          );
          console.log(data);
          console.log(user, currentUser)
          if(data.success) {
            const order = {
              type: 'subscription',
              user: user._id,
              to: currentUser._id,
              amount: amount,
              card: data.success.payment_method_details.card.brand + ' ' + data.success.payment_method_details.card.last4,
              ticket: data.success.receipt_url
            }
            const res = await axios.post(`/api/orders/${currentUser._id}`, order) //CAMBIAR A RUTA VERDADERA
            console.log(res.data)
          }
        //   setAmount(0);
        } catch (error) {
          console.log(error);
        }
      };
      stripetoken && checkoutStripe();
    }, [stripetoken]);
  
    const stripeOptions = {
      name: "Protocol Moon",
      image: Logo,
      description: `Your subscription total is US$${amount}.`,
      amount: amount * 100,
      token: onToken,
      stripeKey: KEY,
    };

    return(
        <div id={css.subscriptionButCont}>
            <StripeCheckout {...stripeOptions} billingAddress shippingAddress> <button id={css.submitBut}><FontAwesomeIcon icon={faSeedling}/> Subscribe!</button> </StripeCheckout>
        </div>
    )
}