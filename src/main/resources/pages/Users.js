import AbstractView from "../components/AbstractView.js";

export default class extends AbstractView {

    // 1. 생성자
    constructor(params) {
        super(params);
        this.setTitle("Users");
        this.setTemplate('user-template')
    }

    // 2. 랜더링
    async render() {
        // console.log(this.template)
        try {
            const response = await axios.get('/template/pages/users.hbs')
            const script = document.createElement('div')
            script.setAttribute('type', 'text/x-handlebars-template');
            script.setAttribute('id', 'user-template');

            console.log(response.data)
            script.append(response.data)

            console.log(script.outerText)
            return script.outerText.toString();
        } catch (error) {
            return `
                <h1>Error</h1>
                <div>페이지를 불러올 수 없습니다</div>
            `
        }
    }
    // 3. 랜더링 이후 데이터 바인딩
    async afterRender(){

        const source = document.getElementById("user-template")?.innerHTML;

        if(source){
            //핸들바 템플릿 컴파일
            const template = Handlebars.compile(source);

            //핸들바 템플릿에 바인딩할 데이터
            const data = {
                users: [
                    { name: "홍길동1", id: "aaa1", email: "aaa1@gmail.com" },
                    { name: "홍길동2", id: "aaa2", email: "aaa2@gmail.com" },
                    { name: "홍길동3", id: "aaa3", email: "aaa3@gmail.com" },
                    { name: "홍길동4", id: "aaa4", email: "aaa4@gmail.com" },
                    { name: "홍길동5", id: "aaa5", email: "aaa5@gmail.com" }
                ]
            };

            //핸들바 템플릿에 데이터를 바인딩해서 HTML 생성
            const html = template(data);

            console.log(html)
            //생성된 HTML을 DOM에 주입
            document.getElementById('user-template').innerHTML = html;
        }
    }
}