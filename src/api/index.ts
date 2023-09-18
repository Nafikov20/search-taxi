import axios from 'axios';
import {appConfig} from "./appConfig";
import {mockCrews} from "../services/mockData";

// Функция для получения адреса по координатам с использованием API Яндекс Геокодера
export async function getAddressByCoordinates(apiKey: string | number, lat: number, lon: number) {
    const apiUrl = `${appConfig.BASE_URL}?apikey=${apiKey}&format=json&geocode=${lon},${lat}`;

    try {
        const response = await axios.get(apiUrl);
        const address = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
        return address;
    } catch (error) {
        console.error('Ошибка при получении адреса:', error);
        return null;
    }
}

// Функция для выполнения геокодирования по введенному адресу
export const geocodeAddress = async (address: string) => {
    try {
        const _API_KEY = appConfig.apiKey; // Замените на ваш API-ключ для геокодирования
        const city = 'Ижевск';
        const response = await fetch(`${appConfig.BASE_URL}?apikey=${_API_KEY}&format=json&geocode=${encodeURIComponent(city + ', ' + address)}`);
        const data = await response.json();

        const geoObjectCollection = data.response.GeoObjectCollection;

        if (geoObjectCollection && geoObjectCollection.featureMember.length > 0) {
            const coordinatesStr = geoObjectCollection.featureMember[0].GeoObject.Point.pos;
            const [lon, lat] = coordinatesStr.split(' ').map(parseFloat);
            return [lat, lon]; // Первый элемент - широта, второй - долгота
        } else {
            console.error('Адрес не найден');
            return null;
        }
    } catch (error) {
        console.error('Ошибка геокодирования:', error);
        return null;
    }
};

// Функция имитации поиска подходящих экипажей
export const searchCrews = async (address: string) => {
    // Здесь вы можете добавить логику поиска подходящих экипажей на основе введенного адреса
    // В данном случае, мы возвращаем моковые данные
    return {
        code: 0,
        descr: 'OK',
        data: {
            crews_info: mockCrews,
        },
    };
};

// Функция имитации создания заказа
export const createOrder = async (
    from: string,
    fromCoords: number[],
    crewId: number
) => {
    // В данном случае, мы возвращаем моковый ответ
    return {
        code: 0,
        descr: 'OK',
        data: {
            source_time: '20230917120000', // Формат времени ГГГГММДДччммсс
            addresses: [
                {
                    address: from,
                    lat: fromCoords[0],
                    lon: fromCoords[1],
                },
            ],
            crew_id: crewId,
        },
    };
};