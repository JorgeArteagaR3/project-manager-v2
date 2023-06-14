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
                "bg-[#aaaeca] text-background w-full p-2 rounded-md font-bold",
                className
            )}
        >
            {children}
        </button>
    );
}
