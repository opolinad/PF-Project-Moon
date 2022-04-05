    import { useDispatch, useSelector } from "react-redux";
import profilePhoto from "../assets/default_profile_photo.svg";
import { followAndUnFollow, followCall } from "../ReduxToolkit/apiCalls/followUser";
import { Link } from "react-router-dom";

import css from "./CardUser.module.css";

export default function CardUser({image, fullName, userName, currentUserId, userId}) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser);

    return (
        <div className={css.card}>
            <Link className={css.linkShell} to={`/users/${userId}`}>
                <div className={css.imgShell}><img className={css.img} src={image || "./default_profile_photo.svg"} alt="no photo" /></div>
                <div className={css.namecShell}>
                    <span className={css.fullName}>{fullName}</span>
                    <span className={css.userName}>@{userName}</span>
                </div>
            </Link>

            {currentUserId === userId ? 
                <button className={css.followBut}>You</button> 
                : 
                <button className={css.followBut} onClick={()=>followCall(currentUserId,userId,user?.followings.includes(userId) ? "following" : "follow",dispatch,user)}>{user?.followings.includes(userId) ? "Following" : "Follow"}</button>
            }  
        </div>
    )
}