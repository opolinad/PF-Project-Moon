import ShoppedCss from "./Shopped.module.css";
import defaultPhoto from '../../assets/default_profile_photo.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        <div className= {ShoppedCss.margin}>
            { shoppeds?.map(shopped => {
                return (<div className= {ShoppedCss.shopped}>
                    <div>
                        <img clasName= {ShoppedCss.photo} src={shopped.user.profilePhoto? shopped.user.profilePhoto : defaultPhoto} />
                        {shopped.user.username && shopped.user.username}
                    </div>
                    <div>
                        <img src="https://thumbs.dreamstime.com/z/icono-del-vector-de-la-flecha-derecha-aislado-en-el-fondo-transparente-concepto-logotipo-137195702.jpg" alt="Not found :C"/>
                    </div>
                    <div>
                        <img src={shopped.to.profilePhoto? shopped.to.profilePhoto : defaultPhoto} />
                        {shopped.to.username && shopped.to.username}
                    </div>
                    <div>
                        Amount: {shopped.amount && shopped.amount}
                    </div>
                    <div>
                        <a href={shopped.ticket && shopped.ticket}> Ticket </a>
                    </div>
                    <div>
                        <img src={shopped.post.image[0]}/>
                    </div>
                </div>
            )})}
            <div>
                <button onClick={(event) => loadMore(event)}>ShowMore</button>
            </div>
        </div>
    );
}