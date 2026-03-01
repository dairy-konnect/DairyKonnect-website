import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MdOutlineChromeReaderMode } from 'react-icons/md';
import { FaArrowDown } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Article {
  title?: string;
  description?: string;
  image_url?: string;
  url?: string;
  link?: string;
  content?: string;
}

const placeholderImg = 'https://via.placeholder.com/420x240?text=No+Image';

// Filter function to ensure articles are related to farmers, dairy, milk, or India
const isRelevantArticle = (article: { title?: string; description?: string; content?: string }): boolean => {
  const searchTerms = ['farmer', 'farmers', 'dairy', 'milk', 'farming', 'cattle', 'livestock', 'india', 'indian'];
  const title = (article.title || '').toLowerCase();
  const description = (article.description || article.content || '').toLowerCase();
  const text = `${title} ${description}`;
  return searchTerms.some(term => text.includes(term));
};

export default function Cards() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const MAX_RESULTS = 100; // API limit for developer accounts
  const PAGE_SIZE = 10; // Reduced size to stay within limit

  const fetchNews = async (pageToken?: string) => {
    const apiKey = 'pub_06e0319bb1b2427fb992c931f6188b57';
    const query = encodeURIComponent('farmers OR dairy OR milk OR farming OR cattle OR livestock');
    const country = 'in'; // India
    let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${query}&country=${country}&language=en&size=${PAGE_SIZE}`;

    if (pageToken) {
      url += `&page=${pageToken}`;
    }

    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        // Handle 426 error (too many results)
        if (resp.status === 426) {
          throw new Error('API_LIMIT_REACHED');
        }
        throw new Error(`HTTP ${resp.status}`);
      }
      const data = await resp.json();

      // newsdata.io returns results in data.results array
      const articlesData = Array.isArray(data.results) ? data.results : [];

      // Filter articles to ensure they're relevant
      const filteredArticles = articlesData.filter(isRelevantArticle);

      // Map newsdata.io format to our Article interface
      const mappedArticles = filteredArticles.map((item: { title?: string; description?: string; content?: string; image_url?: string; link?: string; url?: string }) => ({
        title: item.title,
        description: item.description || item.content,
        image_url: item.image_url,
        url: item.link || item.url
      }));

      return {
        articles: mappedArticles,
        nextPage: data.nextPage || null
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await fetchNews();
        setArticles(result.articles);
        setNextPage(result.nextPage);
        // Check if we're approaching the limit
        const totalArticles = result.articles.length;
        setHasMore(!!result.nextPage && totalArticles < MAX_RESULTS);
      } catch (e) {
        const error = e as Error;
        if (error.message === 'API_LIMIT_REACHED') {
          setLimitReached(true);
          setHasMore(false);
        } else {
          setError('Error fetching news');
          toast.error('Error fetching news');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLoadMore = async () => {
    if (!nextPage || loadingMore || limitReached) return;

    // Check if adding more articles would exceed the limit
    if (articles.length >= MAX_RESULTS - PAGE_SIZE) {
      setLimitReached(true);
      setHasMore(false);
      return;
    }

    try {
      setLoadingMore(true);
      const result = await fetchNews(nextPage);
      const newTotal = articles.length + result.articles.length;

      setArticles(prev => [...prev, ...result.articles]);
      setNextPage(result.nextPage);

      // Stop if we've reached or are close to the limit
      if (newTotal >= MAX_RESULTS - PAGE_SIZE || !result.nextPage) {
        setHasMore(false);
        if (newTotal >= MAX_RESULTS - PAGE_SIZE) {
          setLimitReached(true);
        }
      } else {
        setHasMore(!!result.nextPage);
      }
    } catch (e) {
      const error = e as Error;
      if (error.message === 'API_LIMIT_REACHED') {
        setLimitReached(true);
        setHasMore(false);
        toast.success('You have reached the maximum number of articles available.');
      } else {
        toast.error('Error loading more news');
      }
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg">Loading news articles...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-red-800 font-semibold mb-1">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );

  if (!articles.length) return (
    <div className="text-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <MdOutlineChromeReaderMode className="w-10 h-10 text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No news available</h3>
          <p className="text-gray-600">No news articles found at the moment.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a, index) => {
          const key = a.url || a.title || `article-${index}`;
          return <ArticleCard key={key} article={a} />;
        })}
      </div>

      {hasMore && !limitReached && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="relative flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed font-medium overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loadingMore ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More</span>
                  <FaArrowDown className="w-4 h-4" />
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
          </button>
        </div>
      )}

      {limitReached && (
        <div className="flex justify-center mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md">
            <p className="text-sm text-yellow-800 text-center">
              <strong>Maximum articles reached.</strong> You've viewed all available articles (up to 100).
              Please upgrade to a paid plan for more results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const open = () => {
    const url = article.url || article.link;
    if (url) window.open(url, '_blank');
  };
  let desc = '';
  if (article.description) {
    desc = article.description.length > 120
      ? article.description.slice(0, 120) + '...'
      : article.description;
  }
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : undefined}
      transition={{ ease: 'easeOut', duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={article.image_url || placeholderImg}
          alt={article.title || 'News article'}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {article.title || 'No title available'}
        </h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[4.5rem]">
          {desc || 'No description available for this article.'}
        </p>
        <button
          onClick={open}
          className="relative w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg transition text-sm font-medium overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <MdOutlineChromeReaderMode className="w-5 h-5" />
            <span>Read More</span>
          </span>
          <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
        </button>
      </div>
    </motion.div>
  );
}
