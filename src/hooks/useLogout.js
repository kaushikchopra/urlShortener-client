import axios from "../api/axios";
import useAuth from "./useAuth";
import { UserAPI } from "../api/global";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth(null);

        try {
            await axios.get(`${UserAPI}/logout`, {
                withCredentials: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    return logout;
}

export default useLogout;