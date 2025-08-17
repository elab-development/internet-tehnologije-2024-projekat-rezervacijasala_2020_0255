<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'slot',
        'user_id',
        'venue_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }


    public static function getAllReservations()
    {
        $result = DB::table('reservations')
            ->select('id', 'user_id', 'venue_id', 'date', 'slot')
            ->get()->toArray();
        return $result;
    }
}
