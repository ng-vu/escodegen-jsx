'use strict';

var fs = require('fs'),
    esprimafb = require('esprima-fb'),
    escodegen = require('./loader'),
    attachNewlines = require('estraverse-newline').attachNewlines,
    chai = require('chai'),
    expect = chai.expect;

function test(code, expected) {
    var tree, actual, options, StringObject;

    // alias, so that JSLint does not complain.
    StringObject = String;

    options = {
        range: true,
        loc: false,
        tokens: true,
        raw: false,
        comment: true
    };

    tree = esprimafb.parse(code, options);
    tree = escodegen.attachComments(tree, tree.comments, tree.tokens);
    tree = attachNewlines(tree, code);

    // for UNIX text comment
    actual = escodegen.generate(tree, {
        comment: true,
        format: {
            indent: {
                adjustMultilineComment: true
            }
        }
    }).replace(/[\n\r]$/, '') + '\n';
    expect(actual).to.be.equal(expected);
}

describe('compare-newline test', function () {
    fs.readdirSync(__dirname + '/compare-newline').sort().forEach(function(file) {
        var code, expected, p;
        if (/\.jsx$/.test(file) && !/expected\.jsx$/.test(file)) {
            it(file, function () {
                p = file.replace(/\.jsx$/, '.expected.jsx');
                code = fs.readFileSync(__dirname + '/compare-newline/' + file, 'utf-8');
                expected = fs.readFileSync(__dirname + '/compare-newline/' + p, 'utf-8');
                test(code, expected);
            });
        }
    });
});
