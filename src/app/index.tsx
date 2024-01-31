import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import THEMES from '../themes';
import useTheme from '../hooks/useTheme';
import MenuLink from '../components/MenuLink';
import { clearStoredBoard, getBoard } from '../utilities/storage';
import { SudokuBoard } from '../models/sudoku';
import ConfirmationModal from '../components/ConfirmationModal';
import { router } from 'expo-router';
import Row from '../components/Row';
import Button from '../components/Button';

const HomeScreen = () => {
  const colorTheme = useTheme();
  const [existingBoard, setExistingBoard] = useState<SudokuBoard>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const styles = styleSheet(colorTheme);

  useEffect(() => {
    const setBoard = async () => {
      const board = await getBoard();

      if (board?.[0]?.[0]) {
        setExistingBoard(board as SudokuBoard);
      }
    };

    setBoard();
  });

  const handleStartPress = useCallback(() => {
    if (existingBoard) {
      setIsModalVisible(true);
    } else {
      router.navigate('/select-difficulty');
    }
  }, [existingBoard]);

  const handleConfirmPress = useCallback(() => {
    clearStoredBoard();
    router.navigate('select-difficulty');
  }, []);

  const handleCancelPress = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <View style={styles.container}>
        {existingBoard && <MenuLink href={{ pathname: '/board', params: { useExistingBoard: true } }} text="Resume" />}
        <MenuLink onPress={handleStartPress} href="" text="Start" />
        <MenuLink href="/board" text="Daily Puzzle" />
      </View>
      <ConfirmationModal visible={isModalVisible}>
        <Text style={styles.modalText}>Starting a new game will delete the saved game.</Text>
        <Text style={[styles.modalText, styles.modalTextSpacing]}>Are you sure you want to continue?</Text>
        <Row style={styles.row}>
          <Button style={styles.button} onPress={handleConfirmPress}>Yes</Button>
          <Button style={styles.button} onPress={handleCancelPress}>No</Button>
        </Row>
      </ConfirmationModal>
    </>
  );
};

const styleSheet = (colorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMES.backgroundColor[colorTheme],
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: THEMES.color[colorTheme],
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  modalTextSpacing: {
    marginTop: 10
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 15,
    marginTop: 20
  }
});

export default HomeScreen;