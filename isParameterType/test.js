(function() {

  QUnit.test( "isArguments 判断是否是 Arguments", function( assert ) {
    var getArgumentsFunc = function(){return arguments;};
    assert.ok(
       kcool.isParameterType.isArguments(getArgumentsFunc(1,2)),
       "Passed!"
      );
  });
  QUnit.test( "isNumber 判断是否是 Number", function( assert ) {
    assert.ok(
       kcool.isParameterType.isNumber(1),
       "Passed!"
      );
  });
  QUnit.test( "isString 判断是否是 String", function( assert ) {
    assert.ok(
       kcool.isParameterType.isString('1'),
       "Passed!"
      );
  });
  QUnit.test( "isDate 判断是否是 Date", function( assert ) {
    assert.ok(
       kcool.isParameterType.isDate(new Date()),
       "Passed!"
      );
  });
  QUnit.test( "isRegExp 判断是否是 RegExp", function( assert ) {
    assert.ok(
       kcool.isParameterType.isRegExp(new RegExp("e")),
       "Passed!"
      );
  });
  QUnit.test( "isError 判断是否是 Error", function( assert ) {
    assert.ok(
       kcool.isParameterType.isError(new Error()),
       "Passed!"
      );
  });
  QUnit.test( "isSymbol 判断是否是 Symbol", function( assert ) {
    var mySymbol = Symbol();
    assert.ok(
       kcool.isParameterType.isSymbol(mySymbol),
       "Passed!"
      );
  });
  QUnit.test( "isMap 判断是否是 Map", function( assert ) {
    assert.ok(
       kcool.isParameterType.isMap(new Map()),
       "Passed!"
      );
  });
  QUnit.test( "isWeakMap 判断是否是 WeakMap", function( assert ) {
    assert.ok(
       kcool.isParameterType.isWeakMap(new WeakMap()),
       "Passed!"
      );
  });
  QUnit.test( "isSet 判断是否是 Set", function( assert ) {
    assert.ok(
       kcool.isParameterType.isSet(new Set()),
       "Passed!"
      );
  });
  QUnit.test( "isArray 判断是否是 Array", function( assert ) {
    assert.ok(
       kcool.isParameterType.isArray(new Array()),
       "Passed!"
      );
  });
  QUnit.test( "isHas 检查对象是否具有某属性", function( assert ) {
    var obj = {name:'isHas'};
    assert.ok(
       kcool.isParameterType.isHas(obj, 'name'),
       "Passed!"
      );
  });
  QUnit.test( "isHasName 获取对象的所有属性并放在数组中", function( assert ) {
    var obj = {name:'isHas', version: '0.0.1'};
    assert.ok(
       kcool.isParameterType.isHasName(obj),
       "Passed!"
      );
  });
})();
