import {useState} from "react";
import {getCoordinates} from "../../shared/coordinates/coordinates";
import {useDispatch, useSelector} from "react-redux";
import {setAddress, setCrews, setMarkerCoordinates} from "../../redux/taxiSlice";
import {getAddressByCoordinates, searchCrews} from "../../api";
import {RootState} from "../../redux/store";
import {appConfig} from '../../api/appConfig'


export const UseYandexMap = () => {

    const _API_KEY = appConfig.apiKey;
    const initialCoordinates = getCoordinates();
    const dispatch = useDispatch();
    const {
        markerCoordinates,
        availableCrews,
        selectedCrew,
        address
    } = useSelector((state: RootState) => state.taxi);

    const handleMapClick = async (e: { get: (name: string) => [number, number] }) => {
        // Обработчик клика на карте
        const coordinates = e.get('coords');
        dispatch(setMarkerCoordinates(coordinates));

        const newAddress =  getAddressByCoordinates(_API_KEY, coordinates[0], coordinates[1]);
        dispatch(setAddress(await newAddress));

        try {
            // Отправка запроса на поиск подходящих экипажей
            const crewResponse =  await searchCrews(`${coordinates[0]}, ${coordinates[1]}`);

            if (crewResponse.code === 0) {
                // @ts-ignore
                dispatch(setCrews(crewResponse.data.crews_info));
            } else {
                alert('Подходящие экипажи не найдены.');
            }
        } catch (error) {
            alert('Произошла ошибка при поиске экипажей.');
        }

    };


    return {
        initialCoordinates,
        _API_KEY,
        handleMapClick,
        markerCoordinates,
        availableCrews,
        selectedCrew,
        address
    }
};

