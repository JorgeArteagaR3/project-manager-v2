import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUser } from "../services/services";
import Cookies from "js-cookie";
export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);

    const getUserData = async () => {
        try {
            const { data } = await getUser();
            setUser(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const token = Cookies.get("user");
        if (token && !user.id) {
            getUserData();
        }
    }, [user]);
    return { user };
};
