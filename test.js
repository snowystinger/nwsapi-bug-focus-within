const { JSDOM } = require("jsdom");

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
  <div id="container">
    <input id="field" type="text" />
  </div>
</body>
</html>
`);

const { document } = dom.window;
const container = document.getElementById('container');
const field = document.getElementById('field');

// Focus the input
field.focus();

console.log('=== nwsapi :focus-within Bug Reproduction ===\n');

// Test 1: Element.prototype.matches()
const test1 = container.matches(':focus-within');
console.log('Test 1: container.matches(":focus-within")');
console.log('  Expected: true');
console.log(`  Actual:   ${test1}`);
console.log(`  Status:   ${test1 ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 2: querySelector with :focus-within
const test2 = document.querySelector('#container:focus-within');
console.log('Test 2: document.querySelector("#container:focus-within")');
console.log('  Expected: <div id="container">');
console.log(`  Actual:   ${test2 ? test2.outerHTML : 'null'}`);
console.log(`  Status:   ${test2 !== null ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 3: querySelectorAll with :focus-within
const test3 = document.querySelectorAll(':focus-within');
console.log('Test 3: document.querySelectorAll(":focus-within")');
console.log('  Expected: NodeList with container and field (length: 4)');
console.log(`  Actual:   NodeList length: ${test3.length}`);
console.log(`  Status:   ${test3.length === 4 ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 4: The focused element itself (this should work even in buggy version)
const test4 = field.matches(':focus-within');
console.log('Test 4: field.matches(":focus-within") [control test]');
console.log('  Expected: true');
console.log(`  Actual:   ${test4}`);
console.log(`  Status:   ${test4 ? '✅ PASS' : '❌ FAIL'}\n`);

console.log('=== Summary ===');
console.log('In a real browser or with fixed nwsapi: All tests PASS ✅');
console.log('In nwsapi 2.2.23: Tests 1-3 FAIL, only Test 4 PASSES ❌');
