<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnimeResource;
use App\Models\Anime;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AnimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $q = $request->string('q');
        $status = $request->string('status');
        $year = $request->integer('year');

        $animes = Anime::query()
            ->when($q, fn($x) => $x->where('title','like',"%{$q}%"))
            ->when($status, fn($x) => $x->where('status', $status))
            ->when($year, fn($x) => $x->where('year', $year))
            ->withCount('seasons')
            ->latest()
            ->paginate(20);

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
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required','string','max:255'],
            'slug' => ['nullable','string','max:255','unique:animes,slug'],
            'synopsis' => ['nullable','string'],
            'poster_path' => ['nullable','string'],
            'status' => ['nullable', Rule::in(['ongoing','completed'])],
            'year' => ['nullable','integer','between:1970,2100'],
            'genres' => ['nullable','array'],
            'genres.*' => ['string','max:50'],
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);

        $anime = Anime::create($data);

        return new AnimeResource($anime->loadCount('seasons'));
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
    public function update(Request $request, Anime $anime)
    {
         $data = $request->validate([
            'title' => ['string','max:255'],
            'slug' => ['string','max:255','unique:animes,slug,'.$anime->id],
            'synopsis' => ['string','nullable'],
            'poster_path' => ['string','nullable'],
            'status' => [ Rule::in(['ongoing','completed','hiatus'])],
            'year' => ['integer','between:1970,2100','nullable'],
            'genres' => ['array','nullable'],
            'genres.*' => ['string','max:50'],
        ]);

        if (!isset($data['slug']) && isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $anime->update($data);

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
