#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var sec = require('./lib/sec');

/** Label track exported from Audacity, should be a .txt. */
var inputFile = '';
/** File to write resultant srt to. */
var outputFile = '';

var result = '';

if (process.argv.length > 2) {
    // first argument should be the exported label track
    inputFile = process.argv[2];

    // is the output file specified?
    if (process.argv.length > 3) {
        // yes
        outputFile = process.argv[3];
    } else {
        // no
        outputFile = inputFile.replace(/\.txt$/, '') + '.srt';
    }
} else {
    // if the program is run with no arguments
    console.error(`Usage: audacitysrt <input file> [<output file>]`);
    process.exit(0);
}

fs.readFile(inputFile, 'utf8', function(err, data) {
    if (!err) {
        var rows = data.toString().split('\n');

        for (var i = 0; i < rows.length - 1; i++) {
            var row = rows[i].toString().split('\t');
            result += `${i + 1}\n` + sec(row[0]) + ' ' + '-->' + ' ' + sec(row[1]) + '\n' + row[2] + '\n\n';
        }

        fs.writeFile(outputFile, result, function(err, data) {
            if (err) {
                console.log(err);
            }
        });
    }
});
