import React from "react"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div>
            <p>Something went wrong: {error?.message ?? "Unknown error"}</p>
            <button type="button" className="bg-red-500 p-3 hover:bg-amber-300" onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

const ui = (<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>

</ErrorBoundary>)
export default ErrorFallback