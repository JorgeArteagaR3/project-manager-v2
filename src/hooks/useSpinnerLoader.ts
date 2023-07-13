import { useState } from "react";
import SpinnerLoader from "../components/SpinnerLoader";

export const useSpinnerLoader = () => {
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

    return { isSpinnerLoading, setIsSpinnerLoading, SpinnerLoader };
};
