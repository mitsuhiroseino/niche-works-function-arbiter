import {
  ALPHABET_WIDTH,
  KANA_WIDTH,
  NUMBER_WIDTH,
  SIGN_WIDTH,
  SPACE_WIDTH,
} from '../src/string/_internal/transformString/constants';

function map2array(map: any) {
  const array = [];
  for (const key in map) {
    array.push([key, map[key]]);
  }
  console.log(JSON.stringify(array));
  return array;
}

map2array(KANA_WIDTH);
