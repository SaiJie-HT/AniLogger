import supabase from '../databases/supabaseAniLog.js'

//require authentication middleware
const requireAuth = async (req, res, next) => {

    //get the authroization from headers of the request
    const authHeader = req.headers.authorization;

    //401 Unauthorized if no authentication header exists or if there does not exist a Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Missing or invalid tokens"}) //401 Unauthorized
    }

    //split the authorization header from at " " for an array with "Bearer" and the access token, then get the access token on index 1
    const accessToken = authHeader.split(" ")[1];

    //authenticate user with access token using supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    //Any error with authentication and missing user data returns messages
    if (authError) return res.status(401).json({ message: authError.message}); //401 Unauthorized
    if (!user) return res.status(401).json({ message: "Session Expired, Please Login Again"}); //401 Unauthorized

    //attaches the user info from to the request
    req.user = user;

    next();

};

export default requireAuth;
 