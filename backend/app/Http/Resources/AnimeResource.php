<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnimeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'synopsis' => $this->synopsis,
            'status' => $this->status,
            'year' => $this->year,
            'rating' => $this->rating,
            'genres' => $this->genres,
            'seasons_count' => $this->whenLoaded('seasons_count'),
            'seasons' => SeasonResource::collection($this->whenLoaded('seasons')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
