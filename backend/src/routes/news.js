import express from 'express';

const router = express.Router();

// Trending legal news and articles (mock data - in production, fetch from API/DB)
const trendingNews = [
  {
    id: 'news_1',
    title: 'Supreme Court Ruling on Property Rights',
    titleHi: 'संपत्ति अधिकारों पर सुप्रीम कोर्ट का फैसला',
    summary: 'Latest SC judgment clarifies inheritance rights in ancestral property disputes',
    summaryHi: 'नवीनतम एससी निर्णय पैतृक संपत्ति विवादों में विरासत अधिकारों को स्पष्ट करता है',
    category: 'property',
    date: '2024-02-15',
    trending: true,
    views: 15420,
    icon: '📜'
  },
  {
    id: 'news_2',
    title: 'New Consumer Protection Guidelines',
    titleHi: 'नई उपभोक्ता संरक्षण दिशानिर्देश',
    summary: 'Government introduces stricter norms for e-commerce refunds and returns',
    summaryHi: 'सरकार ई-कॉमर्स रिफंड और रिटर्न के लिए सख्त मानदंड पेश करती है',
    category: 'consumer',
    date: '2024-02-14',
    trending: true,
    views: 12350,
    icon: '🛒'
  },
  {
    id: 'news_3',
    title: 'Changes in Family Law Procedures',
    titleHi: 'पारिवारिक कानून प्रक्रियाओं में बदलाव',
    summary: 'New amendments aim to expedite divorce and custody cases',
    summaryHi: 'नए संशोधनों का उद्देश्य तलाक और हिरासत के मामलों को तेज करना है',
    category: 'family',
    date: '2024-02-13',
    trending: true,
    views: 10890,
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'news_4',
    title: 'Digital Signature Validity in Legal Documents',
    titleHi: 'कानूनी दस्तावेजों में डिजिटल हस्ताक्षर की वैधता',
    summary: 'Courts now accepting digital signatures for most civil matters',
    summaryHi: 'अदालतें अब अधिकांश सिविल मामलों के लिए डिजिटल हस्ताक्षर स्वीकार कर रही हैं',
    category: 'general',
    date: '2024-02-12',
    trending: false,
    views: 8760,
    icon: '✍️'
  },
  {
    id: 'news_5',
    title: 'Know Your Rights: Tenant Protection Act',
    titleHi: 'अपने अधिकार जानें: किरायेदार संरक्षण अधिनियम',
    summary: 'Essential rights every tenant should know about illegal evictions',
    summaryHi: 'अवैध बेदखली के बारे में हर किरायेदार को जानने वाले आवश्यक अधिकार',
    category: 'property',
    date: '2024-02-10',
    trending: true,
    views: 14200,
    icon: '🏠'
  },
  {
    id: 'news_6',
    title: 'Understanding Your Constitutional Rights',
    titleHi: 'अपने संवैधानिक अधिकारों को समझना',
    summary: 'A simple guide to fundamental rights guaranteed by Indian Constitution',
    summaryHi: 'भारतीय संविधान द्वारा गारंटीकृत मौलिक अधिकारों की सरल मार्गदर्शिका',
    category: 'constitution',
    date: '2024-02-08',
    trending: false,
    views: 9500,
    icon: '📜'
  }
];

// Get trending news
router.get('/trending', (req, res) => {
  const { language = 'en', limit = 6 } = req.query;

  const trending = trendingNews
    .filter(news => news.trending)
    .sort((a, b) => b.views - a.views)
    .slice(0, parseInt(limit))
    .map(news => ({
      id: news.id,
      title: language === 'hi' ? news.titleHi : news.title,
      summary: language === 'hi' ? news.summaryHi : news.summary,
      category: news.category,
      date: news.date,
      views: news.views,
      icon: news.icon
    }));

  res.json({
    success: true,
    news: trending,
    total: trending.length
  });
});

// Get all news with optional filtering
router.get('/', (req, res) => {
  const { language = 'en', category, limit = 10 } = req.query;

  let filtered = [...trendingNews];

  if (category) {
    filtered = filtered.filter(news => news.category === category);
  }

  filtered = filtered
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, parseInt(limit))
    .map(news => ({
      id: news.id,
      title: language === 'hi' ? news.titleHi : news.title,
      summary: language === 'hi' ? news.summaryHi : news.summary,
      category: news.category,
      date: news.date,
      views: news.views,
      icon: news.icon,
      trending: news.trending
    }));

  res.json({
    success: true,
    news: filtered,
    total: filtered.length
  });
});

// Get specific news article
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { language = 'en' } = req.query;

  const news = trendingNews.find(n => n.id === id);

  if (!news) {
    return res.status(404).json({ error: 'News article not found' });
  }

  res.json({
    success: true,
    news: {
      id: news.id,
      title: language === 'hi' ? news.titleHi : news.title,
      summary: language === 'hi' ? news.summaryHi : news.summary,
      category: news.category,
      date: news.date,
      views: news.views,
      icon: news.icon,
      trending: news.trending
    }
  });
});

export default router;
