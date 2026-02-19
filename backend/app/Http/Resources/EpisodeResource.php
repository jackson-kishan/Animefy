<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EpisodeResource extends JsonResource
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
            'season_id' => $this->season_id,
            'number' => $this->number,
            'title' => $this->title,
            'description' => $this->description,
            'duration_seconds' => $this->duration_seconds,
            'published_at' => $this->published_at,
            'thumbnail' => $this->thumbnail_path,
            'sources' => EpisodeSourceResource::collection($this->whenLoaded('sources')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
