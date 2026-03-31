import indexes from '@cozka/utils-dev/indexes';
import {
  CONSTANTS,
  PRIVATE,
  TEST_FILE,
} from '@cozka/utils-dev/indexes/constants';

indexes({
  exclude: [CONSTANTS, PRIVATE, TEST_FILE],
});
