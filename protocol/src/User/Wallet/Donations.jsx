import DonationsCss from "./Donations.module.css";
import defaultPhoto from '../../assets/default_profile_photo.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faFileAlt, faBarcode } from "@fortawesome/free-solid-svg-icons";
import Donation from "../../donation/Donation";


export default function Donations() {
    const [donations, setDonations] = useState([])
    const [page, setPage] = useState(1)
    const id = useSelector(state => state.userData.currentUser?._id)

    const getDonations = async (id) => {
        if(id) {
        const { data } = await axios.get(`/api/orders/donations/${id}?page=${page}`)
        console.log(data)
        setDonations([...data])
        }
    }

    const loadMore = (event) => {
        event.preventDefault()
        setPage(prev => prev++)
    }

    useEffect(()=>getDonations(id),[id, page])

    return (
        <div id={DonationsCss.donationCont}>
            { donations?.map(donation => {
                return (
                <div className={DonationsCss.donation}>
                    <div className={DonationsCss.UserShell}>
                        <div className={DonationsCss.imgShell}>
                            <img className={DonationsCss.img} src={donation.user.profilePhoto? donation.user.profilePhoto : defaultPhoto} />
                        </div>
                        <p className={DonationsCss.userName}> {donation.user.username && donation.user.username} </p>
                    </div>

                    <div className={DonationsCss.arrowShell}>
                        <FontAwesomeIcon icon={faAngleRight}/> {/*className={DonationsCss.} */}
                        
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </div>

                    <div className={DonationsCss.UserShell}>
                        <div className={DonationsCss.imgShell}>
                            <img className={DonationsCss.img} src={donation.to.profilePhoto? donation.to.profilePhoto : defaultPhoto} /> 
                        </div>    
                        <p className={DonationsCss.userName}> {donation.to.username && donation.to.username} </p>
                    </div>

                    <div className={DonationsCss.ticketShell}>
                        <p className={DonationsCss.amount}>Amount: <span>U$S{donation.amount && donation.amount}</span></p>
                        <a className={DonationsCss.ticketBut} target="_blank" href={donation.ticket && donation.ticket}> <FontAwesomeIcon icon={faBarcode}/> Ticket </a>
                    </div>
                </div>
            )})}
                <button id={DonationsCss.loadMoreBut} onClick={(event) => loadMore(event)}>More Donations History</button>
        </div>
    );
}