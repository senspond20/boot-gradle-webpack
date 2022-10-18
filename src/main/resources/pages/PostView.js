import AbstractView from "../components/AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing Post");
    }

    async render() {
        return `
            <h1>Post</h1>
            <p>You are viewing post #${this.postId}.</p>
        `;
    }
    async afterRender(){
        return '';
    }
}
