import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiChevronDown, HiOutlineArrowTopRightOnSquare, HiOutlineNewspaper } from 'react-icons/hi2';
import toast from 'react-hot-toast';

interface Article {
  title?: string;
  description?: string;
  image_url?: string;
  url?: string;
  link?: string;
  content?: string;
}

const placeholderImg =
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=450&fit=crop&q=80';

/** NewsAPI.org /v2/everything query tuned for dairy, milk, and livestock agriculture */
const DAIRY_NEWS_QUERY =
  '"dairy" OR "dairy farm" OR "dairy farming" OR "dairy industry" OR "milk production" OR "milk prices" OR "milk market" OR "dairy cattle" OR "dairy cooperative" OR "dairy export" OR "livestock" OR "cattle farming" OR "pasteurized milk" OR "milk supply chain" OR "dairy farmer" OR "agriculture dairy"';

/** NewsAPI allows up to 100 per page; we load 33 at a time for denser grids. */
const PAGE_SIZE = 33;

/** NewsAPI.org key (replace with your own from https://newsapi.org/register if this quota is exhausted). */
const NEWSAPI_ORG_KEY = '8fbff4d924f245c38e8cd16eaf6a2264';

function isRelevantDairyArticle(article: { title?: string; description?: string }): boolean {
  const keywords = [
    'dairy',
    'milk',
    'cattle',
    'cow',
    'buffalo',
    'livestock',
    'farm',
    'farmer',
    'herd',
    'milking',
    'creamery',
    'cooperative',
    'co-op',
    'lactat',
    'pasteur',
    'butter',
    'cheese',
    'yogurt',
    'curd',
    'ghee',
    'amul',
    'nddb',
    'fodder',
    'silage',
    'agriculture',
    'animal husbandry',
  ];
  const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
  return keywords.some((k) => text.includes(k));
}

async function fetchNewsApiPage(page: number): Promise<{
  articles: Article[];
  hasMore: boolean;
}> {
  const baseUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(DAIRY_NEWS_QUERY)}&language=en&sortBy=publishedAt&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${NEWSAPI_ORG_KEY}`;

  let response: Response;
  try {
    response = await fetch(baseUrl, { method: 'GET', headers: { Accept: 'application/json' } });
  } catch {
    const proxied = `https://api.allorigins.win/get?url=${encodeURIComponent(baseUrl)}`;
    response = await fetch(proxied, { method: 'GET', headers: { Accept: 'application/json' } });
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }
    throw new Error('Unable to fetch news. Please try again later.');
  }

  let data: Record<string, unknown> = await response.json();
  if (data.contents) {
    try {
      data = JSON.parse(data.contents as string) as Record<string, unknown>;
    } catch {
      throw new Error('Unable to parse news response. Please try again later.');
    }
  }

  if (data.status === 'error') {
    const msg = typeof data.message === 'string' ? data.message : 'News service error. Please try again later.';
    throw new Error(msg);
  }

  if (data.status !== 'ok' || !Array.isArray(data.articles)) {
    throw new Error('Invalid API response format');
  }

  const raw = data.articles as Array<{
    title?: string;
    description?: string;
    url?: string;
    urlToImage?: string;
  }>;

  const filtered = raw
    .filter((a) => a.title && a.description && a.url)
    .filter(isRelevantDairyArticle)
    .map((a) => ({
      title: a.title,
      description: a.description,
      image_url: a.urlToImage || placeholderImg,
      url: a.url,
    }));

  const totalResults = typeof data.totalResults === 'number' ? data.totalResults : 0;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const hasMore = page < totalPages;

  return { articles: filtered, hasMore };
}

function NewsCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-dk-line bg-white/90 shadow-dk-sm">
      <div className="aspect-[16/10] animate-pulse bg-gradient-to-br from-dk-green-100/80 to-dk-cream-2" />
      <div className="space-y-3 px-5 pb-0 pt-5 sm:px-6 sm:pt-6">
        <div className="h-4 w-[75%] animate-pulse rounded-md bg-dk-green-100/90" />
        <div className="h-4 w-full animate-pulse rounded-md bg-dk-cream-2" />
        <div className="h-4 w-[83%] animate-pulse rounded-md bg-dk-cream-2" />
      </div>
      <div className="mt-3 border-t border-dk-line/80 bg-gradient-to-br from-dk-cream-2/50 via-white to-dk-green-50/40 px-5 py-4 sm:px-6 sm:py-5">
        <div className="h-11 animate-pulse rounded-xl bg-dk-green-800/25" />
      </div>
    </div>
  );
}

