import clsx from "clsx";

export default function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section className={clsx("w-full mx-auto rounded-xl", className)}>
            {children}
        </section>
    );
}
