import React, {type ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface Props {
  children: ReactNode;
}

const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
      <p className="text-lg mb-2">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
      >
        Try Again
      </button>
    </div>
  );
};

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
