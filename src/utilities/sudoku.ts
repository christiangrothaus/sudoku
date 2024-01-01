import { clone } from 'ramda';

export const shuffleArray = (array: number[]) => {
  const arrayOptions = clone(array);
  const shuffledArray = [];

  // While there remain elements to shuffle.
  while (arrayOptions.length) {

    // Pick a remaining element.
    let randomIndex = Math.floor(Math.random() * arrayOptions.length);

    // And swap it with the current element.
    shuffledArray.push(arrayOptions[randomIndex]);
    arrayOptions.splice(randomIndex, 1);
  }

  return shuffledArray;
};