"use strict";
const { setWorldConstructor } = require('cucumber');
const PageFactory = require('../../../../utils/page_objects/pageFactory');
const assert = require('assert');

function CustomWorld() {
  this.assert = assert;
  this.page = null;

  this.getPage = function(pageName) {
    this.page = PageFactory.getPage(pageName);
    return this.page;
  }
}

setWorldConstructor(CustomWorld)