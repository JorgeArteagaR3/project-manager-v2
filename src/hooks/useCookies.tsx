import Cookies from "js-cookie";

export const useCookies = () => {
    const token = Cookies.get("user");
    if (token) {
        return token;
    } else {
        return false;
    }
};
