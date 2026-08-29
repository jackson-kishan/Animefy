<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Genres;
use Illuminate\Http\Request;

class GenresController extends Controller
{
    public function index()
    {
        $genres = Genres::all();
        return response()->json($genres);
    }
}
