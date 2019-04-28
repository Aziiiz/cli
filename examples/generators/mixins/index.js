import { cliOf, useImport, usePath, useCustom } from "../../../lib/index";
import { cyan } from 'colors';
import path from 'path';
const destination = '../../destinations/';
const templatePaths = [
  './templates/moveTemplate1.js',
  './templates/moveTemplate2.js'
];

const pathOfMovedTemplateToRename = path.join(__dirname, '../../destinations/temp.file');
const renameInto = 'renamedFile.js';

cliOf('mixins', module)
  .ask({
    name: 'isOk',
    message: 'You can mix methods whatever you want',
    type: 'input',
    filter: (answers) => 'Ok!'
  })
  // moving folder with all templates inside
  .move(['./folderOfTemplates'], '../../destinations/folderOfTemplates')
  .ask({
    type: 'list',
    name: 'selectedTemplate',
    message: 'Please select template to move.',
    choices: templatePaths,
    default: templatePaths[0],
  })
  // moving selected template with saving hierarchy of folders
  .move((answers) => [answers.selectedTemplate], destination)
  // moving selected template to destination folder with rename
  .move((answers) => [{from: answers.selectedTemplate, to: 'temp.file'}], destination)

  // also we have more, maybe usable, methods for you!
  // now we will change name of the file
  .ask({
    name: 'isOk',
    message: `Press "Enter" and checkout ${cyan('temp.file')} file name`,
    type: 'input',
    filter: (answers) => 'Ok!'
  })
  .rename(pathOfMovedTemplateToRename, (answers) => renameInto)
  // also you can change answers
  .setAnswers((answers) => {newAnswer: 'one'})