export default function Cards() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchNewsApiPage(1);
        if (result.articles.length === 0) {
          setError('No relevant dairy or milk industry articles were found. Please try again later.');
          toast.error('No dairy news articles found');
        } else {
          setArticles(result.articles);
          setHasMore(result.hasMore);
          setCurrentPage(1);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Error fetching news';
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;
    const nextPage = currentPage + 1;

    try {
      setLoadingMore(true);
      const result = await fetchNewsApiPage(nextPage);
      setArticles((prev) => {
        const seen = new Set(prev.map((a) => a.url));
        const merged = [...prev];
        for (const a of result.articles) {
          if (a.url && !seen.has(a.url)) {
            seen.add(a.url);
            merged.push(a);
          }
        }
        return merged;
      });
      setHasMore(result.hasMore);
      setCurrentPage(nextPage);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error loading more news');
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-center text-sm font-medium text-dk-muted">Loading dairy &amp; milk industry headlines…</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="mx-auto max-w-2xl rounded-2xl border border-rose-200/90 bg-gradient-to-br from-rose-50/95 to-white px-6 py-8 shadow-dk-sm ring-1 ring-rose-100/80 sm:px-8"
        role="alert"
      >
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
            <HiOutlineNewspaper className="h-6 w-6" aria-hidden />
          </div>
          <div className="mt-4 min-w-0 sm:mt-0">
            <h3 className="font-serif text-lg font-semibold text-dk-green-900">Couldn&apos;t load news</h3>
            <p className="mt-2 text-sm leading-relaxed text-dk-muted">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-dk-line bg-white/90 px-8 py-12 text-center shadow-dk-sm ring-1 ring-black/[0.04]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-dk-green-100 text-dk-green-800">
          <HiOutlineNewspaper className="h-8 w-8" aria-hidden />
        </div>
        <h3 className="font-serif mt-5 text-xl font-semibold text-dk-green-900">No dairy news right now</h3>
        <p className="mt-2 text-sm leading-relaxed text-dk-muted">
          Nothing matched our dairy and milk filters for this moment. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((a, index) => {
          const key = a.url || a.title || `article-${index}`;
          return <ArticleCard key={key} article={a} index={index} />;
        })}
      </div>

      {hasMore && (
        <div className="relative mt-14 overflow-hidden rounded-[28px] border border-dk-line bg-gradient-to-br from-white via-dk-cream-2/35 to-dk-green-100/25 px-6 py-10 shadow-dk-lg ring-1 ring-black/[0.04] sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_70%_80%_at_50%_-20%,rgba(67,196,126,0.18),transparent_70%)]"
            aria-hidden
          />
          <div
            className="mx-auto mb-8 h-px max-w-xs bg-gradient-to-r from-transparent via-dk-gold/45 to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-dk-line bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-dk-green-800 shadow-dk-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-dk-green-500" aria-hidden />
              More headlines
            </span>
            <p className="mt-4 font-serif text-xl font-semibold leading-snug text-dk-green-900 sm:text-2xl">
              Load the next batch
            </p>
            <p className="mt-2 text-sm leading-relaxed text-dk-muted">
              Up to {PAGE_SIZE} more articles per request. We surface dairy, milk, and livestock stories only.
            </p>
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="mt-8 inline-flex min-w-[220px] items-center justify-center gap-2 rounded-xl bg-dk-green-800 px-8 py-3.5 text-sm font-semibold text-white shadow-dk-sm transition hover:bg-dk-green-900 hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-55 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-dk-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {loadingMore ? (
                <>
                  <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden />
                  Fetching next {PAGE_SIZE}…
                </>
              ) : (
                <>
                  Load next {PAGE_SIZE} articles
                  <HiChevronDown className="h-5 w-5 shrink-0 opacity-95" aria-hidden />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '80px' });
  const open = () => {
    const url = article.url || article.link;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };
  let desc = '';
  if (article.description) {
    desc = article.description.length > 140 ? `${article.description.slice(0, 140)}…` : article.description;
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.04, 0.35) }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-dk-line bg-white/95 shadow-dk-sm ring-1 ring-black/[0.03] transition duration-300 hover:-translate-y-1 hover:border-dk-green-200 hover:shadow-md"
    >
      <button
        type="button"
        onClick={open}
        className="relative block w-full shrink-0 overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dk-green-500"
        aria-label={`Open article: ${article.title ?? 'News'}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-dk-green-100/50">
          <img
            src={article.image_url || placeholderImg}
            alt=""
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dk-green-900/55 via-dk-green-900/10 to-transparent"
            aria-hidden
          />
          <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-dk-line/70 bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-dk-green-800 shadow-dk-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-dk-green-500" aria-hidden />
            Wire
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col px-5 pb-0 pt-5 sm:px-6 sm:pt-6">
        <h2 className="font-serif text-lg font-semibold leading-snug tracking-tight text-dk-green-900 line-clamp-2 min-h-[2.75rem] sm:text-[1.125rem]">
          {article.title || 'Untitled'}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-dk-muted line-clamp-3">{desc || 'No summary available.'}</p>
      </div>

      <div className="mt-auto border-t border-dk-line/80 bg-gradient-to-br from-dk-cream-2/50 via-white to-dk-green-50/40 px-5 py-4 sm:px-6 sm:py-5">
        <button
          type="button"
          onClick={open}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-dk-green-800 py-3 text-sm font-semibold text-white shadow-dk-sm ring-1 ring-dk-green-900/15 transition hover:bg-dk-green-900 hover:brightness-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-dk-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dk-cream-2"
        >
          Read full article
          <HiOutlineArrowTopRightOnSquare className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
        </button>
      </div>
    </motion.article>
  );
}
