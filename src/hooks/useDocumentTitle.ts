import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const useDocumentTitle = () => {
    const location = useLocation();
    const pathName = location.pathname.split("/")[1];

    useEffect(() => {
        const toPascalCase = (str: string) =>
            (str.match(/[a-zA-Z0-9]+/g) || [])
                .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
                .join("");

        document.title = toPascalCase(pathName);
    }, [pathName]);
};
