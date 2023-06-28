import jwtDecode from "jwt-decode";
import { User } from "../types/types";
import Cookies from "js-cookie";
import { AiOutlineDown } from "react-icons/ai";
import Input from "./UI/Input";
import { BsSearch } from "react-icons/bs";
export default function PageHeader() {
    const token = Cookies.get("user");
    const decodedUser: User = jwtDecode(token!);

    return (
        <header className="py-6 flex w-full px-6 md:px-10 bg-secondary mb-4 flex-col gap-4 items-end md:flex-row-reverse md:items-center md:justify-between">
            <div className="flex items-center gap-2">
                <p className="flex gap-1">
                    Welcome,
                    <span className="block first-letter:uppercase">
                        {decodedUser.username}
                    </span>
                </p>
                <AiOutlineDown />
            </div>
            <div className="w-full relative">
                <Input
                    type="text"
                    placeholder="Search"
                    className="border-none pl-11 w-full md:max-w-[400px] bg-[#272a2f]"
                />
                <BsSearch className="absolute top-0 bottom-0 my-auto left-3" />
            </div>
        </header>
    );
}
