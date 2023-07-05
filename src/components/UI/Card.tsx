import clsx from "clsx";

export default function Card({
    children,
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx(
                "dark:bg-secondary p-4 rounded-lg bg-lightcard",
                className
            )}
        >
            {children}
        </div>
    );
}
