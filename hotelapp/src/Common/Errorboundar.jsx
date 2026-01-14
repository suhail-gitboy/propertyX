import React from "react";

export function fallbackRender({ error, resetErrorBoundary }) {
    return (
        <div
            role="alert"
            className="min-h-screen flex items-center justify-center bg-slate-100 px-4"
        >
            <div role="alert">


            </div>
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">
                    Something went wrong
                </h2>

                <button onClick={resetErrorBoundary}>Try again</button>
                <pre className="text-red-600 text-sm whitespace-pre-wrap mb-5">
                    {error?.message || "Unknown error"}
                </pre>

                <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition"
                >
                    Go back home
                </button>
            </div>
        </div>

    );
}
