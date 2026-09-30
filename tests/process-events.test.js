const test = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const { processEventListings } = require('../assets/js/process-events.js');

function setupDocument(eventsHtml) {
  const dom = new JSDOM(`<!doctype html><html lang="en-GB"><body>${eventsHtml}</body></html>`);
  return dom.window.document;
}

test('removes event listings that are more than one day in the past', () => {
  let today = new Date('2026-09-28T12:00:00Z');

  const document = setupDocument(`
    <div class="event-listing"><time datetime="2026-09-15T09:00:00Z">Past event</time></div>
    <div class="event-listing"><time datetime="2026-09-30T18:00:00Z">Future event</time></div>
  `);

  const removedCount = processEventListings(today, document);

  assert.equal(removedCount, 1);
  assert.equal(document.querySelectorAll('.event-listing').length, 1);
  assert.equal(document.querySelector('.event-listing time').textContent.trim(), 'Future event');
});

test('keeps event listings that are still in the future', () => {
  const document = setupDocument(`
    <div class="event-listing"><time datetime="2026-09-30T18:00:00Z">Future event</time></div>
  `);

  const removedCount = processEventListings(new Date('2026-09-28T12:00:00Z'), document);

  assert.equal(removedCount, 0);
  assert.equal(document.querySelectorAll('.event-listing').length, 1);
});

test('removes event listings from yesterday, keep today', () => {
  let today = new Date('2026-09-28T12:00:00Z');

  const document = setupDocument(`
    <div class="event-listing"><time datetime="2026-09-27T09:00:00Z">Past event</time></div>
    <div class="event-listing"><time datetime="2026-09-28T18:00:00Z">Today event, later</time></div>
    <div class="event-listing"><time datetime="2026-09-28T09:00:00Z">Today event, earlier</time></div>
  `);

  const removedCount = processEventListings(today, document);

  assert.equal(removedCount, 1);
  assert.equal(document.querySelectorAll('.event-listing').length, 2);
});

test('keeps event listings that are today or in the future', () => {
  const document = setupDocument(`
    <div class="event-listing"><time datetime="2026-09-30T18:00:00Z">Future event</time></div>
    <div class="event-listing"><time datetime="2026-09-28T13:00:00Z">Today event, later</time></div>
    <div class="event-listing"><time datetime="2026-09-28T09:00:00Z">Today event, earlier</time></div>
  `);

  const removedCount = processEventListings(new Date('2026-09-28T12:00:00Z'), document);

  assert.equal(removedCount, 0);
  assert.equal(document.querySelectorAll('.event-listing').length, 3);
});

test('ignores entries without a valid time element', () => {
  const document = setupDocument(`
    <div class="event-listing"><p>No date here</p></div>
    <div class="event-listing"><time datetime="not-a-date">Broken</time></div>
  `);

  const removedCount = processEventListings(new Date('2026-09-28T12:00:00Z'), document);

  assert.equal(removedCount, 0);
  assert.equal(document.querySelectorAll('.event-listing').length, 2);
});

// add a test that's 5 minutes into the past

// add a test that's 5 minutes into the future

// add a test for change of year (i.e. new year)

