<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|string|max:255",
            "description" => "required|string"
        ]);


        $post = Post::create([
            "title" => $request->title,
            "description" => $request->description,
        ]);


        if ($post) {
            return response()->json([
                "Message" => "successfuly post Created",
                "data" => $post,
            ], 201);
        }
        return response()->json([
            "Message" => "Failed to create post",
        ], 422);

    }
}
