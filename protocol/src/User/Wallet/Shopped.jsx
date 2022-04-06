import ShoppedCss from "./Shopped.module.css";
import defaultPhoto from '../../assets/default_profile_photo.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faFileAlt, faBarcode } from "@fortawesome/free-solid-svg-icons";


export default function Shopped() {
    const [shoppeds, setShoppeds] = useState([])
    const [page, setPage] = useState(1)
    const id = useSelector(state => state.userData.currentUser?._id)

    const getShoppeds = async (id) => {
        if(id) {
        const { data } = await axios.get(`/api/orders/shopped/${id}?page=${page}`)
        console.log(data)   
        setShoppeds([...data])
        }
    }

    const loadMore = (event) => {
        event.preventDefault()
        setPage(prev => prev++)
    }

    useEffect(()=>getShoppeds(id),[id, page])

    return (
        <div id={ShoppedCss.shoppedCont}>
            { shoppeds?.map(shopped => {
                return (
                    <div className={ShoppedCss.wholeCont}>
                        <div className= {ShoppedCss.shopped}>
                            <div className={ShoppedCss.UserShell}>
                                <div className={ShoppedCss.imgShell}>
                                    <img clasName= {ShoppedCss.img} src={shopped.user.profilePhoto? shopped.user.profilePhoto : defaultPhoto} />
                                </div>
                                <p className={ShoppedCss.userName}>{shopped.user.username && shopped.user.username}</p>
                            </div>

                            <div className={ShoppedCss.arrowShell}>
                                <FontAwesomeIcon icon={faAngleRight}/> {/*className={ShoppedCss.} */}
                                <p>Bought From</p>  
                                <FontAwesomeIcon icon={faAngleRight}/>
                            </div>

                            <div className={ShoppedCss.UserShell}>
                                <div className={ShoppedCss.imgShell}>
                                    <img clasName= {ShoppedCss.img} src={shopped.to.profilePhoto? shopped.to.profilePhoto : defaultPhoto} />
                                </div>
                                <p className={ShoppedCss.userName}>{shopped.to.username && shopped.to.username}</p>
                            </div>
                                
                            <div className={ShoppedCss.ticketShell}>
                                <p className={ShoppedCss.amount}>Amount: <span>US${shopped.amount && shopped.amount}</span></p>
                                <a className={ShoppedCss.ticketBut} target="_blank" href={shopped.ticket && shopped.ticket}> <FontAwesomeIcon icon={faBarcode}/> Ticket </a>
                            </div>
                        </div>
                    
                        {/* <div className={ShoppedCss.purchasedShell}>
                            <img className={ShoppedCss.purchased} src={shopped.post.image}/>
                        </div> */}
                    </div>

            )})}
                <button id={ShoppedCss.loadMoreBut} onClick={(event) => loadMore(event)}>ShowMore</button>
        </div>
    );
}