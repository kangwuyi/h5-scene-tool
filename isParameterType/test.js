(function() {

  QUnit.test( "判断是否是 Arguments", function( assert ) {
    var getArgumentsFunc = function(){return arguments;};
    assert.ok(
       kcool.isParameterType.isArguments(getArgumentsFunc(1,2)),
       "Passed!"
      );
  });
  QUnit.test( "判断是否是 Number", function( assert ) {
    assert.ok(
       kcool.isParameterType.isNumber(1),
       "Passed!"
      );
  });
  QUnit.test( "判断是否是 String", function( assert ) {
    assert.ok(
       kcool.isParameterType.isString('1'),
       "Passed!"
      );
  });
  QUnit.test( "判断是否是 Date", function( assert ) {
    assert.ok(
       kcool.isParameterType.isDate(new Date()),
       "Passed!"
      );
  });
})();
