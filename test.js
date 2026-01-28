/**
 * Test to showcase how jsdom handles the :focus-within selector.
 * This test loads an HTML document with focusable elements, focuses an input,
 * and then queries for elements matching :focus-within.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the HTML file
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// Create a JSDOM instance
const dom = new JSDOM(html);
const { document } = dom.window;

// Test :focus-within selector
console.log('Testing :focus-within selector...');

const input = document.getElementById('input');
const parent = document.getElementById('parent');

// Focus the input
input.focus();

// Check if parent has focus-within
const hasFocusWithin = parent.matches(':focus-within');
console.log(`Parent matches ':focus-within': ${hasFocusWithin}`);

// Query selector to find elements with focus-within
const elementsWithFocusWithin = document.querySelectorAll(':focus-within');
console.log(`Elements matching ':focus-within': ${elementsWithFocusWithin.length}`);
elementsWithFocusWithin.forEach((el, i) => {
    console.log(`  ${i + 1}. ${el.tagName}${el.id ? '#' + el.id : ''}`);
});
