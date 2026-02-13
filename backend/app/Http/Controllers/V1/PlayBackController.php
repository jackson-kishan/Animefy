<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use Illuminate\Http\Request;

class PlayBackController extends Controller
{
    public function stream(Request $request, Episode $episode)
    {
        // Choose a source (prefer primary)
        $source = $episode->primarySource ?? $episode->sources()->first();

        abort_if(!$source, 404, 'No source for this episode.');

        // If you store private files (S3/Backblaze/etc.), generate a **temporary signed** URL here.
        // Example for S3:
        // $signedUrl = Storage::disk('s3')->temporaryUrl(parse_url($source->url, PHP_URL_PATH), now()->addMinutes(15));

        $url = $source->url; // replace with $signedUrl when using private storage

        return response()->json([
            'episode_id' => $episode->id,
            'source' => [
                'type' => $source->type,
                'quality' => $source->quality,
                'lang' => $source->lang,
                'url' => $url,
            ],
            // 'subtitles' => $episode->subtitles()->get(['lang','label','format','url']),
        ]);
    }
}
