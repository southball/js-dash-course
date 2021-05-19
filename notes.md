# Before start
- Editor: VSCode
- Environment: NodeJS
- Run `npm install -g typescript ts-node`

# JavaScript / TypeScript
- Semicolons
  - JS is a very lenient language
  - However, to prevent issues, just add a semicolon after each statement
  - (Some style guides suggest dropping all semicolons)
- `var`, `let`, `const`:
  - Do NOT use `var` (legacy)
  - General rule of thumb: use `const`
  - Use `let` only when you need to mutate the variable
  - (`let` and `const` are block-scoped, `var` is function-scoped)
  - Redeclaring variables declared by `var` is OK;  
    Redeclaring variables declared by `let` and `const` is **ERROR**
  - Example code:
    ```ts
    // OK
    for (var i = 0; i < 5; i++)
      console.log(i);
    console.log(i); // 5

    // NOT OK
    for (let i = 0; i < 5; i++)
      console.log(i);
    console.log(i); // Uncaught ReferenceError: i is not defined
    ```
- What is TypeScript?
  - JavaScript with type
  - Is a transpiler that compiles to JavaScript
- Types → TypeScript, with syntax
  - number (double, but int if it is small enough)
    - operators: `+`, `-`, `*`, `/`, `%`, 
  - (big integer: e.g. `1n`, `2n`)
    - cannot be mixed with numbers
  - array `A`
    - mutable
    - `A[i]` for i-th element, can be changed
    - elements can be of different type
    - `new Array(n)` for **EMPTY** array of length `n`
        - be **VERY** careful with empty arrays when using `forEach`, `map`, `filter`
    - important property: `length`
    - important functions: `push`, `fill`, `forEach`, `map`, `filter`, (`reduce`)
  - string
    - immutable: cannot be changed
    - important property: `length`
    - important functions: `slice`
  - object
    - like map
  - `null` and `undefined`
    - `typeof null === "object"`, `typeof undefined === "undefined"`
  - `RegExp`
  - `Map`, `Set`, etc
