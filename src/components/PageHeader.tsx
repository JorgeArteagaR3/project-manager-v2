export default function PageHeader({ title }: { title: string }) {
    return (
        <header className="py-6 flex justify-between mx-auto w-full md:w-11/12">
            <h1 className="font-bold">{title}</h1>
            <div>
                <p className="flex gap-1">
                    Hi,
                    <span className="block first-letter:uppercase">"USER"</span>
                </p>
            </div>
        </header>
    );
}
