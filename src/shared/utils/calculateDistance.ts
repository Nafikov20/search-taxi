
import geodist from 'geodist';

export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number | undefined,
    lon2: number | undefined
): number {
    const distance = geodist(
        { lat: lat1, lon: lon1 },
        { lat: lat2, lon: lon2 },
        { exact: true, unit: 'meters' }
    );

    return Math.round(distance / 10) * 10; // Округляем расстояние до десятых метров
}
