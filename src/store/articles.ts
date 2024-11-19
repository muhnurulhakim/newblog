import { create } from 'zustand';
import { Article } from '../types';

interface ArticleState {
  articles: Article[];
  addArticle: (article: Article) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  incrementViews: (id: string) => void;
}

const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'Revolusi Digital Indonesia: Transformasi E-commerce',
    content: `# Revolusi Digital Indonesia: Transformasi E-commerce

![E-commerce Indonesia](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80)

Indonesia sedang mengalami transformasi digital yang luar biasa dalam sektor e-commerce. Dengan populasi yang besar dan tingkat penetrasi internet yang terus meningkat, pasar digital Indonesia menjadi salah satu yang paling menjanjikan di Asia Tenggara.

## Perkembangan Pesat

Dalam beberapa tahun terakhir, kita menyaksikan pertumbuhan yang eksponensial dalam adopsi e-commerce. Marketplace lokal seperti Tokopedia dan Bukalapak telah menjadi unicorn, sementara pemain global seperti Shopee dan Lazada terus memperkuat posisinya.

## Inovasi Pembayaran Digital

Sistem pembayaran digital seperti QRIS dan e-wallet telah mengubah cara masyarakat Indonesia bertransaksi. Kemudahan dan keamanan yang ditawarkan mendorong lebih banyak orang untuk beralih ke transaksi digital.

## Masa Depan E-commerce Indonesia

Dengan dukungan infrastruktur yang terus membaik dan literasi digital yang meningkat, masa depan e-commerce Indonesia sangat menjanjikan. Integrasi teknologi seperti AI dan big data akan semakin meningkatkan pengalaman berbelanja online.`,
    excerpt: 'Mengulas transformasi digital dalam sektor e-commerce Indonesia dan dampaknya terhadap ekonomi nasional.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
    author: 'Muina Admin',
    date: '2024-03-10',
    views: 0
  },
  {
    id: '2',
    title: 'Fintech Indonesia: Demokratisasi Layanan Keuangan',
    content: `# Fintech Indonesia: Demokratisasi Layanan Keuangan

![Fintech Services](https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80)

Perkembangan teknologi finansial (fintech) di Indonesia telah membuka akses layanan keuangan bagi jutaan orang yang sebelumnya tidak terjangkau layanan perbankan tradisional.

## Inovasi Layanan

Fintech telah menghadirkan berbagai inovasi layanan, mulai dari:
- Pinjaman digital
- Investasi online
- Asuransi digital
- Payment gateway

## Regulasi dan Keamanan

OJK dan Bank Indonesia terus mengembangkan regulasi yang mendukung pertumbuhan fintech sambil memastikan keamanan konsumen. Standar keamanan yang ketat menjadi prioritas utama.

## Dampak Sosial

Demokratisasi layanan keuangan melalui fintech telah membantu UMKM dan masyarakat prasejahtera untuk mengakses layanan keuangan formal.`,
    excerpt: 'Menelusuri perkembangan teknologi finansial di Indonesia dan dampaknya terhadap inklusi keuangan.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
    author: 'Muina Admin',
    date: '2024-03-09',
    views: 0
  },
  {
    id: '3',
    title: 'SaaS Indonesia: Mendorong Transformasi Digital UMKM',
    content: `# SaaS Indonesia: Mendorong Transformasi Digital UMKM

![SaaS Solutions](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80)

Software as a Service (SaaS) menjadi pendorong utama transformasi digital UMKM di Indonesia. Solusi cloud-based ini memungkinkan bisnis kecil untuk mengadopsi teknologi enterprise dengan biaya terjangkau.

## Keunggulan SaaS untuk UMKM

- Biaya yang lebih terjangkau
- Kemudahan implementasi
- Skalabilitas sesuai kebutuhan
- Pembaruan otomatis

## Tren SaaS Lokal

Startup SaaS lokal mulai bermunculan dengan solusi yang disesuaikan dengan kebutuhan pasar Indonesia, seperti:
- Sistem POS digital
- Manajemen inventori
- Aplikasi akuntansi
- Platform CRM

## Masa Depan SaaS Indonesia

Dengan dukungan pemerintah untuk digitalisasi UMKM, pasar SaaS Indonesia diprediksi akan terus berkembang pesat dalam beberapa tahun ke depan.`,
    excerpt: 'Menganalisis peran Software as a Service dalam mendorong transformasi digital UMKM Indonesia.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    author: 'Muina Admin',
    date: '2024-03-08',
    views: 0
  }
];

export const useArticleStore = create<ArticleState>((set) => ({
  articles: defaultArticles,
  addArticle: (article) => set((state) => ({ 
    articles: [...state.articles, article] 
  })),
  updateArticle: (id, updatedArticle) => set((state) => ({
    articles: state.articles.map((article) => 
      article.id === id ? { ...article, ...updatedArticle } : article
    )
  })),
  deleteArticle: (id) => set((state) => ({
    articles: state.articles.filter((article) => article.id !== id)
  })),
  incrementViews: (id) => set((state) => ({
    articles: state.articles.map((article) =>
      article.id === id ? { ...article, views: article.views + 1 } : article
    )
  }))
}));