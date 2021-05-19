/**
 * Example for closure
 * [JA] https://developer.mozilla.org/ja/docs/Web/JavaScript/Closures
 * [EN] https://stackoverflow.com/questions/111102/how-do-javascript-closures-work
 */

const counter = (function() {
    let store = 0;
    return {
        get: () => store,
        add: () => { store++; }
    };
})();

counter.add();
console.log(counter.get());
counter.add();
counter.add();
console.log(counter.get());
