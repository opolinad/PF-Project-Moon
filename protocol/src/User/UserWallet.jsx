import Donations from './Wallet/Donations'
import Shoped from './Wallet/Shoped'
import Sold from './Wallet/Sold'
import UserWalletCss from "./UserWallet.module.css";

export default function UserWallet() {
    return (
        <div id={UserWalletCss.margin}>
                <Donations />
                <Shoped />
                <Sold />
        </div>
    );
}