import { Files } from './github/files.ts';

const codesArray: Array<string> = [
  'angular',
  'angular-rx',
  'angular2',
  'angular2-ts'
];

const allFiles = new Files(codesArray);

allFiles.files.subscribe((item) => console.log(item))

// console.log(allFiles);
