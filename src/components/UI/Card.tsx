import clsx from "clsx";

export default function Card({
    children,
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx(
                "bg-background p-4 rounded-lg bg-secondary",
                className
            )}
        >
            {children}
        </div>
    );
}
