import React from "react";
import { Link } from "react-router-dom";


export default function CookiesPolicy() {
    return(
        <div id="cookiesCont">
            <Link to={"/"}>
                <button>Back</button>
            </Link>
            <div>
                <h1>Cookie Policy</h1>
                <h2>Please take the time to read this Policy.</h2>
            </div>
            <div>
                <p>This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used. This Cookies Policy has been created with the help of the Cookies Policy Generator.

                Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy.

                We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.</p>
            </div>
            <div>
                <h1>The use of the Cookies</h1>
                <h2>Type of Cookies We Use</h2>
                <p>Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.

                We use both session and persistent Cookies for the purposes set out below:

                Necessary / Essential Cookies

                Type: Session Cookies

                Administered by: Us

                Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.

                Functionality Cookies

                Type: Persistent Cookies

                Administered by: Us

                Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
            </div>
            <div>
                <h1>Your Choices Regarding Cookies</h1>
                <p>If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.

                If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.

                If You'd like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.

                For the Chrome web browser, please visit this page from Google: https://support.google.com/accounts/answer/32050

                For the Internet Explorer web browser, please visit this page from Microsoft: http://support.microsoft.com/kb/278835

                For the Firefox web browser, please visit this page from Mozilla: https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored

                For the Safari web browser, please visit this page from Apple: https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac

                For any other web browser, please visit your web browser's official web pages.</p>
            </div>
            <div>
                <h1>More Information about Cookies</h1>
                <p>You can learn more about cookies here: https://www.termsfeed.com/blog/cookies</p>
            </div>
            <div>
                <h1>Contact Us</h1>
                <p>If you have any questions about this Cookies Policy, You can contact us:</p>
                <p>protocolmoon@gmail.com</p>
            </div>
        </div>
    )
}