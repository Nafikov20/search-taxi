import React, {DOMAttributes} from 'react';
import classNames from "classnames";
import './CustomButton.css';


export type CustomButtonType = 'button' | 'submit' | 'reset';

export interface ICustomButtonProps extends DOMAttributes<HTMLButtonElement>{
    className?: string;
    isDisabled?: boolean;
    typeButton?: CustomButtonType;
    onClick?: (event: React.MouseEvent) => void;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  className,
  children,
  isDisabled,
  typeButton,
  onClick,
  ...rest
}) => {
    return (
        <button className={classNames('Button', className, {
            'Button__disabled': isDisabled,
        })}
                disabled={isDisabled}
                type={typeButton}
                onClick={onClick}
        >
            <span>{children}</span>
        </button>
    );
};
