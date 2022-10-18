(()=>{"use strict";const e=class{constructor(e){this.params=e}setTitle(e){this.title=e,document.title=e}setTemplate(e){this.template=e}setScript(e){const t=document.createElement("script");t.src=e,t.async=!1,t.defer=!0,document.body.appendChild(t),this.usescript=!0}async render(){return""}async afterRender(){return""}},t=[{path:"/",view:class extends e{constructor(e){super(e),this.setTitle("Dashboard")}async render(){let e="";for(let t=1;t<10;t++)e+=`<p><a href='/posts/${t}' data-link>posts${t}</a></p>`;return`\n            <h1>Welcome !!! </h1>\n            <p>\n                안녕하세요. 반갑습니다. 당신을 환영합니다.\n            </p>\n            <div>View recent posts</div>\n            ${e}\n        `}async afterRender(){return""}}},{path:"/users",view:class extends e{constructor(e){super(e),this.setTitle("Users"),this.setTemplate("user-template")}async render(){try{const e=await axios.get("/template/pages/users.hbs"),t=document.createElement("div");return t.setAttribute("type","text/x-handlebars-template"),t.setAttribute("id","user-template"),console.log(e.data),t.append(e.data),console.log(t.outerText),t.outerText.toString()}catch(e){return"\n                <h1>Error</h1>\n                <div>페이지를 불러올 수 없습니다</div>\n            "}}async afterRender(){const e=document.getElementById("user-template")?.innerHTML;if(e){const t=Handlebars.compile(e)({users:[{name:"홍길동1",id:"aaa1",email:"aaa1@gmail.com"},{name:"홍길동2",id:"aaa2",email:"aaa2@gmail.com"},{name:"홍길동3",id:"aaa3",email:"aaa3@gmail.com"},{name:"홍길동4",id:"aaa4",email:"aaa4@gmail.com"},{name:"홍길동5",id:"aaa5",email:"aaa5@gmail.com"}]});console.log(t),document.getElementById("user-template").innerHTML=t}}}},{path:"/posts",view:class extends e{constructor(e){super(e),this.setTitle("Posts")}async render(){return`\n            <h1>${this.title}</h1>\n            <p>You are viewing the posts!</p>\n            <div class="user-table">\n            \n            <script id="entry-template" type="text/x-handlebars-template">\n                <table>\n                    <thead> \n                        <th>이름</th> \n                        <th>아이디</th> \n                        <th>메일주소</th> \n                    </thead> \n                    <tbody> \n                        {{#users}} \n                        <tr> \n                            <td>{{name}}</td> \n                            <td>{{id}}</td> \n                            <td><a href="mailto:{{email}}">{{email}}</a></td> \n                        </tr> \n                        {{/users}} \n                    </tbody> \n                </table>\n            <\/script>\n            \n            </div>\n        `}async afterRender(){const e=document.getElementById("entry-template").innerHTML.toString(),t=Handlebars.compile(e);this.setTitle("포스팅변경");const a=t({users:[{name:"홍길동1",id:"aaa1",email:"aaa1@gmail.com"},{name:"홍길동2",id:"aaa2",email:"aaa2@gmail.com"},{name:"홍길동3",id:"aaa3",email:"aaa3@gmail.com"},{name:"홍길동4",id:"aaa4",email:"aaa4@gmail.com"},{name:"홍길동5",id:"aaa5",email:"aaa5@gmail.com"}]});document.querySelector(".user-table").innerHTML=a}}},{path:"/posts/:id",view:class extends e{constructor(e){super(e),this.postId=e.id,this.setTitle("Viewing Post")}async render(){return`\n            <h1>Post</h1>\n            <p>You are viewing post #${this.postId}.</p>\n        `}async afterRender(){return""}}},{path:"/settings",view:class extends e{constructor(e){super(e),this.setTitle("Settings")}async render(){return'\n            <h1 id="stitle">Settings</h1>\n            <p>Manage your privacy and configuration.</p>\n        '}async afterRender(){const e=document.getElementById("stitle");console.log(e)}}}],a=async()=>{let e=t.map((e=>{return{route:e,result:location.pathname.match((t=e.path,new RegExp("^"+t.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)")+"$")))};var t})).find((e=>null!==e.result));e||(e={route:t[0],result:[location.pathname]});const a=new e.route.view((e=>{const t=e.result.slice(1),a=Array.from(e.route.path.matchAll(/:(\w+)/g)).map((e=>e[1]));return Object.fromEntries(a.map(((e,a)=>[e,t[a]])))})(e));document.getElementById("main-conent").innerHTML=await a.render(),await a.afterRender()},n=e=>{e.target.matches("[data-link]")&&(e.preventDefault(),(async e=>{history.pushState(null,null,e),await a()})(e.target.href))};window.addEventListener("popstate",a),document.addEventListener("DOMContentLoaded",(async()=>{document.body.addEventListener("click",n)}))})();