import React from "react";
import {UseProposed} from "./useProposed";

import './Proposed.css';
import {ProposedCar} from "./ProposedCar/ProposedCar";
import {IDriver, IDriverCrew} from "../../types/driver";
import {ICrewProps} from "../../types/crews";


export const Proposed: React.FC= () => {
  const {
      address,
      handleAddressChange,
      isValid,
      selectedCrew
  } = UseProposed()

    // @ts-ignore
    return (
        <div className='Proposed'>
            <div className='Proposed__field'>
                <label className='Proposed__label' htmlFor='Proposed-input'>
                    Откуда
                </label>
                <input
                    id="address"
                    name="address"
                    value={address}
                    type='search'
                    className='Proposed__input'
                    placeholder="Улица, номер дома"
                    onChange={handleAddressChange}
                />
                {isValid ? null : <div className='error-message'>Адрес не найден</div>}
                <h4>
                    Подходящий экипаж:
                </h4>

                {selectedCrew ? (
                    <ProposedCar
                        car_mark={selectedCrew.car_mark}
                        car_color={selectedCrew.car_color}
                        car_model={selectedCrew.car_model}
                        car_number={selectedCrew.car_number}
                    />
                ) : (
                    <div>Выберите подходящий экипаж</div>
                )}

            </div>
        </div>
    );
};
