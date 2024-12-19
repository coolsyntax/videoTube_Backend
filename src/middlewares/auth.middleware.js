import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const veryfyJWT = asyncHandler(async (req, _, next) => {
    try {
        const incomingAccessToken =
            req.cookie.accessToken ||
            req.body.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!incomingAccessToken) {
            throw new ApiError(400, "Unauthorized request");
        }

        const decodedToken = jwt.verify(
            incomingAccessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        if (!decodedToken) {
            throw new ApiError(400, "Invalid access token");
        }

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(500, "Could not find user");
        }

        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(400, error?.message || "Bad request");
    }
});
