const { JSDOM } = require("jsdom");

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
  <div id="outer-container">
    <div id="shadow-host"></div>
  </div>
</body>
</html>
`);

const { document } = dom.window;

// Create shadow DOM
const shadowHost = document.getElementById('shadow-host');
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

// Add content to shadow root
shadowRoot.innerHTML = `
  <label>Inside Shadow Root</label>
  <input id="shadow-field" type="text" />
`;

const outerContainer = document.getElementById('outer-container');
const shadowField = shadowRoot.getElementById('shadow-field');

// Focus the input field inside shadow root
shadowField.focus();

console.log('=== nwsapi :focus-within Shadow Root Bug Reproduction ===\n');

// Test 1: Shadow host should match :focus-within
const test1 = shadowHost.matches(':focus-within');
console.log('Test 1: shadowHost.matches(":focus-within")');
console.log('  Expected: true');
console.log(`  Actual:   ${test1}`);
console.log(`  Status:   ${test1 ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 2: Outer container should match :focus-within
const test2 = outerContainer.matches(':focus-within');
console.log('Test 2: outerContainer.matches(":focus-within")');
console.log('  Expected: true');
console.log(`  Actual:   ${test2}`);
console.log(`  Status:   ${test2 ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 3: querySelector should find the shadow host
const test3 = document.querySelector('#shadow-host:focus-within');
console.log('Test 3: document.querySelector("#shadow-host:focus-within")');
console.log('  Expected: <div id="shadow-host">');
console.log(`  Actual:   ${test3 ? test3.outerHTML : 'null'}`);
console.log(`  Status:   ${test3 !== null ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 4: querySelector should find the outer container
const test4 = document.querySelector('#outer-container:focus-within');
console.log('Test 4: document.querySelector("#outer-container:focus-within")');
console.log('  Expected: <div id="outer-container">');
console.log(`  Actual:   ${test4 ? test4.outerHTML : 'null'}`);
console.log(`  Status:   ${test4 !== null ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 5: querySelectorAll should find all elements with :focus-within
const test5 = document.querySelectorAll(':focus-within');
console.log('Test 5: document.querySelectorAll(":focus-within")');
console.log('  Expected: NodeList with html, body, outer-container, and shadow-host (length: 4)');
console.log(`  Actual:   NodeList length: ${test5.length}`);
const elements = Array.from(test5).map(el => el.tagName + (el.id ? `#${el.id}` : '')).join(', ');
console.log(`  Elements: ${elements}`);
console.log(`  Status:   ${test5.length === 4 ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 6: The focused element inside shadow root
const test6 = shadowField.matches(':focus-within');
console.log('Test 6: shadowField.matches(":focus-within") [inside shadow root]');
console.log('  Expected: true');
console.log(`  Actual:   ${test6}`);
console.log(`  Status:   ${test6 ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 7: Check document.activeElement
const test7 = document.activeElement === shadowHost;
console.log('Test 7: document.activeElement === shadowHost');
console.log('  Expected: true (activeElement should be the shadow host)');
console.log(`  Actual:   ${test7}`);
console.log(`  Actual activeElement: ${document.activeElement.tagName}${document.activeElement.id ? '#' + document.activeElement.id : ''}`);
console.log(`  Status:   ${test7 ? '✅ PASS' : '❌ FAIL'}\n`);

// Test 8: Check shadowRoot.activeElement
const test8 = shadowRoot.activeElement === shadowField;
console.log('Test 8: shadowRoot.activeElement === shadowField');
console.log('  Expected: true');
console.log(`  Actual:   ${test8}`);
console.log(`  Status:   ${test8 ? '✅ PASS' : '❌ FAIL'}\n`);

console.log('=== Summary ===');
console.log('In a real browser or with correct shadow DOM support: All tests PASS ✅');
console.log('Shadow DOM encapsulates the focused element, but :focus-within should apply to shadow host and ancestors in light DOM');
