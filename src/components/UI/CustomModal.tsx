import Modal from "react-modal";
import { useEffect } from "react";

export default function CustomModal({
    children,
    isModalOpen,
    closeModal,
}: {
    children: React.ReactNode;
    isModalOpen: boolean;
    closeModal: () => void;
}) {
    Modal.setAppElement("#modal");

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isModalOpen]);

    return (
        <Modal
            shouldCloseOnOverlayClick
            isOpen={isModalOpen}
            preventScroll={true}
            onRequestClose={closeModal}
            className="z-50 w-2/3 md:w-[400px] bg-background rounded-xl p-8 relative"
            overlayClassName={
                "bg-[rgba(0,0,0,.7)] top-0 fixed z-50 flex w-screen h-screen items-center justify-center overflow-hidden"
            }
        >
            {children}
        </Modal>
    );
}
