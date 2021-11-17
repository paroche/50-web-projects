// demo that JS is lexically scoped, rather than dynamically scoped

function foo() {
    console.log( a ); // 2
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;

bar(); // prints '2'