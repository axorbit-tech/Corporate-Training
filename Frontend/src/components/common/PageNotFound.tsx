import { useNavigate } from "react-router-dom";

export default function PageNotFoundComponent() {
  const navigate = useNavigate();
  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1
            className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl 
             bg-gradient-to-bl from-blue-600 via-blue-300 to-blue-900 bg-clip-text text-transparent"
          >
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-600 md:text-4xl ">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex text-gray-500 bg-primary-600 hover:bg-primary-800 
                        focus:ring-4 focus:outline-none focus:ring-primary-300 
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 
                        border border-transparent hover:border-blue-500 cursor-pointer"
          >
            Click to go Back
          </button>
        </div>
      </div>
    </section>
  );
}
