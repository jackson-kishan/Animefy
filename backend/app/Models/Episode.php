<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
  
}
