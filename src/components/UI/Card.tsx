import clsx from "clsx";

export default function Card({
    children,
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx(
                "bg-gradient-to-br from-background via-background via-background to-[#50483257] p-4 rounded-lg",
                className
            )}
        >
            {children}
        </div>
    );
}
