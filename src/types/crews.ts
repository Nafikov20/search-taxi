import React from "react";

export interface ICrewProps {
    mark?: string;
    model?: string;
    color?: string;
    distance?: number;
    className?: string;
    tabIndex?: number;
    children?: React.ReactNode;
    onClick?: () => void;
}