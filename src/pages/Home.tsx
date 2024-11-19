import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useArticleStore } from '../store/articles';
import { Clock, Eye } from 'lucide-react';

export default function Home() {
  const { articles } = useArticleStore();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Latest Articles</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{format(new Date(article.date), 'MMM d, yyyy')}</span>
                <Eye className="h-4 w-4 ml-4 mr-1" />
                <span>{article.views} views</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}