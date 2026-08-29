'use client';

import { useState } from 'react';
import { X, Plus, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import ImageUploader from './file-upload-dropzone-1';
import { AnimeType } from '@/types';

// interface AnimeFormData {
//   title: string;
//   slug: string;
//   synopsis: string;
//   images: string[];
//   status: 'Ongoing' | 'Completed' | 'Upcoming';
//   year: number;
//   rating: number;
//   genres: string[];
// }

const AVAILABLE_GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Magical Girl',
  'Mecha',
  'Mystery',
  'Psychological',
  'Romance',
  'School',
  'Sci-Fi',
  'Slice of Life',
  'Supernatural',
  'Thriller',
];

export default function AnimeUploadForm() {
  const [formData, setFormData] = useState<AnimeType>({
    title: '',
    slug: '',
    synopsis: '',
    images: [],
    status: 'Upcoming',
    year: new Date().getFullYear(),
    rating: 7.5,
    genres: [],
  });

  const [imageInput, setImageInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
    if (errors.title) {
      setErrors({ ...errors, title: '' });
    }
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
      });
      setImageInput('');
      if (errors.images) {
        setErrors({ ...errors, images: '' });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleGenreToggle = (genre: string) => {
    setFormData({
      ...formData,
      genres: formData.genres.includes(genre)
        ? formData.genres.filter((g) => g !== genre)
        : [...formData.genres, genre],
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }

    if (!formData.synopsis.trim()) {
      newErrors.synopsis = 'Synopsis is required';
    } else if (formData.synopsis.length < 20) {
      newErrors.synopsis = 'Synopsis must be at least 20 characters';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one image URL is required';
    }

    if (formData.genres.length === 0) {
      newErrors.genres = 'Select at least one genre';
    }

    if (formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store in localStorage (replace with actual API call)
      const existingAnime = JSON.parse(localStorage.getItem('anime') || '[]');
      const newAnime = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('anime', JSON.stringify([...existingAnime, newAnime]));

      setSuccessMessage(
        `Successfully uploaded "${formData.title}"! The anime has been added to the database.`
      );

      // Reset form
      setFormData({
        title: '',
        slug: '',
        synopsis: '',
        images: [],
        status: 'Upcoming',
        year: new Date().getFullYear(),
        rating: 7.5,
        genres: [],
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setErrors({
        submit: 'Failed to upload anime. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Upload Anime Series</h1>
          <p className="text-purple-300">
            Add a new anime series to our database with detailed information
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-green-200">{successMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 lg:p-8">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Anime Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter anime title (e.g., Demon Slayer)"
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.title ? 'border-red-500' : 'border-purple-500/20'
                }`}
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.title}
                </p>
              )}
            </div>

             {/* Synopsis */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Synopsis * ({formData.synopsis.length} characters)
              </label>
              <textarea
                value={formData.synopsis}
                onChange={(e) =>
                  setFormData({ ...formData, synopsis: e.target.value })
                }
                placeholder="Enter a detailed synopsis of the anime (minimum 20 characters)"
                rows={5}
                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                  errors.synopsis ? 'border-red-500' : 'border-purple-500/20'
                }`}
              />
              {errors.synopsis && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.synopsis}
                </p>
              )}
            </div>


         

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Status *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(['Ongoing', 'Completed', 'Upcoming'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, status })}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      formData.status === status
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700/50 border border-purple-500/20 text-purple-300 hover:border-purple-500/40'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

           

            {/* Images */}
           < ImageUploader />

            {/* Genres */}
            <div className="mb-6 mt-5">
              <label className="block text-sm font-semibold text-white mb-3">
                Genres * (Select at least one)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {AVAILABLE_GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      formData.genres.includes(genre)
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700/50 border border-purple-500/20 text-purple-300 hover:border-purple-500/40'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              {errors.genres && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.genres}
                </p>
              )}
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-200">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Anime Series
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-200 text-sm">
            <span className="font-semibold">Note:</span> This form validates all required
            fields. Images are stored as URLs and genres are selected from a predefined
            list. Data is currently stored in browser localStorage. For production, connect
            a database integration (Supabase, Neon, etc.).
          </p>
        </div>
      </div>
    </div>
  );
}
