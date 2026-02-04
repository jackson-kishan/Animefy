<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Episode extends Model
{

    protected $fillable =
        [
            "season_id",
            "number",
            "title",
            "description",
            "duration_seconds",
            "published_at",
            "thumbnail_path"
        ];

    protected $casts = [
        "published_at" => "datetime",
    ];
    protected $attributes = [
        "images" => "array",
    ];

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function sources(): HasMany
    {
        return $this->hasMany(EpisodeSource::class);
    }

    public function PrimarySource(): HasOne
    {
        return $this->hasOne(EpisodeSource::class)->where("is_primary", true);
    }
}
