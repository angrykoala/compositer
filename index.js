"use strict";

function _validateComponents(components) {
    for(const name in components) {
        const component = components[name];
        if(typeof component !== 'function') throw new TypeError(`${component} is not a class`);
    }
}

function composeModule(cls, name, ChildClass, ...params) {
    const instance = new ChildClass(cls, ...params);
    Object.defineProperty(cls, name, {
        get() {
            return instance;
        }
    });
}

module.exports = function compose(BaseClass, components, ...childParams) {
    _validateComponents(components);
    return class BaseClassComposite extends BaseClass {
        constructor(...params) {
            super(...params);
            for(const name in components) {
                composeModule(this, name, components[name], ...childParams);
            }
        }
    };
};
