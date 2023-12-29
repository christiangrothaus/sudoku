import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const useTheme = () => {
  const themeColor = useContext(ThemeContext);

  return themeColor;
};

export default useTheme;