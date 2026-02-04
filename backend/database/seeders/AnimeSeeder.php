<?php

namespace Database\Seeders;

use App\Models\Anime;
use App\Models\Episode;
use App\Models\Season;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AnimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $animes = [
            [
                'title' => 'Attack on Titan',
                'synopsis' => 'Attack on Titan is a Japanese manga series written and illustrated by Hajime Isayama. It is set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoid Titans.',
                'images' => 'https://example.com/attack-on-titan.jpg',
                'status' => 'ongoing',
                'year' => 2013,
                'rating' => 8.5,
                'genres' => ['Action', 'Drama', 'Fantasy'],
                'seasons' => [
                    [
                        'number' => 1,
                        'title' => 'Season 1',
                        'description' => 'Season 1 description',
                        'images' => 'https://example.com/season-1.jpg',
                        'episodes' => [
                            'number' => '',
                            'title'=> '',
                            'description'=> '',
                            'duration_seconds' => '',
                            'published_at' => '',
                            'thumbnail_path' => '',
                        ],
                    ]
                ]
            ],
            [
                'title' => 'Naruto',
                'slug' => 'naruto',
                'synopsis' => 'Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It is set in a world where ninja are the most powerful fighters and train in the art of ninja to protect their village.',
                'images' => 'https://example.com/naruto.jpg',
                'status' => 'completed',
                'year' => 2002,
                'rating' => 8.5,
                'genres' => ['Action', 'Adventure', 'Fantasy'],
                'seasons' => [
                    [
                        'number' => 1,
                        'title' => 'Season 1',
                        'description' => 'Season 1 description',
                        'images' => 'https://example.com/season-1.jpg',
                        'episodes' => [
                            'number' => '',
                            'title'=> '',
                            'description'=> '',
                            'duration_seconds' => '',
                            'published_at' => '',
                            'thumbnail_path' => '',
                        ],
                    ]
                ]
            ]
        ];

        foreach ($animes as $animeData) {

            $anime = Anime::create([
                'title' => $animeData['title'],
                'slug' => Str::slug($animeData['title']),
                'synopsis' => $animeData['synopsis'],
                'images' => $animeData['images'],
                'status' => $animeData['status'],
                'year' => $animeData['year'],
                'rating' => $animeData['rating'],
                'genres' => $animeData['genres'],
            ]);

            foreach ($animeData['seasons'] as $seasonData ) {
                $season = Season::create([
                    'anime_id' => $anime->id,
                    'number' => $seasonData['number'],
                    'title' => $seasonData['title'],
                    'description' => $seasonData['description'],
                    'images' => $seasonData['images'],
                ]);

                for ($i = 1; $i <= $seasonData['episodes']; $i++) {
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
