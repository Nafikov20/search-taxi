declare module 'geodist' {
    interface Point {
        lat: number;
        lon: number;
    }

    interface Options {
        exact?: boolean;
        unit?: 'meters' | 'kilometers' | 'miles';
    }

    function geodist(
        from: Point,
        to: { lon: number | undefined; lat: number | undefined },
        options?: Options
    ): number;

    export = geodist;
}