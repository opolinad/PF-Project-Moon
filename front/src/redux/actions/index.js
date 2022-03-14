import * as homeActions from "./Home.js";
import * as landingPageActions from "./LandingPage.js";
import * as messagesActions from "./Messages.js";
import * as registerActions from "./Register.js";
import * as userActions from "./User.js";
import * as navbarActions from "./Navbar.js";
import * as consts from "../consts.js";
 
// import * as Actions from "./.js";

const Actions=
{
    ...homeActions,
    ...landingPageActions,
    ...messagesActions,
    ...homeActions,
    ...registerActions,
    ...userActions,
    ...navbarActions,
};

export default Actions;