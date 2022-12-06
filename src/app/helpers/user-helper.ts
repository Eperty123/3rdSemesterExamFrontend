import { HasherHelper } from "./hasher-helper";

export const UserHelper = {

    getUserId() {
        return Number.parseInt(HasherHelper.aesDecode(localStorage.getItem("userId")));
    },

    getUserType() {
        return HasherHelper.aesDecode(localStorage.getItem("userType"));
    },

    getUserToken() {
        return localStorage.getItem("token");
    },

    setUserId(id : any | null) {
        if(id == null) localStorage.removeItem("userId");
        else localStorage.setItem("userId", HasherHelper.aesEncode(id.toString()));
    },

    setUserType(type : string | null) {
        if(type == null) localStorage.removeItem("userType");
        else localStorage.setItem("userType", HasherHelper.aesEncode(type));
    },

    setUserToken(token : string | null) {
        if(token == null) localStorage.removeItem("token");
        else localStorage.setItem("token", token);
    }
}