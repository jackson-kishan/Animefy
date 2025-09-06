<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Animes extends Model
{
     use SoftDeletes;

     protected $fillable = [
       'title',
       'slug',
       'synopsis',
       'status',
       'year',
       'genres'
     ];

     protected $casts = [
        'genres' => 'array'
     ];

     public function seasons()
     {
        return $this->hasMany(Seasons::class)->orderBy('number');
     }
}
