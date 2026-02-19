<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EpisodeSourceResource extends JsonResource
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
            'type' => $this->type,
            'episode_id' => $this->episode_id,
            'quality' => $this->quality,
            'lang' => $this->lang,
            'url' => $this->url,
            'is_primary' => (bool) $this->is_primary,
        ];
    }
}
