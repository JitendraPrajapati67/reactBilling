<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

    
//Add you routes here, for example:
Route::post('doLogin','SoapController@doLogin');

//=================== admin =====================//

//category
Route::get('getAllItemCategories','SoapController@getAllItemCategories');
Route::post('createItemCategory','SoapController@createItemCategory');
Route::post('deleteItemCategory','SoapController@deleteItemCategory');

//customer
Route::post('getAllConsumer','SoapController@getAllConsumer');

//product
Route::get('getAllProduct','SoapController@getAllProduct');