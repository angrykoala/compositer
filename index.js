"use strict";

const isClass = require('is-class');

function validateComponents(components) {
    for(const name in components) {
        const component = components[name];
        if(typeof component !== 'function') throw new TypeError(`${component} is not a class nor a function`);
    }
}


function composeClass(cls, name, ChildClass, ...params) {
    const instance = new ChildClass(cls, ...params);
    Object.defineProperty(cls, name, {
        get() {
            return instance;
        }
    });
}

function composeFunction(cls, name, childFunction, ...params) {
    Object.defineProperty(cls, name, {
        value(...args) {
            return childFunction(cls, ...params.concat(args));
        },
        writable: false
    });
}

function composeModule(cls, name, compositeModule, ...params) {
    if(isClass(compositeModule)) composeClass(cls, name, compositeModule, ...params);
    else composeFunction(cls, name, compositeModule, ...params);
}

module.exports = function compose(BaseClass, components, ...childParams) {
    validateComponents(components);
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
