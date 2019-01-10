var $ = H5P.jQuery;

var oldDefine = window.define;
window.define = undefined;

$.getScript('https://zackpierce.github.io/xAPI-Validator-JS/js/xapiValidator.js', function (data) {
 console.log('xapiValidator loaded', data);

 window.define = oldDefine;

 H5P.externalDispatcher.on('xAPI', function (event) {

  var instance = H5P.instances[0];
  console.log(event);

  var stmnt = event.data.statement;

  if (event.getScore() !== null && instance && instance.getXAPIData) {
    var xapiDataResult = instance.getXAPIData();
    if (JSON.stringify(xapiDataResult.statement) != JSON.stringify(stmnt)) {
      console.warn('NOT ALIKE!');
      console.warn(xapiDataResult.statement);
      console.warn(stmnt);
    }
    else {
      console.log('They are alike :)');
    }
  }

  var result = xapiValidator.validateStatement(stmnt);

  // Let's check if MUST VIOLATIONS are reported
  var valid = true;
  if(result.errors) {
    for (var i = 0; i < result.errors.length; i++) {
      if (result.errors[i].level === "MUST_VIOLATION") {
        valid = false;
        console.error('Invalid xAPI statement: ' + result.errors[i].message + ' (trace: ' + result.errors[i].trace + ')');
      }
    }
  }
  if (valid) {
    console.log('Valid xAPI statement: ', event.data.statement.verb.display['en-US']);
  }
  else {
    console.log(result);
  }


  var score = event.getScore();
  if (score !== null) {
    console.log('Score: ' + score);
  }
 });
});
