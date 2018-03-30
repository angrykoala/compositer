"use strict";


function composeModule(cls, name, ChildClass, ...params) {
    const instance = new ChildClass(cls, ...params);
    Object.defineProperty(cls, name, {
        get() {
            return instance;
        }
    });
}

module.exports = function compose(BaseClass, components, ...childParams) {
    return class BaseClassComposite extends BaseClass {
        constructor(...params) {
            super(...params);
            for(const name in components) {
                composeModule(this, name, components[name], ...childParams);
            }
        }
    };
};
