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
            "thumbnail_path",
            "type",
            "quality",
            "lang",
            "url",
            "is_primary",
        ];

    protected $casts = [
        "published_at" => "datetime",
    ];
     public function getVideoUrlAttribute()
    {
        return $this->video_path ? asset('storage/'.$this->video_path) : null;
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }
}
