import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IDriver} from "../../types/driver";
import {calculateDistance} from "../../shared/utils/calculateDistance";
import {setCrewId, setCrews} from "../../redux/taxiSlice";

export const UseCrews = () => {
    const dispatch = useDispatch();
    const { availableCrews, selectedCrew, markerCoordinates } = useSelector((state: RootState) => state.taxi);

    // Переменные для координат пользователя
    const myLat = markerCoordinates ? markerCoordinates[0] : 0;
    const myLon = markerCoordinates ? markerCoordinates[1] : 0;

    // Функция для вычисления расстояний и добавления их к объектам экипажей
    function calculateDistances(crews: IDriver[], myLat: number, myLon: number) {
        return crews.map((crew) => ({
            ...crew,
            distance: calculateDistance(myLat, myLon, crew.lat, crew.lon),
        }));
    }

    // Функция для обработки клика по экипажу
    const handleCrewClick = (crewId: number | undefined) => {
        // Устанавливаем выбранный экипаж в стейт менеджере
        // @ts-ignore
        dispatch(setCrewId(crewId));
    };

    // Эффект, который будет вызываться при изменении координат маркера или доступных экипажей
    useEffect(() => {
        if (myLat !== 0 && myLon !== 0) {
            // Если есть координаты пользователя и доступные экипажи, вычисляем расстояния
            const crewsWithDistance = calculateDistances(availableCrews, myLat, myLon);
            // Обновляем доступные экипажи с учетом расстояний в Redux-состоянии
            if (crewsWithDistance) {
                // @ts-ignore
                dispatch(setCrews(crewsWithDistance));
            }
        }
    }, [dispatch, myLat, myLon]);

    return {availableCrews, handleCrewClick, selectedCrew}
};
