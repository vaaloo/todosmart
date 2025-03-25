import { createContext, SetStateAction, useContext, useState} from "react";
import {ActivePageContextType} from "../types/ActivePageContextType";

const ActivePageContext = createContext<ActivePageContextType | undefined>(undefined);

export const useActivePage = () => {
    const context = useContext(ActivePageContext);
    if (!context) {
        throw new Error("useActivePage doit être utilisé dans un ActivePageProvider");
    }
    return context;
};

// @ts-ignore
export const ActivePageProvider = ({children}) => {
    const [activePage, setActivePage] = useState("Tasks");

    const changePage = (page: SetStateAction<string>) => {
        setActivePage(page);
    };

    return (
        // @ts-ignore
        <ActivePageContext.Provider value={{ activePage, setActivePage: changePage }}>
            {children}
        </ActivePageContext.Provider>
    );
};