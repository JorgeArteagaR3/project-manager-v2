import clsx from "clsx";
import { useId } from "react";
export default function Input({
    className,
    ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
    const id = useId();
    return (
        <input
            {...rest}
            id={id}
            className={clsx(
                "bg-transparent border  border-gray-600 placeholder:text-gray-600 rounded-md p-2",
                className
            )}
        />
    );
}
