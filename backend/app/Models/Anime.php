<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        return $this->hasMany(Season::class)->orderBy('number');
     }
}
