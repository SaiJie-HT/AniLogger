import supabase from '../databases/supabaseAniLog.js'

//require authentication middleware
const requireAuth = async (req, res, next) => {
    const { accessToken } = req.body;

    //authenticate user with access token using supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    //Any error with authentication and missing user data returns messages
    if (authError) return res.status(401).json({ message: authError.message});
    if (!user) return res.status(401).json({ message: "Session Expired, Please Login Again"});

    //attaches the user info from to the request
    req.user = user;

    next();

};

export default requireAuth;
