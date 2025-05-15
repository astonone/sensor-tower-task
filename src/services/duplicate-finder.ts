import fs from 'fs/promises';
import path from 'path';
import {isGarbage, normalize} from "../utils/normalizer";

export async function findDuplicates(inputFile: string, outputFile?: string) {
    const raw = await fs.readFile(path.resolve(inputFile), 'utf-8');
    const companyNames = raw
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

    const map = new Map<string, string[]>();

    for (const name of companyNames) {
        const normalized = normalize(name);
        if (isGarbage(normalized)) {
            continue;
        }

        if (!map.has(normalized)) {
            map.set(normalized, []);
        }
        map.get(normalized)!.push(name);
    }

    const duplicates = [...map.values()].filter(group => group.length > 1);

    let output = '';

    if (duplicates.length === 0) {
        output = '✅ No duplicates found.';
    } else {
        output = duplicates
            .map(group => {
                const header = `🔁 Possible duplicates (${group.length}):`;
                const lines = group.map(name => `   • ${name}`);
                return [header, ...lines].join('\n');
            })
            .join('\n\n');
    }

    if (outputFile) {
        await fs.mkdir(path.dirname(outputFile), {recursive: true});
        await fs.writeFile(outputFile, output, 'utf-8');
        console.log(`💾 Output saved to: ${outputFile}`);
    } else {
        console.log(output);
    }
}
