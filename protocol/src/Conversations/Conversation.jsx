import axios from "axios";
import { useEffect, useState } from "react";
import defaultPhoto from '../assets/default_profile_photo.svg'
import ConversationCss from"./Conversation.module.css";

export default function Conversation({ conversation, user }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((member) => member !== user?._id);

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:3001/api/users/" + friendId);
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className={ConversationCss.conversation}>
      <img
        className={ConversationCss.image}
        src={ currentUser?.profilePhoto? currentUser.profilePhoto : defaultPhoto}
        alt="Not found"
      />
      <span className={ConversationCss.name}>{currentUser?.username}</span>
    </div>
  );
}
