<?php

namespace App\Http\Resources\Reservation;

use App\Http\Resources\User\UserResource;
use App\Http\Resources\Venue\VenueResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'reservation';

    public function toArray($request)
    {
        return [
            'date' => $this->resource->date,
            'slot' => $this->resource->slot,
            'user' => new UserResource($this->resource->user),
            'venue' => new VenueResource($this->resource->venue),
        ];
    }
}
