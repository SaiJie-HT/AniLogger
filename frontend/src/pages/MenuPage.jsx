//userData is the user object from auth
function MenuPage({userData, setUserStatus, children}) {

    return (
        <>
            <div>
                <h1> Welcome, {userData.email}! </h1>

                <div>
                    {children}
                </div>

                <p> To logout: </p>
                <button onClick={() => setUserStatus(null)}> LOG OUT </button>
            </div>
        </>
    )
}

export default MenuPage;