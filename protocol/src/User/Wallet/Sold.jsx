import SoldCss from "./Sold.module.css";
import defaultPhoto from '../../assets/default_profile_photo.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Sold() {
    const [solds, setSolds] = useState([])
    const [page, setPage] = useState(1)
    const id = useSelector(state => state.userData.currentUser?._id)

    const getSolds = async (id) => {
        if(id) {
        const { data } = await axios.get(`/api/orders/solds/${id}?page=${page}`)
        console.log(data)
        setSolds([...data])
        }
    }

    const loadMore = (event) => {
        event.preventDefault()
        setPage(prev => prev++)
    }

    useEffect(()=>getSolds(id),[id, page])

    return (
        <div className={SoldCss.margin}>
            { solds?.map(sold => {
                return (<div className={SoldCss.sold}>
                    <div>
                        <img clasName={SoldCss.photo} src={sold.user.profilePhoto? sold.user.profilePhoto : defaultPhoto} />
                        {sold.user.username && sold.user.username}
                    </div>
                    <div>
                        <img src="https://thumbs.dreamstime.com/z/icono-del-vector-de-la-flecha-derecha-aislado-en-el-fondo-transparente-concepto-logotipo-137195702.jpg" alt="Not found :C"/>
                    </div>
                    <div>
                        <img src={sold.to.profilePhoto? sold.to.profilePhoto : defaultPhoto} />
                        {sold.to.username && sold.to.username}
                    </div>
                    <div>
                        Amount: {sold.amount && sold.amount}
                    </div>
                    <div>
                        <a href={sold.ticket && sold.ticket}> Ticket </a>
                    </div>
                    <div>
                        <img src={sold.post.image? sold.post.image[0] : ""}/>
                    </div>
                </div>
            )})}
            <div>
                <button onClick={(event) => loadMore(event)}>ShowMore</button>
            </div>
        </div>
    );
}