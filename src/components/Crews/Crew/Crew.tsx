import React from 'react';
import {ICrewProps} from "../../../types/crews";
import {CustomIcon} from "../../CustomIcon/CustomIcon";
import './Crew.css'

export const Crew: React.FC<ICrewProps> = ({
    mark,
    model,
    color,
    distance,
    className,
    onClick,
    children
}) => {
    return (
        <div
            className={`Car ${className && className}`}
            onClick={onClick}
        >
            <div className="Car__info">
                <CustomIcon type='Auto' />
                <div>
                    <h4 className="Car__title">
                        {mark} {model}
                    </h4>
                    <span>{color}</span>
                </div>
            </div>
            <div className='Car__distance-wrapper'>
                {children}
                <span className="Car__distance">
                    {distance} м
                </span>
            </div>

        </div>
    );
};
