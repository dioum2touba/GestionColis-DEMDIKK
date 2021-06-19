import React from 'react';
import Header from './Header';


const Main = (props) => {
    return (
        <div className="content-wrapper">
            <Header title={props.title} />
            <section className="content">
                <div className="container-fluid">
                    {props.children}
                </div>
            </section>
        </div>
    );
};

export default Main;