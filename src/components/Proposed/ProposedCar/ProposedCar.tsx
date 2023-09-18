import React from 'react';

import './ProposedCar.css';
import classNames from "classnames";
import {CustomIcon} from "../../CustomIcon/CustomIcon";
import {IDriver} from "../../../types/driver";

export const ProposedCar: React.FC<IDriver> = ({
    car_mark,
    car_model,
    car_color,
    car_number,
}) => {
    return (
        <div className={classNames('ProposedCar')}>
            <CustomIcon type='Auto' />
            <div className='ProposedCar__details'>

                <div className='ProposedCar__car'>
                    {`${car_mark} ${car_model}`}
                </div>

                <span className='ProposedCar__car-color'>
                    {car_color}
                </span>

                {car_number && (
                    <div className='ProposedCar__number'>
                        {car_number}
                    </div>
                )}
            </div>
    </div>
    );
};
