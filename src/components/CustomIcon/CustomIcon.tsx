import React from 'react';
import classNames from 'classnames';
import {CustomIconType, CustomIconTypes} from "./CustomIconType";
import './Icon.css'

export interface IIconProps {
    className?: string;
    type: CustomIconType;
}

const getIcon = (type: CustomIconType): JSX.Element =>
    CustomIconTypes.get(type) as JSX.Element

export const CustomIcon:  React.FC<IIconProps> = ({
    className,
    type,
    ...rest
}) => {
    return (
        <div className={classNames('Icon', className)} {...rest}>{getIcon(type)}</div>
    );
};
