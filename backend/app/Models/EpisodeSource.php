<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EpisodeSource extends Model
{
    
    protected $table = 
    [
        "episode_id",
        "type",
        "quality",
        "lang",
        "url",
        "is_primary",
    ];

    public function episode(): BelongsTo
    {
        return $this->belongsTo(Episode::class);
    }
}
