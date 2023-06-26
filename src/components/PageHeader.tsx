import jwtDecode from "jwt-decode";
import { User } from "../types/types";
import Cookies from "js-cookie";
export default function PageHeader({ title }: { title: string }) {
    const token = Cookies.get("user");
    const decodedUser: User = jwtDecode(token!);

    return (
        <header className="py-6 flex justify-between mx-auto w-full md:w-11/12">
            <h1 className="font-bold">{title}</h1>
            <div>
                <p className="flex gap-1">
                    Hi,
                    <span className="block first-letter:uppercase">
                        {decodedUser.username}
                    </span>
                </p>
            </div>
        </header>
    );
}
