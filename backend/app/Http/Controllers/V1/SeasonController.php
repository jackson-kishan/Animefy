<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SeasonResource;
use App\Models\Anime;
use App\Models\Season;
use Illuminate\Http\Request;

class SeasonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Anime $anime)
    {
         $seasons = $anime->seasons()->withCount('episodes')->paginate(50);
        return SeasonResource::collection($seasons);
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
    public function store(Request $request, Anime $anime)
    {
         $data = $request->validate([
            'number' => ['required','integer','min:1'],
            'title' => ['nullable','string','max:255'],
            'description' => ['nullable','string'],
        ]);

        $season = $anime->seasons()->create($data);
        return new SeasonResource($season->loadCount('episodes'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Season $season)
    {
        $season->load(['anime','episodes']);
        return new SeasonResource($season);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Season $season)
    {
        $data = $request->validate([
            'number' => ['sometimes','integer','min:1'],
            'title' => ['sometimes','string','max:255','nullable'],
            'description' => ['sometimes','string','nullable'],
        ]);
        $season->update($data);
        return new SeasonResource($season->refresh()->loadCount('episodes'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Season $season)
    {
        $season->delete();
        return response()->noContent();
    }
}
