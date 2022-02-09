"use strict";

// Greets the world.
console.log("Hello world!");
// This is an industrial-grade general-purpose greeter function:
function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);  }
   
greet("Maddison", new Date());

let msg: string = "hello there!";
    

let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed 
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

function getFavoriteNumber(): number {
    return 26;
  }
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];
 

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }): number {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
    return pt.x
  }
 const a: number = printCoord({ x: 3, y: 7 });

 // ? optional
 function printName(obj: { first: string; last?: string }) {
    // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

function showName(obj: { first: string; last?: string }) {
// Error - might crash if 'obj.last' wasn't provided!
console.log(obj.last.toUpperCase());
//Object is possibly 'undefined'.

if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
}

// A safe alternative using modern JavaScript syntax:
console.log(obj.last?.toUpperCase());
}

function printId(id: number | string | object) {
    console.log("Your ID is: " + id);
  }
  // OK
  printId(101);
  // OK
  printId("202");
  // Error
  printId({ myID: 22342 });

function showId(id: number | string) {
    if (typeof id === "string") {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
    } else {
        // Here, id is of type 'number'
        console.log(id);
    }
} 

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
  }

// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
  }

// A type alias is exactly that - a name for any type. The syntax for a type alias is:
type Point = {
    x: number;
    y: number;
  };
   
  // Exactly the same as the earlier example
  function showCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
   
  showCoord({ x: 100, y: 100 });

  type ID = number | string;

  // An interface declaration is another way to name an object type:
  interface Punto {
    x: number;
    y: number;
  }
   
  function anotherCoord(pt: Punto) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
   
  anotherCoord({ x: 100, y: 100 });

  // Type aliases and interfaces are very similar, 
  // and in many cases you can choose between them 
  // freely. Almost all features of an interface are 
  // available in type, the key distinction is that 
  // a type cannot be re-opened to add new properties 
  // vs an interface which is always extendable.
  interface Window {
    title: string
  }
  
  interface Window {
    ts: number
  }
  
  // Sometimes you will have information about the type of a 
  // value that TypeScript can’t know about.
  // In this situation, you can use a type assertion to specify a more specific type:
  const misCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

  // You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:
  const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

  let x: "hello" = "hello";
// OK
x = "hello";
// ...
// x = "howdy"; <--ERROR

function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
  }
  printText("Hello, world", "left");
  //printText("G'day, mate", "centre"); <--ERROR

  function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
  }

  interface Options {
    width: number;
  }
  function configure(x: Options | "auto") {
    // ...
  }
  configure({ width: 100 });
  configure("auto");
  // configure("automatic");  <--ERROR

// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
// handleRequest(req.url, req.method as "GET");

const req1 = { url: "https://example.com", method: "GET" } as const;
// handleRequest(req.url, req.method);

function doSomething(x: string | null) {
    if (x === null) {
      // do nothing
    } else {
      console.log("Hello, " + x.toUpperCase());
    }
  }

// TypeScript also has a special syntax for removing null and undefined 
// from a type without doing any explicit checking. 
// Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined:  
function liveDangerously(x?: number | null) {
    // No error
    console.log(x!.toFixed());
  }
// so it’s important to only use ! when you know that the value can’t be null or undefined


// The simplest way to describe a function is with a function type expression. These 
// types are syntactically similar to arrow functions:
function greeter(fn: (a: string) => void) {
    fn("Hello, World");
  }
   
  function printToConsole(s: string) {
    console.log(s);
  }
   
  greeter(printToConsole);

  type GreetFunction = (a: string) => void;
function hello(fn: GreetFunction) {
  // ...
}

// Call Signatures
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
  };
  function doAlgo(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
  }

// You can write a construct signature by adding the 
//new keyword in front of a call signature:
interface CallOrConstruct {
    new (s: string): Date;
    (n?: number): number;
  }
  type SomeConstructor = {
    new (s: string): CallOrConstruct;
  };
  function fn(ctor: SomeConstructor) {
    return new ctor("hello");
  }

// t’s common to write a function where the 
// types of the input relate to the type of the output, or where the types of two inputs are related in some way. Let’s consider for a moment a function that returns the first element of an array:
function firstElement(arr: any[]) {
    return arr[0];
  }
  function firstElemento<Type>(arr: Type[]): Type | undefined {
    return arr[0];
  }
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const j = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);


// Before we start, it’s important to understand what 
// TypeScript considers a module. 
// The JavaScript specification declares that any 
// JavaScript files without an export or top-level 
// await should be considered a script and not a module.

// If you have a file that doesn’t currently 
// have any imports or exports, but you want to be treated as a module, add the line:
export {};


