import React from "react";

function LoadingGif() {
    return (
        <div className="mt-5 lg:col-start-2 lg:col-end-4 lg:flex lg:justify-center lg:items-center">
            <div className="w-[80%] m-auto p-2 lg:w-full">
                <img
                    src='/image/skolarly/loading.gif'
                    className="block mx-auto"
                    style={{ maxWidth: "100%" }}
                    alt="Loading GIF"
                />
            </div>
        </div>
    );
}

export default LoadingGif;
