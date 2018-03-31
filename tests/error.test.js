"use strict";

const assert = require('assert');
const compose = require('..');
const {ParentHelper, ChildHelper} = require('./utils');


describe("Compose Errors", () => {

    it("Compose Invalid Base Class", () => {
        const components = {
            child: ChildHelper
        };
        const x = {};
        assert.throws(() => {
            compose(x, components);
        }, TypeError);
    });
    it("Compose Invalid Child Class", () => {
        const components = {
            child: 5
        };
        assert.throws(() => {
            compose(ParentHelper, components);
        }, TypeError);
    });
});
