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


$(function () {

    var word = $('#word');

    $('#button').on('click', function (e) {
        e.preventDefault();

        word.html('1234');
    });

});


function ajaxTest(callback) {
    $.get('http://registry.npmjs.org/', function (data) { /*optional stuff to do after success */

        callback(data);
    }, 'json');
};