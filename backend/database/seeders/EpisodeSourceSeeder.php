<?php

namespace Database\Seeders;

use App\Models\Episode;
use App\Models\EpisodeSource;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EpisodeSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $episodes = Episode::all();

        foreach( $episodes as $episode ) {
         EpisodeSource::insert([
         [
            'episode_id' => $episode->id,
            'type' => 'hd',
            'quality' => '720p',
            'lang' => 'en',
            'url' => 'https://example.com/hd/episode-' . $episode->number . '.mp4',
            'is_primary' => true,
         ],
         [
            'episode_id' => $episode->id,
            'type' => 'hd',
            'quality' => '720p',
            'lang' => 'en',
            'url' => 'https://example.com/hd/episode-' . $episode->number . '.mp4',
            'is_primary' => false,
         ]
        ]);
        }
    }
}
