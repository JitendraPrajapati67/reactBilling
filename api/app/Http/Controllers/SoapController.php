<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Response;
use Log;

class SoapController extends Controller
{
    public function __construct()
    {
        $this->client = new \nusoap_client("http://67.205.185.159:8080/abill/services/apiTwo?wsdl", "true");
        $this->client->setCredentials("billingadmin;20", "123qwe", "basic");
    }

    public function doLogin(Request $request){
        try {
            $name = $request->input('username');
            $password = $request->input('password');

            //call api to get role of login user
            $client = new \nusoap_client("http://67.205.185.159:8080/abill/services/apiTwo?wsdl", "true", "true");
            $client->setCredentials("billingadmin;20", "123qwe", "basic");

            $error = $client->getError();
            if ($error) {
                Log::error("doLogin Error :", ['Error : ' => $error]);
                $response = Response::json(array('code' => 201, 'message' => 'category List', 'cause' => $error, 'data' => json_decode("{}")));
                return $response;
            }


            $result = $client->call("getUserId", array("arg0" => $name));
//		return $result;
            if ($client->fault) {
                Log::error("doLogin Error :", ['Error : ' => $client->fault]);
                $response = Response::json(array('code' => 201, 'message' => '"Opps! Invalid Username."', 'cause' => $client->fault, 'data' => json_decode("{}")));
                return $response;
            } else {
                $error = $client->getError();
                if ($error) {
                    Log::error("doLogin Error :", ['Error : ' => $error]);
                    $response = Response::json(array('code' => 201, 'message' => 'Opps!'.$error, 'cause' => $error, 'data' => json_decode("{}")));
                    return $response;
                } else {
                    //if name valid then check password

                    //if password correct then only store in session username n password n role
                    $userid = $result['return'];
                    $result = $client->call("getUserWS", array("arg0" => $userid));
                    if ($client->fault) {
                        Log::error("doLogin Error :", ['Error : ' => $client->fault]);
                        $response = Response::json(array('code' => 201, 'message' =>  $client->fault, 'cause' =>"", 'data' => json_decode("{}")));
                        return $response;
                    } else {
                        $actualpassword = $result['return']['password'];

//                  return $result;
                        if ($actualpassword == md5($password) || $actualpassword == md5(md5($password))) {
                            //set session n redirect
                            $role = $result['return']['role'];
                            $request->session()->put('name', $name);
                            $request->session()->put('userid', $userid);
                            $request->session()->put('role', $role);
                            if ($role == "Customer") {
                                return redirect()->route('consumerDashboard')->withInfo("Welcome to Abill Dashboard.");
                            } else if ($role == "Agent") {
                                return redirect()->route('agentdashboard')->withInfo("Welcome to Abill Dashboard.");
                            } else if ($role == "Super user") {
                                Log::info("doLogin info :", ['Info : ' => "Super user"]);
                                $response = Response::json(array('code' => 200, 'message' =>  "Login successfully.", 'cause' =>"", 'data' => json_decode("{}")));
                                return $response;
                            }
                            exit;
                        }
                    }

                }
            }

            Log::info("doLogin Error :", ['info : ' => "Opps! Invalid Username or Password."]);
            $response = Response::json(array('code' => 201, 'message' =>  "Opps! Invalid Username or Password.", 'cause' =>"", 'data' => json_decode("{}")));
            return $response;

        }catch (Exception $e){
            Log::error("getAllItemCategories Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'category List', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
    }

    public function getAllItemCategories(){
        try{
            $result = $this->client->call("getAllItemCategories");
            if (isset($result['faultstring'])) {
                return redirect()->route('adminDashboard')->withError($result['faultstring']);
            }
            $categories = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $categories));
        }catch (Exception $e){
            Log::error("getAllItemCategories Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'category List', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response;
    }
}
