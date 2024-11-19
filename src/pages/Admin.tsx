import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useArticleStore } from '../store/articles';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';

export default function Admin() {
  const { articles, addArticle, updateArticle, deleteArticle } = useArticleStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateArticle(editing, {
        title,
        content,
        excerpt,
        coverImage,
      });
    } else {
      addArticle({
        id: Date.now().toString(),
        title,
        content,
        excerpt,
        coverImage,
        author: 'Muina Admin',
        date: new Date().toISOString().split('T')[0],
        views: 0,
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setEditing(null);
    setTitle('');
    setContent('');
    setExcerpt('');
    setCoverImage('');
  };

  const handleEdit = (article: any) => {
    setEditing(article.id);
    setTitle(article.title);
    setContent(article.content);
    setExcerpt(article.excerpt);
    setCoverImage(article.coverImage);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={resetForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Article
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (Markdown)
          </label>
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            preview="edit"
            height={400}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
        >
          {editing ? 'Update' : 'Create'} Article
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {articles.map((article) => (
            <div key={article.id} className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{article.views} views</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="p-2 text-gray-600 hover:text-indigo-600"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}