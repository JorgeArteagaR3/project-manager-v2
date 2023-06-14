import clsx from "clsx";

export default function Input({
    className,
    ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...rest}
            className={clsx(
                "bg-transparent border border border-gray-600 placeholder:text-gray-600 rounded-md p-2",
                className
            )}
        />
    );
}
