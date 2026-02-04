<?php

namespace Database\Seeders;

use App\Models\Anime;
use App\Models\Episode;
use App\Models\Season;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $animes = Anime::all();

        foreach($animes as $anime ) {

        $seasons = [
            [
                'number' => 1,
                'title' => 'Season 1',
                'description' => 'Season 1 description',
                'images' => 'https://example.com/season-1.jpg',
            ]
            ];

            foreach($seasons as $season => $seasons_data) {
               $season = Season::create([
                    'anime_id' => $anime->id,
                    'number' => $seasons_data['number'],
                    'title' => $seasons_data['title'],
                    'description' => $seasons_data['description'],
                    'images' => $seasons_data['images'],
                ]);

                for ($i = 1; $i <= $season['episodes']; $i++) {
                    Episode::create([
                        'season_id' => $season->id,
                        'number' => $i,
                        'title' => 'Episode ' . $i,
                        'description' => fake()->paragraph(),
                        'duration_seconds' => rand(1200, 1500),
                        'published_at' => now()->subDays(rand(1, 500)),
                        'thumbnail_path' => 'https://example.com/thumbnail-' . $i . '.jpg',
                    ]);
                }
            }
        }
    }
}
