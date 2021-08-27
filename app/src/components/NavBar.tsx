import { useState, useEffect } from 'react';

/*
The userDetails property can be either a username or email address, 
depending on the identity provided used to log in.
*/
interface UserInfo {
    userDetails: any;
    identityProvider: any;
}

const NavBar = () => {

    const providers = ['twitter', 'github', 'aad'];
    const [userInfo, setUserInfo] = useState<UserInfo | null>();
    const redirectToPrivateHome = `/private`;
    const redirectToPublicHome = `/`;

    useEffect(() => {
        (async () => {
            const userInfo = await getUserInfo();
            setUserInfo(userInfo);
        })();
    }, []);

    async function getUserInfo() {
        try {
            const response = await fetch('/.auth/me');
            const payload = await response.json();
            const { clientPrincipal } = payload;
            return clientPrincipal;
        } catch (error) {
            console.error('No profile could be found');
            return undefined;
        }
    };

    return (
        <>
            {!userInfo && providers.map((provider) => (
                <span><a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirectToPrivateHome}`}><h4>{provider}</h4></a> </span>
            ))}
            {userInfo && (
                <div>
                    <p>
                        <span>{userInfo && userInfo?.userDetails} ({userInfo && userInfo?.identityProvider})</span>
                        <span> <a href={`/.auth/logout?post_logout_redirect_uri=${redirectToPublicHome}`}>
                            Logout
                        </a>
                        </span>
                    </p>
                </div>
            )}

        </>
    )

}
export default NavBar;