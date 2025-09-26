import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "../../config/config.js";

const cookieExtractor = (req) => {
    if (req) {
        return req.cookies.accessToken;
    }
};

const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET,
};

// req.user = jwtPayload
const jwtVerify = async (jwtPayload, done) => {
    if (!jwtPayload) return done(null, false, { message: "User not found" });
    return done(null, jwtPayload);
};

passport.use("jwtCookies", new Strategy(strategyConfig, jwtVerify));
