import AniLoggerHeaderElement from "./AniLoggerHeaderElement";

//userData is the user object from auth
function MenuPage({userData, setUserStatus, children}) {

    return (
        <>
            <div>
                <AniLoggerHeaderElement />
                <h2> Welcome, {userData.email}! </h2>
                <button onClick={() => setUserStatus(null)}> LOG OUT </button>
                <hr />
                <div>
                    {children}
                </div>

            </div>
        </>
    )
}

export default MenuPage;