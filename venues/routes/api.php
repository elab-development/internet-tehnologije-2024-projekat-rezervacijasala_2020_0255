<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VenueController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/venues', [VenueController::class, 'index']);
Route::get('/venues/page', [VenueController::class, 'indexPaginate']);
Route::get('/venues/{id}', [VenueController::class, 'show']);

Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/{id}', [ReservationController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

   
    Route::resource('/venues', VenueController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('/reservations', ReservationController::class)
        ->only(['store', 'update', 'destroy']);
    

    Route::post('/logout', [AuthController::class, 'logout']);
});
