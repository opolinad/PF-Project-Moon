import profilePhoto from "../assets/default_profile_photo.svg"
import { followAndUnFollow } from "../ReduxToolkit/apiCalls/followUser"
import css from "./CardUser.module.css"

export default function CardUser({image, fullName, userName, currentUserId, userId}) {
    return (
        <div id={css.card}>
            <img src={image || "./default_profile_photo.svg"} alt="no photo" height="75px"/>
            <div>
                <span id={css.fullName}>{fullName}</span>
                <span id={css.userName}>@{userName}</span>
            </div>
            <button onClick={() => followAndUnFollow(currentUserId, { userId: userId })}>FOLLOW</button>
        </div>
    )
}