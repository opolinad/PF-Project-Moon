import Donations from './Wallet/Donations'
import Shopped from './Wallet/Shopped'
import Sold from './Wallet/Sold'
import UserWalletCss from "./UserWallet.module.css";

export default function UserWallet() {
    return (
        <div id={UserWalletCss.margin}>
                <Donations />
                <Shopped />
                <Sold />
        </div>
    );
}