
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { PurgoMalumService } from '../support/PurgoMalumService.js';




const service = new PurgoMalumService();

let text: string = '';
let format: 'json' | 'text' | 'xml' = 'json';
let fillText: string = '';
let blacklist: string = '';
let response: any;

Given('I have the text {string}', function (inputText: string) {
  text = inputText;
});

Given('I want the response format to be {string}', function (fmt: string) {
  format = fmt as 'json' | 'text' | 'xml';
});

Given('I want to use {string} as the replacement', function (symbol: string) {
  fillText = symbol;
});

Given('I use the blacklist {string}', function (words: string) {
  blacklist = words;
});

When('I send a REST request to the profanity filter', async function () {
  const res = await service.filterText(text, format, blacklist);
  response = res.data;
});

When('I send a REST request with custom fill text', async function () {
  const res = await service.filterWithFillText(text, fillText, format);
  response = res.data;
});

Then('the response should contain filtered characters', function () {
  expect(response).to.be.an('object');
  expect(response.result).to.not.equal(text);
  expect(response.result).to.match(/[*#%!-]/);
});

Then('the response should return clean text', function () {
  expect(response).to.be.an('object');
  expect(response.result).to.equal(text);
});

Then('the response should return the original text', function () {
  expect(response).to.be.an('object');
  expect(response.result).to.equal(text);
});

Then('the response should be a valid JSON response', function () {
  expect(response).to.be.an('object');
  expect(response.result).to.be.a('string');
});

Then('the response should include {string}', function (expected: string) {
  expect(response).to.be.an('object');
  expect(response.result).to.include(expected);
});