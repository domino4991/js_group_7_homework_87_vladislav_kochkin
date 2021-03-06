import React from 'react';
import HeaderAppBar from "../HeaderAppBar/HeaderAppBar";

const Layout = props => {
    return (
        <>
            <HeaderAppBar />
            <main className="Main">
                {props.children}
            </main>
        </>
    );
};

export default Layout;