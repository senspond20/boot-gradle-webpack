import AbstractView from "../components/AbstractView.js";

export default class extends AbstractView {

    // 1. 생성자
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    // 2. 랜더링
    async render() {
        return `
            <h1>${this.title}</h1>
            <p>You are viewing the posts!</p>
            <div class="user-table">
            
            <script id="entry-template" type="text/x-handlebars-template">
                <table>
                    <thead> 
                        <th>이름</th> 
                        <th>아이디</th> 
                        <th>메일주소</th> 
                    </thead> 
                    <tbody> 
                        {{#users}} 
                        <tr> 
                            <td>{{name}}</td> 
                            <td>{{id}}</td> 
                            <td><a href="mailto:{{email}}">{{email}}</a></td> 
                        </tr> 
                        {{/users}} 
                    </tbody> 
                </table>
            </script>
            
            </div>
        `;
    }
    // 3. 랜더링 이후 데이터 바인딩
    async afterRender(){
        const source = document.getElementById("entry-template").innerHTML.toString();

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
        this.setTitle('포스팅변경')
        //핸들바 템플릿에 데이터를 바인딩해서 HTML 생성
        const html = template(data);

        //생성된 HTML을 DOM에 주입
        document.querySelector('.user-table').innerHTML = html;
    }
}