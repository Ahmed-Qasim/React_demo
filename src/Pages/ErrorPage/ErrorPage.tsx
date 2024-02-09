import React from "react";
import "./ErrorPage.css";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error: any = useRouteError();

    return (
        <div id="error-page" className="center">
            <div className="content">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>

                <h2>{error.statusText || error.message}</h2>
            </div>
        </div>
    );
}

export default ErrorPage;
