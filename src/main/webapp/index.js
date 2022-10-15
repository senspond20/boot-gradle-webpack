const test = require("./assets/js/test.js")
test.test();

const rootHtml = `
    <h1>안녕하십니까</h1>
    <div>반갑습니다 여러분</div>
`
document.querySelector('#root').innerHTML= rootHtml;


