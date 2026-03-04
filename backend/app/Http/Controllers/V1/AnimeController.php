<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnimeRequest;
use App\Http\Resources\AnimeResource;
use App\Models\Anime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AnimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $q = $request->string('q');
        // $status = $request->string('status');
        // $year = $request->integer('year');

        // $animes = Anime::query()
        //     ->when($q, fn($x) => $x->where('title','like',"%{$q}%"))
        //     ->when($status, fn($x) => $x->where('status', $status))
        //     ->when($year, fn($x) => $x->where('year', $year))
        //     ->withCount('seasons')
        //     ->latest()
        //     ->paginate(20);

        $animes = Anime::withCount('seasons')->latest()->paginate(20);

        return AnimeResource::collection($animes);
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
    public function store(AnimeRequest $request)
    {
        try {
            $validated = $request->validated();

            $anime = Anime::create([
                ...$validated,
                'slug' => Str::slug($validated['title']),
            ]);

            return new AnimeResource($anime->loadCount('seasons'));

        } catch (\Exception $e) {
            Log::error('Error creating anime: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create anime',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Anime $anime)
    {

        $anime->load(['seasons' => fn($q) => $q->withCount('episodes')]);
        return new AnimeResource($anime);
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
    public function update(AnimeRequest $request, Anime $anime)
    {
        $validated = $request->validated();

        if (!isset($validated['slug']) && isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $anime->update($validated);

        return new AnimeResource($anime->refresh()->loadCount('seasons'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anime $anime)
    {
        $anime->delete();
        return response()->noContent();
    }
}
