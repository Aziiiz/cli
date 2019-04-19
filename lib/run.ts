import { getDirList } from './helpers';
import path from 'path';
import colors from 'colors';
import { prompt } from 'inquirer';
const env = 'user';
// get env from console for making of second menu iteration
const userGeneratorsDir = path.join(__dirname, './generators');
const localGeneratorsDir = path.join(__dirname, './local-generators');

const creationQuestions = [
  {
    type: 'list',
    name: 'generator',
    message: 'Please select generator:',
    choices: getDirList(userGeneratorsDir).map(file =>
      path.basename(file)
    )
  }
];

const init = async () => {
  const answ = (await prompt(creationQuestions)) as { generator: string };

  const fn = require(path.join(
    __dirname,
    './generators',
    answ.generator,
    'index'
  ));

  const config = fn();
  let current = 0;

  const move = async () => {
    if (config.tasks.length > current) {
      /* Step */
      await config.tasks[current]();
      current += 1;
      /* Next */
      await move();
    } else {
      console.log(`\n${colors.green('  = Have a nice day! =  ')}\n`);
      return null;
    }
  };

  try {
    move();
  } catch (err) {
    console.log(err);
  }
};

init();