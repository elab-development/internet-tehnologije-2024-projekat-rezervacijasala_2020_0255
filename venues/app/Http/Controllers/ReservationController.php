<?php

namespace App\Http\Controllers;

use App\Exports\ReservationExport;
use App\Http\Resources\Reservation\ReservationCollection;
use App\Http\Resources\Reservation\ReservationResource;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use CSV;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservations = Reservation::all();
        if (is_null($reservations) || count($reservations) === 0) {
            return response()->json('No reservations found', 404);
        }
        return response()->json(new ReservationCollection($reservations));
    }

    public function exportCSV()
    {
        return CSV::download(new ReservationExport, 'reservations.csv');
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
            'user_id' => 'required|integer',
            'venue_id' => 'required|integer',
            'date' => 'required|date',
            'slot' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::find($request->user_id);
        if (is_null($user)) {
            return response()->json('User not found!', 404);
        }

        $venue = Venue::find($request->venue_id);
        if (is_null($venue)) {
            return response()->json('Venue not found!', 404);
        }

        $reservation = Reservation::create([
            'user_id' => $request->user_id,
            'venue_id' => $request->venue_id,
            'date' => $request->date,
            'slot' => $request->slot,
        ]);

        return response()->json([
            'Reservation created' => new ReservationResource($reservation)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show($reservation_id)
    {
        $reservation = Reservation::find($reservation_id);
        if (is_null($reservation)) {
            return response()->json('Reservation not found', 404);
        }
        return response()->json(new ReservationResource($reservation));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'venue_id' => 'required|integer',
            'date' => 'required|date',
            'slot' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::find($request->user_id);
        if (is_null($user)) {
            return response()->json('User not found!', 404);
        }

        $venue = Venue::find($request->venue_id);
        if (is_null($venue)) {
            return response()->json('Venue not found!', 404);
        }

        $reservation->user_id = $request->user_id;
        $reservation->venue_id = $request->venue_id;
        $reservation->date = $request->date;
        $reservation->slot = $request->slot;

        $reservation->save();

        return response()->json([
            'Reservation updated' => new ReservationResource($reservation)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json('Reservation removed');
    }
}
