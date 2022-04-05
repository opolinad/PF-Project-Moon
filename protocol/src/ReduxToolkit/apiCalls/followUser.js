import axios from 'axios'
import { updateFollow, updateUnfollow } from "../reducers/loginSlice";
export const followAndUnFollow = async (id, userId) => {
    try {
        await axios.put(`/api/user/${id}/follow`, userId)
    } catch (error) {
        console.log(error);
    }

}
export const followCall = async (idUser, userId,command,dispatch,currentUser) => {
    try
    {
        const res = await axios.put(`/api/user/${idUser}/follow`,{userId});
        console.log(res);
        let raw; 
        command === "follow" ?  raw = {...currentUser, followings: currentUser.followings?.length ? [...currentUser.followings,userId] : [userId]} 
                                : 
                                raw = {...currentUser, followings: currentUser.followings.length ? [...currentUser.followings.filter(e=> e!=userId)] : []} ;
        console.log(raw)
        command ==="follow" ? dispatch(updateFollow(raw)) : dispatch(updateUnfollow(raw))
    }
    catch(e){console.log(e)}
}