import React, {ReactNode} from 'react';
import {Header} from "../Header/Header";
import './Layout.css';


export interface ILayout {
    children?: ReactNode;
}

export const Layout: React.FC<ILayout> = ({children}) => {
    return (
        <div>
            <Header />
            <div  className='Layout'>
                {children}
            </div>
        </div>
    );
};
