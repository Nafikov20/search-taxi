import React, {useState} from 'react';
import {CustomButton} from "../CustomButton/CustomButton";
import {Layout} from "../Layout/Layout";
import {YandexMap} from "../YandexMap/YandexMap";
import {Proposed} from "../Proposed/Proposed";
import {Crews} from "../Crews/Crews";
import {UseApp} from "./useApp";
import './App.css';


export const App: React.FC = () => {
const {
    handleSubmit,
    address
} = UseApp();
    return (
        <Layout>

            <Proposed />

            <div className='App__wrapper'>
                <div className='App__wrapper-map'>
                    <div className='App-map'>
                        <YandexMap />
                    </div>
                    <div className='App-car'>
                        <Crews />
                    </div>
                </div>

                <CustomButton
                    className='App__button'
                    onClick={handleSubmit}
                    isDisabled={!address}
                >
                    Заказать
                </CustomButton>
            </div>

        </Layout>
    );
};
