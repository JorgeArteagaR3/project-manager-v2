import clsx from "clsx";

function SpinnerLoader({ className }: { className?: string }) {
    return (
        <div
            className={clsx(
                "bg-[#111219b8] w-full h-full absolute left-0 top-0 z-50 flex justify-center items-center",
                className
            )}
        >
            <span className="loader"></span>
        </div>
    );
}

export default SpinnerLoader;