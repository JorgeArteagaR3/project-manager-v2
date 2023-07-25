import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export default function Button({
    className,
    children,
    type,
    ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={clsx(
                "duration-200 w-full p-2 rounded-md font-bold hover:bg-darktext dark:hover:text-black",
                className,
                type === "submit" &&
                    "bg-green-300 hover:no-underline hover:bg-green-200 dark:text-black"
            )}
        >
            {children}
        </button>
    );
}
