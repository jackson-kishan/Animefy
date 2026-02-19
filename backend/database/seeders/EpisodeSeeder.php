<?php

namespace Database\Seeders;

use App\Models\Episode;
use App\Models\Season;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EpisodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

       $seasons = Season::all();

       foreach ($seasons as $season) {
          $episodes = [
            [
                'number' => 1,
                'title' => 'Episode 1',
                'description' => 'Episode 1 description',
                'duration_seconds' => 1500,
                'published_at' => now()->subDays(rand(1, 500)),
                'thumbnail_path' => 'https://example.com/thumbnail-1.jpg',
                'type' => 'hd',
                'quality' => '720p',
                'lang' => 'en',
                'url' => 'https://example.com/hd/episode-1.mp4',
                'is_primary' => true,
            ],
            [
                'number' => 2,
                'title' => 'Episode 2',
                'description' => 'Episode 2 description',
                'duration_seconds' => 1500,
                'published_at' => now()->subDays(rand(1, 500)),
                'thumbnail_path' => 'https://example.com/thumbnail-2.jpg',
                'type' => 'hd',
                'quality' => '720p',
                'lang' => 'en',
                'url' => 'https://example.com/hd/episode-2.mp4',
                'is_primary' => true,
            ],
          ];
          foreach ($episodes as $episodeData) {
            Episode::create(
                [
                    'season_id' => $season->id,
                    'number'=> $episodeData['number'],
                    'title'=> $episodeData['title'],
                    'description'=> $episodeData['description'],
                    'duration_seconds'=> $episodeData['duration_seconds'],
                    'published_at'=> $episodeData['published_at'],
                    'thumbnail_path'=> $episodeData['thumbnail_path'],
                    'type'=> $episodeData['type'],
                    'quality'=> $episodeData['quality'],
                    'lang'=> $episodeData['lang'],
                    'url'=> $episodeData['url'],
                    'is_primary'=> $episodeData['is_primary'],
                ]
            );
          }
       }
    }
}
