import clsx from "clsx";

function SpinnerLoader({ className }: { className?: string }) {
    return (
        <div
            className={clsx(
                "dark:bg-[rgba(18,19,21,0.75)] bg-[rgba(128,147,241,0.75)] w-full h-full absolute left-0 top-0 z-50 flex justify-center items-center",
                className
            )}
        >
            <span className="loader dark:border-white border-stone-950"></span>
        </div>
    );
}

export default SpinnerLoader;
