import * as commander from 'commander';
import { findDuplicates } from './services/duplicate-finder';

const program = new commander.Command();
program.version('1.0.0');

program
    .command('find-duplicates <inputFile>')
    .description('Find potential duplicate company names')
    .option('-o, --output <outputFile>', 'Write result to a file instead of console')
    .action(async (inputFile, options) => {
        await findDuplicates(inputFile, options.output);
    });

program.parse(process.argv);


