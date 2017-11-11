var find = require("find-and-replace");
var GAID = process.env.GAID || 'NONE';

find
  .src('./src/index.html')
  // .text('if you want to just use text')
  .dest('./index_edit.html')
  .replace({
    '%GAID%': GAID
  })
  // fires when find and replace is finished and gives you the replaced text from either the file or the raw text
  .complete(function (txt) {
    console.log('Finished!');
  })
  // add an error callback
  .error(function (err) {
    console.log(err);
  });