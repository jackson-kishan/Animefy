<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Anime extends Model
{
     use SoftDeletes;

     protected $fillable = [
       'title',
       'slug',
       'synopsis',
       'images',
       'status',
       'year',
       'rating',
       'genres'
     ];

     protected $casts = [
        'genres' => 'array'
     ];

     public function seasons(): HasMany
     {
        return $this->hasMany(Season::class);
        // ->orderBy('number')
     }
      public function episodes(): HasManyThrough
     {
        return $this->hasManyThrough(
            Episode::class,
            Season::class,
            'anime_id',    // Foreign key on seasons table
            'season_id',   // Foreign key on episodes table
            'id',          // Local key on animes table
            'id'           // Local key on seasons table
        );
     }
}
