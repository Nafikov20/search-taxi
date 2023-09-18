import React from 'react';
import { newGuid } from '../../shared/utils/guid';
import {ReactComponent as Auto} from '../../shared/assets/icons/files/Auto.svg';
import {ReactComponent as ChevronRight} from '../../shared/assets/icons/files/ChevronRight.svg';
import './Icon.css'

export type CustomIconType = |'Auto' | 'ChevronRight';

export const CustomIconTypes = new Map([
    ['Auto', <Auto key={newGuid()} />],
    ['ChevronRight', <ChevronRight key={newGuid()} />],
])