import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { useArticleStore } from '../store/articles';
import { Clock, Eye, User } from 'lucide-react';

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const { articles, incrementViews } = useArticleStore();
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    if (id) {
      incrementViews(id);
    }
  }, [id]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <article className="max-w-4xl mx-auto">
      <img
        src={article.coverImage}
        alt={article.title}
        className="w-full h-64 object-cover rounded-lg mb-8"
      />
      <div className="prose prose-lg max-w-none">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">{article.author}</span>
            <Clock className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">
              {format(new Date(article.date), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center">
            <Eye className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600">{article.views} views</span>
          </div>
        </div>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}