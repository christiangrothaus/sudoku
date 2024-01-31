import { createContext } from 'react';
import { Theme } from '../models/themes';

const ThemeContext = createContext<Theme>(Theme.Dark);

export default ThemeContext;