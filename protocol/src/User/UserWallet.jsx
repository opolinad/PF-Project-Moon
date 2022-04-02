import Donations from './Wallet/Donations'
import Shopped from './Wallet/Shopped'
import Sold from './Wallet/Sold'
import UserWalletCss from "./UserWallet.module.css";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faShoppingCart, faMoneyBill } from "@fortawesome/free-solid-svg-icons";


export default function UserWallet() {

    const [showControl, setShowControl] = useState("donation");

    let showType;

    switch (showControl) {
        case "donation": showType = <Donations />; break;
        case "shopped": showType = <Shopped />; break;
        case "sold": showType = <Sold />; break;
        default: break;
    }

    return (
        <div id={UserWalletCss.margin}>
            <div id={UserWalletCss.menu}>
                <div onClick={()=>setShowControl("donation")} className={UserWalletCss.menuOption}> <FontAwesomeIcon icon={ faSeedling }/> Donation</div>
                <div onClick={()=>setShowControl("shopped")} className={UserWalletCss.menuOption}> <FontAwesomeIcon icon={ faShoppingCart }/> Shopped</div>
                <div onClick={()=>setShowControl("sold")} className={UserWalletCss.menuOption}> <FontAwesomeIcon icon={ faMoneyBill }/> Sold</div>
            </div>

            {showType}
        </div>
    );
}