- Comparison: use `===` and `!==` instead of `==` and `!=` unless you have very good reasons (No you don't)
- Functions
  - normal function:
    ```ts
    function add1(x: number): number {
      return x + 1;
    }
    function mult(x: number, y: number): number {
      return x * y;
    }
    ```
  - arrow function:
    ```ts
    const add1 = (x: number): number => x + 1;
    const mult = (x: number, y: number): number => x * y;
    // also ok
    const add2 = (x: number) => x + 1;
    ```
  - (normal functions can be used before declaration)
  - difference between normal function and arrow function: `this`
    ```ts
    const obj = { val: 1 };
    obj.fn1 = function() { return this.val; }
    obj.fn2 = () => this.val; // the this here is the this in the environment
    console.log(obj.fn1()); // 1
    console.log(obj.fn2()); // undefined
    ```
  - (function expression and function declaration)
    ```ts
    function d() { return 3; }
    const e = function f() { return 4; }

    console.log(d()); // 3
    console.log(e()); // 4
    console.log(f()); // Uncaught ReferenceError: f is not defined
    ```
- Destructuring statements and spread operator
  - allowed in many places
  - in assignments: 
    ```ts 
    let a: number, b: number;
    [a, b] = [1];       // a is 1, b is undefined
    [a, b] = [1, 2];    // a is 1, b is 2
    [a, b] = [1, 2, 3]; // a is 1, b is 2
    ```
  - spread operator:
    ```ts
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    console.log([-1, ...a, ...b, 8]); // [-1, 1, 2, 3, 4, 5, 6, 8]
    let [c, ...d] = a; // c is 1, d is [2, 3]
    ```
- Promise
  - for writing asynchronous functions
  - introduced to solve the callback hell problem
    ```ts
    // before promise
    calculate1((result1) => {
      calculate2((result2) => {
        calculate3((result3) => {
          const combined = result1 + result2 + result3;
          console.log(combined);
        });
      });
    });

    // after promise
    calculate1().then((result1) => {
      calculate2().then((result2) => {
        calculate3().then((result3) => {
          const combined = result1 + result2 + result3;
          console.log(combined);
        });
      });
    });
    
    // after promise, but with Promise.all
    // WARNING: different behavior from above (3 functions run at the same time)
    Promise.all([calculate1(), calculate2(), calculate3()])
      .then(([result1, result2, result3]) => {
        const combined = result1 + result2 + result3;
        console.log(combined);
      });

    // after promise, but with async
    const result1 = await calculate1();
    const result2 = await calculate2();
    const result3 = await calculate3();
    const combined = result1 + result2 + result3;
    console.log(combined);

    // combination of async and Promise.all
    const [result1, result2, result3] = await Promise.all([
      calculate1(), calculate2(), calculate3() ]);
    const combined = result1 + result2 + result3;
    console.log(combined);
    ```
  - `await x = x` if `x` is not a promise 
  - `await` must be used in an `async` function: (in future may be different, search for "top level await")
    ```ts
    async function test() {
      await ... // ok
    }
    await ... // NOT ok
    ```
  - how a promise works:  
    (`setTimeout(fn, delay)`: runs `fn` after `delay` **microseconds**)
    ```ts
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("ok");
      }, 5000);
    });

    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("error"));
      }, 5000);
    });

    p.then((result) => {
      console.log(result);
    }); // prints "ok" after 5 seconds
    q.catch((error) => {
      console.error(error);
    }); // prints error in console after 5 seconds
    ```
- Misc
  - basically everything has `toString()` but mostly useless

# NodeJS

- Creating project
  - `npm init <project name>` to create a new project in the folder `<project name>`
  - `npm init .` to create a new project in the current folder (`.` means current folder in shell)
- Installing packages
  - `npm install <package name 1> <package name 2> <...>` to install production dependencies
  - `npm install -D <package name 1> <package name 2> <...>` to install development dependencies
- Basic: running NodeJS script
  - `node <filename.js>` to run the file
- First project: making a basic web server with Express
  - This can be done without installing any other libraries (`http` is builtin) but `express` makes it easier
  - Create a project and `npm install express`, and then `npm install -D @types/node @types/express`
  - Start with sample code:
    ```ts
    import * as express from "express";

    const app = express();

    app.get("/", (req: express.Request, res: express.Response) => {
        res.end("Hello");
    });

    app.listen(3000);
    ```
    Very useful pages: [Express API documentation](https://expressjs.com/ja/api.html) (learn to read documentation!)
  - HTTP methods: `GET`, `POST` (most common 2), etc.
    - Other methods include `DELETE`, `PUT`, etc. useful when writing a server of REST API
    - When using the method, use **lowercase** in Express
    - `app.get("/")` adds a handler when a `GET` request is sent to `/`
  - `req` is the request object
    - The properties on this object is data sent from client
    - Commonly used properties: `query` (GET only), `body` (POST, need `body-parser`)
  - `res` is the response object
    - The functions on this object is for sending response
    - `status`, `write`, `end` → be **careful** with order!
  - Middlewares:
    - `app.use(middleware)` to use middleware
    - Introduce: `body-parser`
      - First install using `npm install body-parser` and then `npm install -D @types/body-parser`
      - Then modify code
        ```ts
        const app = express();
        // add these lines
        import * as bodyParser from "body-parser";
        app.use(bodyParser.json()); // allow handling JSON in POST
        // remaining code below...
        ```
      - Try checking `req.body` before and after in any `POST` route
    - (to write your own middleware:)
      ```ts
      app.use((req, res, next) => {
        if (Math.random() < 0.9) {
          next();
        } else {
          res.end("Unlucky!");
        }
      });
      ```
  - Useful tools here:
    - Developer tools → Network tab
    - Tool for making HTTP request (normal: Postman, hardcore: `curl`)
- Self study: `yarn`
  - Alternative to `npm`
  - Used as it is faster (cache and link instead of unpack)
  - Also is consistent (`yarn.lock`, but `npm` also has `package-lock.json` now)
- Self study: code style
  - `ESLint`, `prettier` are commonly used now

# Pre-react: HTML, CSS and JS

- Do we really have enough time?
- Quite important
- Basic HTML5
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <!-- Comment -->
      <!-- Notice: no close tag for tags like meta, link, img (called void elements) -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="stylesheet.css">
      <title>Title here</title>
    </head>
    <body>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <p>Paragraph</p>

      <!-- div and span: commonly used for layout, criticized for not being semantic -->
      <div>Div Element</div>
      <span>Span Element</span>

      <script src="script.js"></script>
    </body>
  </html>
  ```

# React

- Environment setup
  - Use `create-react-app`
  - There are better environment (e.g. `snowpack`, `esbuild`) but `create-react-app` is the easiest to setup
- React: background (why React?)
  - Write complicated applications by combining small(er) components
  - Describe view with pure functions, and auto update
  - Easy to reuse components *with logic* written by others
- React basics
- Class-based component (`state`, `setState`)
  ```ts
  import React from 'react';

  type Props = {
    startValue: number;
  };

  type State = {
    count: number;
  }

  class Counter extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        count: this.props.startValue
      };
    }

    add1() {
      this.setState({ count: this.state.count + 1 });
    }

    render() {
      return (
        <div>
          Count: {this.state.count}<br />
          <button onClick={this.add1.bind(this)}>Add 1</button>
          <button onClick={() => {
            this.setState({ count: this.state.count + 5 });
          }}>Add 5</button>
          {this.props.children}
          {this.props.children}
        </div>
      )
    }
  }

  function App() {
    return (
      <Counter startValue={5}>
        <div>Hello,world!</div>
      </Counter>
    )
  }

  export default App;
  ```
- Functional component (Hooks)
  ```ts
  import React from 'react';

  type Props = {
    initialCount: number,
  }
  function Counter(props: React.PropsWithChildren<Props>) {
    let [count, setCount] = React.useState(props.initialCount);

    return (
      <div>
        Count: {count}<br />
        <button onClick={() => {
          setCount(count + 1);
        }}>Add 1</button>
        <button onClick={() => {
          setCount(count + 5);
        }}>Add 5</button>
        {props.children}
      </div>
    );
  }

  function App() {
    return (
      <Counter initialCount={5}>
        Test
      </Counter>
    )
  }

  export default App;
  ```
- Hooks:
  - Always make sure the hooks are called in the same order, and called always
  - As a general rule of thumb, **never** put hooks in `if` statements or `while` loops
  - `useState`, `useEffect` are the most commonly used hooks
  - Many hooks are defined on top of these hooks
- Important library: [React Router](https://reactrouter.com/)

# React Native



# GraphQL



# Other tools

- Learn how to use Git:
  - Basic: `git init`, `git add`, `git commit`, `git push`, `git status`
  - Very useful: `git diff`, `git log`
  - Useful: `git branch`, `git checkout`
- Yarn and NPM 1 to 1:
  - `npm install` ⇔ `yarn`
  - `npm install <package>` ⇔ `yarn add <package>`
  - `npm run start` ⇔ `yarn start`
  - `npm run build` ⇔ `yarn build`

# Roadmap

[roadmap.sh/frontend](https://roadmap.sh/frontend)