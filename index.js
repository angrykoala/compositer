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
    const name = `${BaseClass.name }Composite`;
    const componentsNames = Object.keys(components);
    const obj = {
        [name]: class extends BaseClass { // Some Magic to create a dynamic class name
            constructor(...params) {
                super(...params, componentsNames);
                for(const componentName in components) {
                    composeModule(this, componentName, components[componentName], ...childParams);
                }
            }
        }
    };
    return obj[name];
};
