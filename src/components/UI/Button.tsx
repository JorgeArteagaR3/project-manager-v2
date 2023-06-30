import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export default function Button({
    className,
    children,
    ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={clsx(
                "bg-darktext text-background w-full p-2 rounded-md font-bold duration-300 hover:bg-navbarblack hover:text-[#aaaeca]",
                className
            )}
        >
            {children}
        </button>
    );
}
