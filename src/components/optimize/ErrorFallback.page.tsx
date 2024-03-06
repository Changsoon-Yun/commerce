import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallbackPage({ error }: FallbackProps) {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Error!</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Something went wrong:(
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">{error.message}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => {
                location.reload();
              }}
              className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Reload Page
            </button>
            <button
              onClick={() => {
                location.href = '/';
              }}
              className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Go Home!
            </button>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
