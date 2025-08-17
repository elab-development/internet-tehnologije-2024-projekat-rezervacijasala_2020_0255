<?php

namespace App\Http\Resources\Venue;

use Illuminate\Http\Resources\Json\JsonResource;

class VenueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'venue';

    public function toArray($request)
    {
        return [
            'name' => $this->resource->name,
            'description' => $this->resource->description,
            'address' => $this->resource->address,
            'price' => $this->resource->price,
        ];
    }
}
