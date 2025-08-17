<?php

namespace App\Http\Controllers;

use App\Http\Resources\Venue\VenueCollection;
use App\Http\Resources\Venue\VenueResource;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VenueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $venues = Venue::all();
        if (is_null($venues) || count($venues) === 0) {
            return response()->json('No venues found!', 404);
        }
        return response()->json(new VenueCollection($venues));
    }

    public function indexPaginate()
    {
        $venues = Venue::all();
        if (is_null($venues) || count($venues) === 0) {
            return response()->json('No venues found!', 404);
        }
        $venues = Venue::paginate(3);
        return response()->json(new VenueCollection($venues));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'price' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $venue = Venue::create([
            'name' => $request->name,
            'description' => $request->description,
            'address' => $request->address,
            'price' => $request->price,
        ]);

        return response()->json([
            'Venue created' => new VenueResource($venue)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Venue  $venue
     * @return \Illuminate\Http\Response
     */
    public function show($venue_id)
    {
        $venue = Venue::find($venue_id);
        if (is_null($venue)) {
            return response()->json('Venue not found', 404);
        }
        return response()->json(new VenueResource($venue));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Venue  $venue
     * @return \Illuminate\Http\Response
     */
    public function edit(Venue $venue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Venue  $venue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Venue $venue)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'price' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $venue->name = $request->name;
        $venue->description = $request->description;
        $venue->address = $request->address;
        $venue->price = $request->price;

        $venue->save();

        return response()->json([
            'Venue updated' => new VenueResource($venue)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Venue  $venue
     * @return \Illuminate\Http\Response
     */
    public function destroy(Venue $venue)
    {
        $venue->delete();
        return response()->json("Venue deleted");
    }
}
