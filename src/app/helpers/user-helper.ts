export const UserHelper = {

    getUserId() {
        return Number.parseInt(localStorage.getItem("userId") as string);
    },

    getUserType() {
        return localStorage.getItem("userType");
    },

    getUserToken() {
        return localStorage.getItem("token");
    },

    setUserId(id : any | null) {
        if(id == null) localStorage.removeItem("userId");
        else localStorage.setItem("userId", id.toString());
    },

    setUserType(type : string | null) {
        if(type == null) localStorage.removeItem("userType");
        else localStorage.setItem("userType", type);
    },

    setUserToken(token : string | null) {
        if(token == null) localStorage.removeItem("token");
        else localStorage.setItem("token", token);
    }
}