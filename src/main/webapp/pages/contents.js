import React from "react";
import ReactDOM from "react-dom";

import MarkdownEditor from "../components/MarkdownEditor";



const Contents = () => {
    return (
        <div className="demo-layout">
            <nav className="demo-nav">
                <div className="demo-nav-header">
                    <span className="material-icons">ac_unit</span>
                </div>
                <div className="demo-nav-content">
                    <img src="https://picsum.photos/80/80?random=1" alt="" />
                </div>
            </nav>
            <div className="demo-sidebar">
                <div className="demo-sidebar-header">
                    <div>DEMO</div>
                    <div>demo</div>
                </div>
                <div className="demo-sidebar-content">
                    <p>demo</p>
                </div>
            </div>
            <div className="demo-main">
                <header className="demo-main-header">
                    <div>CONTENTS</div>
                    <div>contents</div>
                </header>
                <section className="demo-main-contents">
                    <div className="demo-main-content">
                        <div className="demo-main-content-legend">Markdown Editor</div>
                        <MarkdownEditor />
                    </div>
                </section>
            </div>
        </div>
    );
};
export default Contents;