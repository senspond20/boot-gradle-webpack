import AbstractView from "../components/AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }
    async render() {
        let list = "";
        for(let i=1; i < 10; i++){
            list+= `<p><a href='/posts/${i}' data-link>posts${i}</a></p>`;
        }
        return `
            <h1>Welcome !!! </h1>
            <p>
                안녕하세요. 반갑습니다. 당신을 환영합니다.
            </p>
            <div>View recent posts</div>
            ${list}
        `;
    }
    async afterRender(){
        return '';
    }
}