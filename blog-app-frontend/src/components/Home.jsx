import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${BASE_URL}/user-api/articles`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setArticles((res.data.payload || []).slice(0, 4));
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const openArticle = (article) => {
    if (!article?._id) return;

    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const goToAllArticles = () => {
    navigate("/user-profile");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl animate-pulse tracking-widest">
          Loading Articles...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-500 text-xl font-semibold">
          {error}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden border-b border-zinc-800">

        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 via-cyan-500/10 to-purple-600/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-5">
            Modern Blogging Platform
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Explore The World Of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Creative Writing
            </span>
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Read premium articles about AI, technology,
            programming, startups, design, and the future of innovation.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <button
              onClick={goToAllArticles}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg shadow-cyan-500/30"
            >
              Start Reading
            </button>

            <button
              className="border border-zinc-700 hover:border-fuchsia-500 hover:text-fuchsia-400 px-8 py-3 rounded-full transition duration-300"
            >
              Trending Topics
            </button>

          </div>
        </div>
      </div>

      {/* ARTICLES SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">

          <div>
            <p className="text-cyan-400 uppercase tracking-widest text-sm">
              Latest Updates
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Featured Articles
            </h2>
          </div>

          <button
            onClick={goToAllArticles}
            className="border border-zinc-700 hover:border-cyan-400 hover:text-cyan-400 px-5 py-2 rounded-full transition"
          >
            View All →
          </button>
        </div>

        {articles.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl py-20 text-center">

            <p className="text-5xl mb-4">📰</p>

            <h3 className="text-2xl font-semibold mb-2">
              No Articles Found
            </h3>

            <p className="text-zinc-500">
              New content will appear here soon.
            </p>

          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {articles.map((article) => (
              <div
                key={article._id}
                className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-cyan-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10"
              >

                {/* TOP */}
                <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"></div>

                <div className="p-6 flex flex-col h-full">

                  {/* CATEGORY */}
                  <span className="w-fit px-3 py-1 rounded-full bg-zinc-800 text-cyan-400 text-xs uppercase tracking-widest">
                    {article.category || "General"}
                  </span>

                  {/* TITLE */}
                  <h3 className="text-2xl font-bold mt-5 group-hover:text-cyan-400 transition duration-300">
                    {article.title}
                  </h3>

                  {/* CONTENT */}
                  <p className="text-zinc-400 text-sm leading-7 mt-4 flex-grow">
                    {article.content?.slice(0, 120) ||
                      "No content available"}
                    ...
                  </p>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-8">

                    <button
                      onClick={() => openArticle(article)}
                      className="text-cyan-400 hover:text-fuchsia-400 transition font-medium"
                    >
                      Read Full →
                    </button>

                    <div className="text-zinc-600 text-sm">
                      Blog
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;