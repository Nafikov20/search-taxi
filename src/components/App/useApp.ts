import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {createOrder} from "../../api";
import {addOrder, setAddress, setCrewId} from "../../redux/taxiSlice";

export const UseApp = () => {

    const {address, markerCoordinates, selectedCrew} = useSelector((state: RootState) => state.taxi);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!markerCoordinates) {
            alert('Выберите место на карте.');
            return;
        }

        if (selectedCrew === null) {
            alert('Выберите экипаж.');
            return;
        }

        setIsLoading(true);

        try {
            // Отправка запроса на создание заказа
            const orderResponse = await createOrder(address, markerCoordinates, selectedCrew);

            if (orderResponse.code === 0) {
                // Добавление заказа в состояние приложения

                dispatch(
                    addOrder({
                        source_time: orderResponse.data.source_time,
                        addresses: [{ address: address, lat: markerCoordinates[0], lon: markerCoordinates[1] }],
                        crew_id: selectedCrew,
                    })
                );

                // Очистка формы
                dispatch(setAddress(''));
                dispatch(setCrewId(null));

                alert('Заказ успешно создан!');
            } else {
                alert('Произошла ошибка при создании заказа.');
            }
        } catch (error) {
            alert('Произошла ошибка при создании заказа.');
        } finally {
            setIsLoading(false);
        }
    };


    return {address, handleSubmit}
};
