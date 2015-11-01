# broccoli-beml
> Plugin for processing [BEML][beml] templates


How to use
-----

Install broccoli-beml as a dev dependency:

```shell
npm install broccoli-beml --save-dev
```

Then, add it to your Brocfile.js:

```javascript
var beml = require('broccoli-beml');

var htmls = beml('pathToFolder', {
    // These options are defaults and can be ignored
    srcDir: '/',
    destDir: '/',
    files: ['**/*.html'],
    elemPrefix: '__',
    modPrefix: '_',
    modDlmtr: '_'
  });
  
module.exports = htmls;

```

[beml]: https://github.com/zenwalker/node-beml
