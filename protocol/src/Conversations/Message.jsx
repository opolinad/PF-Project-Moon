import { format } from "timeago.js";
import MessageCss from "./Message.module.css";
import defaultPhoto from '../assets/default_profile_photo.svg'

export default function Message({ message, own, image }) {
  return (
    <div className={own ? MessageCss.messageOwn : MessageCss.message}>
      <div className={MessageCss.messageTop}>
        {/* <img
          className="messageImg"
          src={image}
          alt={defaultPhoto}
        /> */}
        <p className={MessageCss.messageText}>{message.text}</p>
      </div>
      <div className={MessageCss.TimeAgo}>{format(message.createdAt)}</div>
    </div>
  );
}
