import {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {geocodeAddress} from "../../api";
import {setAddress, setMarkerCoordinates} from "../../redux/taxiSlice";

export const UseProposed = () => {
    // Локальное состояние для ошибок валидации
    const [errors, setErrors] = useState<{ address: string | null }>({ address: null });
    const [isValid, setIsValid] = useState<boolean>(true); // Состояние валидности поля адреса

    const dispatch = useDispatch();
    const {
        address,
        availableCrews,
        selectedCrew
    } = useSelector((state: RootState) => state.taxi);


    // Обработчик изменения адреса
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(setAddress(''))
        const newAddress = e.target.value;
        geocodeAddress(newAddress)
            .then((coordinates) => {
                if (coordinates) {
                    // @ts-ignore
                    dispatch(setMarkerCoordinates(coordinates)); // координаты маркера в стейте
                    setIsValid(true); // Сбросить валидность поля
                } else {
                    setIsValid(false); // Установka поле как не валидное
                    console.log('Адрес не найден или произошла ошибка');
                }
            });
        dispatch(setAddress(newAddress));
        setErrors({ ...errors, address: !newAddress ? 'Поле обязательно для заполнения' : '' });
    };

    return {handleAddressChange, address, availableCrews, isValid, selectedCrew }
};
