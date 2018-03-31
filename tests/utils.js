"use strict";

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


module.exports = {
    ParentHelper,
    ChildHelper,
    ChildHelper2
};
