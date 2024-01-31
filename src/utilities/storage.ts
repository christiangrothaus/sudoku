import AsyncStorage from '@react-native-async-storage/async-storage';
import { SudokuBoard as SudokuBoardModel } from '../models/sudoku';
import { StorageKeys } from '../models/storage';

export const clearStoredBoard = async (errorCallback?: (error?: Error) => void): Promise<void> => {
  try {
    await AsyncStorage.removeItem(StorageKeys.BOARD);
  } catch (e) {
    errorCallback(e);
  }
};

export const storeBoard = async (board: SudokuBoardModel, successCallback: (success: boolean, error?: Error) => void): Promise<void> => {
  try {
    const serializedBoard = JSON.stringify(board);
    await AsyncStorage.setItem(StorageKeys.BOARD, serializedBoard);
    successCallback(true);
  } catch (e) {
    successCallback(false, e);
  }
};

export const getBoard = async (): Promise<SudokuBoardModel | Error> => {
  try {
    const existingBoardJson = await AsyncStorage.getItem(StorageKeys.BOARD);
    const existingBoard = <SudokuBoardModel>JSON.parse(existingBoardJson);
    return existingBoard;
  } catch (e) {
    return e;
  }
};