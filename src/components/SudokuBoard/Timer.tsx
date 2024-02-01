import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../models/themes';
import useTheme from '../../hooks/useTheme';
import THEMES from '../../themes';

const Timer = () => {
  const colorTheme = useTheme();
  const styles = styleSheet(colorTheme);
  const intervalId = useRef<ReturnType<typeof setInterval>>();
  const duration = useRef(0);
  const [formattedTime, setFormattedTime] = useState('00:00');

  useEffect(() => {
    intervalId.current = setInterval(() => {
      duration.current += 1;
      const time = new Date(duration.current * 1000).toISOString().substring(14, 19);
      setFormattedTime(time);
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <View>
      <Text style={styles.text}>
        {formattedTime}
      </Text>
    </View>
  );
};

const styleSheet = (colorTheme: Theme) => StyleSheet.create({
  text: {
    color: THEMES.color[colorTheme],
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2
  }
});

export default Timer;