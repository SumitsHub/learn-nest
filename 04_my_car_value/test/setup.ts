import { rm } from 'fs/promises';
import { join } from 'path';

//* Global setup file for Jest */

// This hook will run before each test suite to remove the test.sqlite file
global.beforeEach(async () => {
  try {
    console.log('deleting test.sqlite file...');
    await rm(join(__dirname, '..', 'test.sqlite')); // remove test.sqlite file before each test run to start fresh
  } catch (e) {}
});
