<?php

namespace Database\Seeders;

use App\Models\Genres;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
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

        foreach ($genres as $genre) {
            Genres::create(['name' => $genre]);
        }
    }
}
