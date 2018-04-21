"use strict";

class ParentHelper {
    constructor(v, components) {
        this._value = v;
        this._components = components;
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


module.exports = {
    ParentHelper,
    ChildHelper,
    ChildHelper2
};
