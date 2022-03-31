import DonationsCss from "./Donations.module.css";
import defaultPhoto from '../../assets/default_profile_photo.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        <div className={DonationsCss.margin}>
            { donations?.map(donation => {
                return (<div className={DonationsCss.donation}>
                    <div>
                        <img clasName={DonationsCss.photo} src={donation.user.profilePhoto? donation.user.profilePhoto : defaultPhoto} />
                        {donation.user.username && donation.user.username}
                    </div>
                    <div>
                        <img src="https://thumbs.dreamstime.com/z/icono-del-vector-de-la-flecha-derecha-aislado-en-el-fondo-transparente-concepto-logotipo-137195702.jpg" alt="Not found :C"/>
                    </div>
                    <div>
                        <img src={donation.to.profilePhoto? donation.to.profilePhoto : defaultPhoto} />
                        {donation.to.username && donation.to.username}
                    </div>
                    <div>
                        Amount: {donation.amount && donation.amount}
                    </div>
                    <div>
                        <a href={donation.ticket && donation.ticket}> Ticket </a>
                    </div>
                </div>
            )})}
            <div>
                <button onClick={(event) => loadMore(event)}>ShowMore</button>
            </div>
        </div>
    );
}