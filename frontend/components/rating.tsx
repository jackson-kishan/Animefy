   {/* Year and Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  min="1917"
                  max={new Date().getFullYear() + 5}
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  MAL Rating * ({formData.rating.toFixed(1)}/10)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>