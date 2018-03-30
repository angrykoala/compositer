"use strict";

const assert = require('assert');
const compose = require('..');

class ParentHelper {
    constructor(v) {
        this._value = v;
    }

    get value() {
        return this._value;
    }
}

class ChildHelper {
    constructor(parent) {
        this.value2 = parent.value + 10;
    }
}

class ChildHelper2 {
    constructor(parent, extraText) {
        this.extraText = extraText || "";
    }

    sayHi() {
        return `Hi${this.extraText}`;
    }
}


describe("Compose Tests", () => {
    it("Compose One Element", () => {
        const components = {
            child: ChildHelper
        };
        const Composite = compose(ParentHelper, components);
        const instance = new Composite(10);
        assert.strictEqual(instance.value, 10);
        assert.strictEqual(instance.child.value2, 20);
    });

    it("Compose Multiple Elements", () => {
        const components = {
            child: ChildHelper,
            child2: ChildHelper2,
            extra: ChildHelper
        };
        const Composite = compose(ParentHelper, components);
        const instance = new Composite(100);
        assert.strictEqual(instance.value, 100);
        assert.strictEqual(instance.child.value2, 110);
        assert.strictEqual(instance.extra.value2, 110);
        assert.strictEqual(instance.child2.sayHi(), "Hi");
    });

    it("Compose Override", () => {
        const components = {
            value: ChildHelper2
        };
        const Composite = compose(ParentHelper, components);
        const instance = new Composite(100);
        assert.strictEqual(instance.value.sayHi(), "Hi");
    });

    it("Compose Manual Override", () => {
        const components = {
            child: ChildHelper2
        };
        const Composite = compose(ParentHelper, components);
        const instance = new Composite(100);
        assert.throws(() => {
            instance.child = "Hello";
        });
        assert.strictEqual(instance.child.sayHi(), "Hi");
    });

    it("Nested Compose", () => {
        const childComponents = {
            child: ChildHelper2
        };
        const ChildComposite = compose(ChildHelper, childComponents);
        const parentComponents = {
            child: ChildComposite
        };
        const Composite = compose(ParentHelper, parentComponents);
        const instance = new Composite(100);
        assert.strictEqual(instance.value, 100);
        assert.strictEqual(instance.child.value2, 110);
        assert.strictEqual(instance.child.child.sayHi(), "Hi");
    });

    it("Extra Params Compose", () => {
        const components = {
            child: ChildHelper2
        };
        const Composite = compose(ParentHelper, components, " World");
        const instance = new Composite(100);
        assert.strictEqual(instance.child.sayHi(), "Hi World");
    });

});
