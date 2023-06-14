import clsx from "clsx";

export default function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={clsx(
                "bg-bigcontainer w-full md:w-11/12 mx-auto p-4 rounded-xl",
                className
            )}
        >
            {children}
        </section>
    );
}
