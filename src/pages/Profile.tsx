import Cookies from "js-cookie";
import { User } from "../types/types";
import jwtDecode from "jwt-decode";

export default function Profile() {
    const token = Cookies.get("user");
    const decodedUser: User = jwtDecode(token!);
    return (
        <main className="w-full pb-28 lg:pb-12 px-6 md:px-12">
            <h2 className="page-title">Profile</h2>
            <div>
                <div className="border-b mb-4">
                    <h3>Your username:</h3>
                    <p>{decodedUser.username}</p>
                </div>
            </div>
        </main>
    );
}
