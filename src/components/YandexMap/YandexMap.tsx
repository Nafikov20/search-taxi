import React from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import {IDriver} from "../../types/driver";
import {UseYandexMap} from "./useYandexMap";
import ymaps from "yandex-maps";

interface IYandexMapProps {
    drivers?: IDriver[];
}


export const YandexMap: React.FC<IYandexMapProps> = ({drivers}) => {
    const {
        initialCoordinates,
        _API_KEY,
        handleMapClick,
        markerCoordinates,
        availableCrews,
        selectedCrew,
        address
    } = UseYandexMap();


    return (
        <YMaps query={{
            apikey: _API_KEY,
            ns: 'ymaps'
        }}>
            <Map
                state={{center: initialCoordinates.coordinates, zoom: 14}}
                width='100%'
                height='100%'
                onClick={handleMapClick}
            >
                {/* Отображение маркера при клике на карту */}
                {markerCoordinates && (
                    <Placemark geometry={markerCoordinates} options={{ preset: 'islands#yellowDotIcon' }} />
                )}

                {address && (
                    availableCrews.map((crew, idx) => (
                            <Placemark
                                key={idx}
                                geometry={[crew.lat, crew.lon]}
                                options={{
                                    iconColor: selectedCrew === crew.crewId ? 'blue' : 'green',
                                }}
                                properties={{
                                    hintContent: `${crew.driverName} - ${crew.carMark} ${crew.carModel}`,
                                    balloonContent: `${crew.driverName} - ${crew.carMark} ${crew.carModel}`,
                                }}
                            />
                        ))
                )}


                <GeolocationControl options={{ float: 'right' }} />

            </Map>
        </YMaps>
    );
};
