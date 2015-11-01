var fs = require('fs'),
    path = require('path');

var beml = require('beml'),
    helpers = require('broccoli-kitchen-sink-helpers'),
    mkdirp = require('mkdirp'),
    Writer = require('broccoli-writer');


module.exports = BEML;
BEML.prototype = Object.create(Writer.prototype);
BEML.prototype.constructor = BEML;

function BEML(inputTree, options) {
    'use strict';

    if (!(this instanceof BEML)) {
        return new BEML(inputTree, options);
    }

    this.inputTree = inputTree;
    this.options = {
        srcDir: options.srcDir || '/',
        destDir: options.destDir || '/',
        elemPrefix: options.elemPrefix || '__',
        modPrefix: options.modPrefix || '_',
        modDlmtr: options.modDlmtr || '_',
        files: options.files || ['**/*.html']
    };
}


BEML.prototype.write = function (readTree, destDir) {
    'use strict';
    var self = this;

    return readTree(this.inputTree).then(function (srcDir) {
        var sourcePath = path.join(srcDir, self.options.srcDir),
            destPath = path.join(destDir, self.options.destDir),
            baseDir = path.join(srcDir, self.options.srcDir),
            files = helpers.multiGlob(self.options.files, {
                cwd: baseDir,
                root: baseDir,
                nomount: false
            });

        var i = 0,
            len = files.length,
            fileSourcePath, fileDestPath, config, html, result;

        for (i = 0; i < len; i += 1) {
            fileSourcePath = path.join(sourcePath, files[i]);
            fileDestPath = path.join(destPath, files[i]);
            mkdirp.sync(path.dirname(fileDestPath));

            config = {
                elemPrefix: self.options.elemPrefix,
                modPrefix: self.options.modPrefix,
                modDlmtr: self.options.modDlmtr
            };
            html = fs.readFileSync(fileSourcePath, 'utf8');
            result = beml(html, config);

            fs.writeFileSync(fileDestPath, result, 'utf8');
        }
    });
};