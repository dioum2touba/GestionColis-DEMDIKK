import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';

const Layout = (props: any) => {
    let title_tmp = "";
    const [title, setTitle] = useState(title_tmp);

    const handleTitle = (titleHandler: string) => {
        console.log("Layout Handler");
        console.log(titleHandler);
        title_tmp = titleHandler;
        console.log("Layout Handler after change");
        console.log(title_tmp);
        setTitle(title_tmp);
        if(title_tmp === "Dashboard")            
            document.location.href = '/';
        console.log(title);
        console.log("---------------------------------- Layout Component --------------------------------------------------");
    }

    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar handleTitle={handleTitle} />
            <Main title = {title}>
                {props.children}
            </Main>
        </div>
    );
};

export default Layout;