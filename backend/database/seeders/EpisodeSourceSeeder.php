<?php

namespace Database\Seeders;

use App\Models\Episode;
use App\Models\EpisodeSource;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Log\Logger;

class EpisodeSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $episodes = Episode::all();


        $episodeSources = [
            [
                'type' => 'hd',
                'quality' => '720p',
                'lang' => 'en',
                'url' => 'https://example.com/hd/episode-1.mp4',
                'is_primary' => true,
            ],
            [
                'type' => 'hd',
                'quality' => '720p',
                'lang' => 'en',
                'url' => 'https://example.com/hd/episode-1.mp4',
                'is_primary' => false,
            ],
        ];

        foreach( $episodes as $episode ) {


         foreach( $episodeSources as $source ) {
           EpisodeSource::firstOrCreate([
             'episode_id' => $episode->id,
             'type' => $source['type'],
             'quality' => $source['quality'],
             'lang' => $source['lang'],
             'url' => $source['url'],
             'is_primary' => $source['is_primary'],
           ]);
         }
        }
    }
}
