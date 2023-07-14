import { useUser } from "../hooks/useUser";
import PageHeader from "../components/PageHeader";
import ChangeEmailForm from "../components/ChangeEmailForm";
import ChangePasswordForm from "../components/ChangePasswordForm";

export default function Profile() {
    const { user } = useUser();

    return (
        <>
            <PageHeader showSearcher={false} />
            <main className="w-full pb-28 lg:pb-12 px-6 md:px-12">
                <h2 className="page-title">Profile</h2>
                <div>
                    <div className="border-b border-darkborder mb-4 py-4">
                        <h3 className="font-bold text-lg ">Your Username:</h3>
                        <p className="first-letter:uppercase">
                            {user.username}
                        </p>
                    </div>
                    <div className=" border-b border-darkborder mb-4 py-4">
                        <h3 className="font-bold text-lg">Email:</h3>
                        <p>{user.email}</p>
                    </div>

                    <div className="border-b border-darkborder mb-4 py-4">
                        <h3 className="font-bold text-lg mb-4">
                            Change Email:
                        </h3>
                        <ChangeEmailForm />
                    </div>
                    <div className="border-b border-darkborder mb-4 py-4">
                        <h3 className="font-bold text-lg mb-4">
                            Change Password:
                        </h3>
                        <ChangePasswordForm />
                    </div>
                </div>
            </main>
        </>
    );
}
