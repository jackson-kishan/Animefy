<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\EpisodeSourceResource;
use App\Models\Episode;
use App\Models\EpisodeSource;
use Illuminate\Http\Request;

class EpisodeSourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Episode $episode)
    {
         return EpisodeSourceResource::collection($episode->sources);
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
    public function store(Request $request, Episode $episode)
    {
        $data = $request->validate([
            'type' => ['required','in:hls,mp4,dash'],
            'quality' => ['nullable','string','max:20'],
            'lang' => ['nullable','string','max:10'],
            'url' => ['required','string','max:2048'],
            'is_primary' => ['boolean'],
        ]);

        if (($data['is_primary'] ?? false) === true) {
            $episode->sources()->update(['is_primary' => false]);
        }

        $source = $episode->sources()->create($data);
        return new EpisodeSourceResource($source);
    }

    /**
     * Display the specified resource.
     */
    public function show(EpisodeSource $source)
    {
        return new EpisodeSourceResource($source);
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
    public function update(Request $request, EpisodeSource $source)
    {
        $data = $request->validate([
            'type' => ['sometimes','in:hls,mp4,dash'],
            'quality' => ['sometimes','string','max:20','nullable'],
            'lang' => ['sometimes','string','max:10','nullable'],
            'url' => ['sometimes','string','max:2048','nullable'],
            'is_primary' => ['sometimes','boolean'],
        ]);

        if (isset($data['is_primary']) && $data['is_primary'] === true) {
            $source->episode->sources()->update(['is_primary' => false]);
        }

        $source->update($data);
        return new EpisodeSourceResource($source->refresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EpisodeSource $source)
    {
        $source->delete();
        return response()->noContent();
    }
}
