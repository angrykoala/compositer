Compositer
==========
_by @angrykoala_

[![npm version](https://badge.fury.io/js/compositer.svg)](https://badge.fury.io/js/compositer)
[![Build Status](https://travis-ci.org/angrykoala/compositer.svg?branch=master)](https://travis-ci.org/angrykoala/compositer)

Compositer is an utility to generate [composed](https://en.wikipedia.org/wiki/Composition_over_inheritance) ES6 classes dynamically.

`npm install --save compositer`

```js
const compose=require('compositer');

class Child{
    constructor(parent){
        this._value=parent.value*10;
    }

    get value(){
        return this._value;
    }
}


class Parent{
    constructor(value){
        this.value=value;
    }
}

// Components define the composite names for the instances of the child classes
const components = {
    "myChild": Child
};

// compose returns a new class containing the parent class and the composed sub classes
const ComposedParent = compose(Parent,components);
// The constructor of the composed class will instance and attach the child classes to getters
const myComposite = new ComposedParent(100);

myComposite.value; // 100
myComposite.myChild.value; // 1000
```


## Api

Composer exposes one function to generate composite classes:

**compose(ParentClass, components, ...extraParams?)**    
* ParentClass is the class that will have the child attached to.
* components is an object with keys being the name to use for the instance and value the child class. Same child class can be used multiple times.
    * If a plain function is used instead of a class, the function will be attached directly, the same arguments as the constructor will be used plus any argument passed to the function when called.
* extraParams allow you to add params to the child classes constructors.
* Returns a new class that will instance the child classes. The class will be named the same as the ParentClass with "Composite" at the end.
* ParentClass will receive an extra parameter with a list of all its components names, allowing it to access dynamically

## Development Instructions
After cloning the repo:

1. `npm install`
2. `npm test`
