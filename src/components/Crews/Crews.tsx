import React from 'react';

import { CustomIcon } from '../CustomIcon/CustomIcon';
import { Crew } from './Crew/Crew';
import {UseCrews} from "./useCrews";
import { IDriver } from '../../types/driver';
import './Crews.css';


export const Crews: React.FC = () => {
   const {availableCrews, handleCrewClick, selectedCrew} = UseCrews()


    return (
        <div className="Crews">
            <ul className="Crews__list">
                {availableCrews.map((crew: IDriver) => (
                    <li key={crew.crew_id} className="Crews__item">
                        <Crew
                            className={selectedCrew === crew.crew_id ? '_selected-crew' : ''}
                            mark={crew.car_mark}
                            model={crew.car_model}
                            color={crew.car_color}
                            distance={crew.distance} // Расстояние из Redux-состояния
                            onClick={() => handleCrewClick(crew.crew_id)} // Обработчик клика по экипажу
                        >
                            <CustomIcon type="ChevronRight" />
                        </Crew>
                    </li>
                ))}
            </ul>
        </div>
    );
};
