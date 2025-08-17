<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();
        Venue::truncate();
        Reservation::truncate();

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();
        $user4 = User::factory()->create();
        $user5 = User::factory()->create();

        $venue1 = Venue::factory()->create();
        $venue2 = Venue::factory()->create();
        $venue3 = Venue::factory()->create();
        $venue4 = Venue::factory()->create();
        $venue5 = Venue::factory()->create();
        $venue6 = Venue::factory()->create();
        $venue7 = Venue::factory()->create();

        Reservation::factory()->create([
            'user_id' => $user1->id,
            'venue_id' => $venue1->id
        ]);
        Reservation::factory()->create([
            'user_id' => $user2->id,
            'venue_id' => $venue2->id
        ]);
        Reservation::factory()->create([
            'user_id' => $user3->id,
            'venue_id' => $venue4->id
        ]);
        Reservation::factory()->create([
            'user_id' => $user4->id,
            'venue_id' => $venue6->id
        ]);
        Reservation::factory()->create([
            'user_id' => $user5->id,
            'venue_id' => $venue7->id
        ]);
        Reservation::factory()->create([
            'user_id' => $user2->id,
            'venue_id' => $venue5->id
        ]);
        Reservation::factory()->create([
            'user_id' => $user4->id,
            'venue_id' => $venue3->id
        ]);
    }
}
