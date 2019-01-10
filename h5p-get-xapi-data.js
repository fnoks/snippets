var $ = H5P.jQuery;
var instance = H5P.instances[0] || H5P.jQuery('iframe')[0].contentWindow.H5P.instances[0];

console.log(instance);

$.getScript('https://zackpierce.github.io/xAPI-Validator-JS/js/xapiValidator.js', function () {

  var xapi = instance.getXAPIData();

  console.log(xapi);
  
  var stmnt = xapi.statement;
  var result = xapiValidator.validateStatement(stmnt);

  // Let's check if MUST VIOLATIONS are reported
  var valid = true;
  if(result.errors) {
    for (var i = 0; i < result.errors.length; i++) {
      if (result.errors[i].level === "MUST_VIOLATION") {
        valid = false;
        console.warn('Invalid xAPI statement: ' + result.errors[i].message + ' (trace: ' + result.errors[i].trace + ')');
      }
    }
  }
  if (valid) {
    console.log('Valid xAPI statement: ', stmnt.verb.display['en-US']);
  }
  else {
    console.log(result);
  }
});
