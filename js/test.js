function doSomething(a, b) {

    'use strict';

    var bbb = 0;
    var ccc = 1;
    var str = 'hello world';

    return a + b + bbb + ccc;
}

function MyClass() {

    'use strict';

    this.name = 1;

    return this.name;
}

var myObj = new MyClass();
doSomething();