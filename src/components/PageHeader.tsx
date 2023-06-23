import { useAuth } from "../hooks/useAuth";

export default function PageHeader({ title }: { title: string }) {
    const { user } = useAuth();
    return (
        <header className="py-6 flex justify-between mx-auto w-full md:w-11/12">
            <h1 className="font-bold">{title}</h1>
            <div>
                <p className="flex gap-1">
                    Hi,
                    <span className="block first-letter:uppercase">
                        {user?.username}
                    </span>
                </p>
            </div>
        </header>
    );
}
