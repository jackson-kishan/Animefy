<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\EpisodeResource;
use App\Models\Episode;
use App\Models\Season;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Season $season)
    {
        $episodes = $season->episodes()->with(['primarySource','subtitles'])->paginate(50);
        return EpisodeResource::collection($episodes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Season $season)
    {
        $data = $request->validate([
            'number' => ['required','integer','min:1'],
            'title' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'duration_seconds' => ['nullable','integer','min:1'],
            'published_at' => ['nullable','date'],
            'thumbnail_path' => ['nullable','string'],
        ]);

        $episode = $season->episodes()->create($data);
        return new EpisodeResource($episode);
    }

    /**
     * Display the specified resource.
     */
    public function show(Episode $episode)
    {
         $episode->load(['season.anime','sources','subtitles']);
        return new EpisodeResource($episode);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Episode $episode)
    {
        $data = $request->validate([
            'number' => ['sometimes','integer','min:1'],
            'title' => ['sometimes','string','max:255'],
            'description' => ['sometimes','string','nullable'],
            'duration_seconds' => ['sometimes','integer','min:1','nullable'],
            'published_at' => ['sometimes','date','nullable'],
            'thumbnail_path' => ['sometimes','string','nullable'],
        ]);

        $episode->update($data);
        return new EpisodeResource($episode->refresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Episode $episode)
    {
         $episode->delete();
        return response()->noContent();
    }
}
