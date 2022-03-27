import axios from "axios";
import defaultPhoto from '../assets/default_profile_photo.svg'
import ChatOnlineCss from "./ChatOnline.module.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  
  const handleClick = async (user) => {
    try {
      const res = await axios.get(`http://localhost:3001/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={ChatOnlineCss.ChatOnline}>
      {onlineUsers.map((userOnline) => (
        <div className={ChatOnlineCss.userOnline} onClick={() => handleClick(userOnline)}>
          <div className={ChatOnlineCss.container}>
            <img
              className={ChatOnlineCss.image}
              src={ userOnline?.profilePhoto? userOnline.profilePhoto : defaultPhoto}
              alt="Not found"
            />
          </div>
          <span className={ChatOnlineCss.name}>{userOnline?.username}</span>
        </div>
      ))}
    </div>
  );
}
