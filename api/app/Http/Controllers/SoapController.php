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
        // $this->client = new \nusoap_client("http://67.205.185.159:8080/abill/services/apiTwo?wsdl", "true");
        // $this->client->setCredentials("billingadmin;20", "123qwe", "basic");
    }

    public function doLogin(Request $request){
        // try {
        echo 123;
        exit;
            // echo $name = $request->input('username');
            // echo $password = $request->input('password');

//             //call api to get role of login user
//             $client = new \nusoap_client("http://67.205.185.159:8080/abill/services/apiTwo?wsdl", "true", "true");
//             $client->setCredentials("billingadmin;20", "123qwe", "basic");

//             $error = $client->getError();
//             if ($error) {
//                 Log::error("doLogin Error :", ['Error : ' => $error]);
//                 $response = Response::json(array('code' => 201, 'message' => 'category List', 'cause' => $error, 'data' => json_decode("{}")));
//                 return $response;
//             }


//             $result = $client->call("getUserId", array("arg0" => $name));
// //		return $result;
//             if ($client->fault) {
//                 Log::error("doLogin Error :", ['Error : ' => $client->fault]);
//                 $response = Response::json(array('code' => 201, 'message' => '"Opps! Invalid Username."', 'cause' => $client->fault, 'data' => json_decode("{}")));
//                 return $response;
//             } else {
//                 $error = $client->getError();
//                 if ($error) {
//                     Log::error("doLogin Error :", ['Error : ' => $error]);
//                     $response = Response::json(array('code' => 201, 'message' => 'Opps!'.$error, 'cause' => $error, 'data' => json_decode("{}")));
//                     return $response;
//                 } else {
//                     //if name valid then check password

//                     //if password correct then only store in session username n password n role
//                     $userid = $result['return'];
//                     $result = $client->call("getUserWS", array("arg0" => $userid));
//                     if ($client->fault) {
//                         Log::error("doLogin Error :", ['Error : ' => $client->fault]);
//                         $response = Response::json(array('code' => 201, 'message' =>  $client->fault, 'cause' =>"", 'data' => json_decode("{}")));
//                         return $response;
//                     } else {
//                         $actualpassword = $result['return']['password'];

// //                  return $result;
//                         if ($actualpassword == md5($password) || $actualpassword == md5(md5($password))) {
//                             //set session n redirect
//                             $role = $result['return']['role'];
//                             $request->session()->put('name', $name);
//                             $request->session()->put('userid', $userid);
//                             $request->session()->put('role', $role);
//                             if ($role == "Customer") {
//                                 return redirect()->route('consumerDashboard')->withInfo("Welcome to Abill Dashboard.");
//                             } else if ($role == "Agent") {
//                                 return redirect()->route('agentdashboard')->withInfo("Welcome to Abill Dashboard.");
//                             } else if ($role == "Super user") {
//                                 Log::info("doLogin info :", ['Info : ' => "Super user"]);
//                                 $response = Response::json(array('code' => 200, 'message' =>  "Login successfully.", 'cause' =>"", 'data' => json_decode("{}")));
//                                 return $response;
//                             }
//                             exit;
//                         }
//                     }

//                 }
//             }

//             Log::info("doLogin Error :", ['info : ' => "Opps! Invalid Username or Password."]);
//             $response = Response::json(array('code' => 201, 'message' =>  "Opps! Invalid Username or Password.", 'cause' =>"", 'data' => json_decode("{}")));
//             return $response;

//         }catch (Exception $e){
//             Log::error("getAllItemCategories Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
//             $response = Response::json(array('code' => 201, 'message' => 'category List', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
//         }
    }

    //======================== Category ============================//
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

    //CREATE CATEGORY
    public function createItemCategory(Request $request){
        try{
            $item=array('description'=>"testing team","orderLineTypeId"=>1);
            $result = $client->call("createItemCategory",array('arg0'=>$item));
            if (isset($result['faultstring'])) {
                    Log::error("createItemCategory Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'category ', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $category = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $category));
        }catch (Exception $e){
            Log::error("createItemCategory Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'category', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }
    
    //DELETE CATEGORY
    public function deleteItemCategory(Request $request){
        try{
            $itemId=$request->input('itemId');
            $result = $client->call("deleteItemCategory", array("arg0" => $itemId));
            if (isset($result['faultstring'])) {
                    Log::error("deleteItemCategory Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'delete category', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $item = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $item));
        }catch (Exception $e){
            Log::error("deleteItemCategory Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'delete category', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //CREATE AGENT
    public function createAgent(Request $request){
        try{
            $username = $request->input('loginname');
            $password = $request->input('password');
            $balance_type = $request->input('balance_type');
            $prefered_type = $request->input('prefered_type');
            $address1 = $request->input('address1');
            $address2 = $request->input('address2');
            $city = $request->input('city');
            $country = $request->input('country');
            $email = $request->input('email');
            $firstname = $request->input('firstname');
            $lastname = $request->input('lastname');
            $organizationname = $request->input('organizationname');
            $notes = $request->input('notes');
            $pincode = $request->input('pincode');
            $state = $request->input('state');
            $currency = $request->input('currency');
            $language = $request->input('language');
            $date=date("Y-m-d\TH:i:s\Z");
                 $phonenumber = $request->input('phonenumber');
            $include=$request->input('include_in_noti');
               if($include=="on")
                    $include="true";
                if($include=="")
                    $include="false";
              $contacttype = $request->input('contacttype');
              $contactdesc="";
              if($contacttype==20){
                $contactdesc="Primary";
              }else{
                $contactdesc="Secondary";
              }
           $user=array(
                "companyName"=>"AMRDemo",
                "contact"=>array("address1"=>$address1,
                                "address2"=>$address2,
                                "city"=>$city,
                                "contactTypeDescr"=>$contactdesc,
                                "contactTypeId"=>$contacttype,
                                "countryCode"=>"IN",
                                "createDate"=>$date,
                                "deleted"=>0,
                                "email"=>$email,
                                "firstName"=>$firstname,
                                "include"=>$include,
                                "lastName"=>$lastname,
                                "organizationName"=>$organizationname,      
                                "postalCode"=>$pincode,
                                "stateProvince"=>$state,
                                "phoneNumber"=>$phonenumber,
                                "phoneAreaCode"=>"079",
                                ),
                "createDatetime"=>$date,
                "deleted"=>0,
                "mainRoleId"=>4,
                "password"=>$password,
                "role"=>"Partner",
                "status"=>"Active",
                "statusId"=>1,
                "userName"=>$username,
                "currencyId"=>20
                   
            );
            $result = $client->call("createUser", array("arg0" => $user));
           if (isset($result['faultstring'])) {
               Log::error("createUser Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'create user', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $categories = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $categories));
         }catch (Exception $e){
            Log::error("createUser Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'Create User', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
    }

     //CREATE CONSUMER
    public function createConsumer(Request $request){
        try{
            $username = $request->input('loginname');
            $password = $request->input('password');
            $balance_type = $request->input('balance_type');
            $prefered_type = $request->input('prefered_type');
            $address1 = $request->input('address1');
            $address2 = $request->input('address2');
            $city = $request->input('city');
            $country = $request->input('country');
            $email = $request->input('email');
            $firstname = $request->input('firstname');
            $lastname = $request->input('lastname');
            $organizationname = $request->input('organizationname');
            $notes = $request->input('notes');
            $pincode = $request->input('pincode');
            $state = $request->input('state');
            $currency = $request->input('currency');
            $language = $request->input('language');
            $date=date("Y-m-d\TH:i:s\Z");
                 $phonenumber = $request->input('phonenumber');
            $include=$request->input('include_in_noti');
               if($include=="on")
                    $include="true";
                if($include=="")
                    $include="false";
              $contacttype = $request->input('contacttype');
              $contactdesc="";
              if($contacttype==20){
                $contactdesc="Primary";
              }else{
                $contactdesc="Secondary";
              }
           $user=array(
                "companyName"=>"AMRDemo",
                "contact"=>array("address1"=>$address1,
                                "address2"=>$address2,
                                "city"=>$city,
                                "contactTypeDescr"=>$contactdesc,
                                "contactTypeId"=>$contacttype,
                                "countryCode"=>"IN",
                                "createDate"=>$date,
                                "deleted"=>0,
                                "email"=>$email,
                                "firstName"=>$firstname,
                                "include"=>$include,
                                "lastName"=>$lastname,
                                "organizationName"=>$organizationname,      
                                "postalCode"=>$pincode,
                                "stateProvince"=>$state,
                                "phoneNumber"=>$phonenumber,
                                "phoneAreaCode"=>"079",
                                ),
                "createDatetime"=>$date,
                "deleted"=>0,
                "mainRoleId"=>5,
                "password"=>$password,
                "role"=>"Customer",
                "status"=>"Active",
                "statusId"=>1,
                "userName"=>$username,
                "currencyId"=>20
                   
            );
            $result = $client->call("createUser", array("arg0" => $user));
           if (isset($result['faultstring'])) {
               Log::error("createUser Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'create user', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $categories = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $categories));
         }catch (Exception $e){
            Log::error("createUser Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'Create User', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
    }

    //GET ACCOUNT DETAILS
    public function getAccountDetail(Request $request){
        try{
            $userId=$request->input('userid');
             $result = $client->call("getUserWS", array("arg0" =>$userId));
            if (isset($result['faultstring'])) {
                 Log::error("getUserWS Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'account details', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $account = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $account));
        }catch (Exception $e){
            Log::error("getUserWS Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'account details', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //GET ALL CONSUMER
    public function getAllConsumer(Request $request){
        try{
            $pageno=$request->input('pageno');
            $result = $this->client->call("getAllCustomers",array("arg0"=>20,"arg1"=>$pageno));
            if (isset($result['faultstring'])) {
                 Log::error("getAllCustomers Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                 $response = Response::json(array('code' => 500, 'message' => 'all consumer', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
                return $response;
            }
            $consumer = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $consumer));
        }catch (Exception $e){
            Log::error("getAllCustomers Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'all consumer', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }
    //GET ALL ORDERS
    public function getAllOrder(Request $request){
        try{
            $pageno=$request->input('pageno');
            $result = $client->call("getLastOrders",array("arg0"=>20,"arg1"=>$pageno));
            if (isset($result['faultstring'])) {
                 Log::error("getLastOrders Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'all order', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $order = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $order));
        }catch (Exception $e){
            Log::error("getLastOrders Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'all order', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }
     //GET ALL INVOICES
    public function getAllInvoice(Request $request){
        try{
            $pageno=$request->input('pageno');
            $result = $client->call("getLastInvoices",array("arg0"=>20,"arg1"=>$pageno));
            if (isset($result['faultstring'])) {
                 Log::error("getLastInvoices Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'all invoice', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $invoice = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $invoice));
        }catch (Exception $e){
            Log::error("getLastInvoices Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'all invoice', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }
     //GET ALL PAYMENT
    public function getAllPayment(Request $request){
        try{
            $pageno=$request->input('pageno');
            $result = $client->call("getLastPayments",array("arg0"=>20,"arg1"=>$pageno));
            if (isset($result['faultstring'])) {
                 Log::error("getLastPayments Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'all payment', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $payment = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $payment));
        }catch (Exception $e){
            Log::error("getLastPayments Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'all payment', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    // ===================== PRODUCTS ===============================//
    //GET ALL PRODUCTS
    public function getAllProduct(){
        try{
            $result = $this->client->call("getAllItems");
            if (isset($result['faultstring'])) {
                 Log::error("getAllItems Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'all poducts', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
                return $response;
            }
            $product = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $product));
        }catch (Exception $e){
            Log::error("getAllItems Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'all poducts', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //GET PARTICULAR PRODUCT DETAIL
    public function getProduct(Request $request){
        try{
            $productId=$request->input('productId');
             $result = $client->call("getItem", array("arg0" =>$productId));
            if (isset($result['faultstring'])) {
                 Log::error("getItem Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'get product details', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $product = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $product));
        }catch (Exception $e){
            Log::error("getItem Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'get product details', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //GET PARTICULAR PRODUCT CATEGORY DETAIL
    public function getItemByCategory(Request $request){
        try{
            $categoryId=$request->input('categoryId');
             $result = $client->call("getItemByCategory", array("arg0" =>$categoryId));
            if (isset($result['faultstring'])) {
                 Log::error("getItemByCategory Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'get category', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $category = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $category));
        }catch (Exception $e){
            Log::error("getItemByCategory Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'get category', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //GENERATE INVOICE FROM ORDER
    public function createInvoiceFromOrder(Request $request){
        try{
            $orderId=$request->input('orderId');
            $result = $client->call("createInvoiceFromOrder", array('arg0'=>$orderId));
            if (isset($result['faultstring'])) {
                 Log::error("createInvoiceFromOrder Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'create invoice from order', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $invoice = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $invoice));
        }catch (Exception $e){
            Log::error("createInvoiceFromOrder Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'create invoice from order', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

     //PARTICULAR ORDER DETAILS
    public function getOrder(Request $request){
        try{
            $orderId=$request->input('orderId');
            $result = $client->call("getOrder", array('arg0'=>$orderId));
            if (isset($result['faultstring'])) {
                 Log::error("getOrder Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'get order', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $order = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $order));
        }catch (Exception $e){
            Log::error("getOrder Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'get order', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //PARTICULAR PAYMENT DETAILS
    public function getPayment(Request $request){
        try{
            $paymentId=$request->input('paymentId');
            $result = $client->call("getPayment", array("arg0" => $paymentId));
            if (isset($result['faultstring'])) {
                 Log::error("getPayment Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'get payment', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $payment = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $payment));
        }catch (Exception $e){
            Log::error("getPayment Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'get payment', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

     //PARTICULAR INVOICES DETAILS
    public function getInvoice(Request $request){
        try{
            $invoiceId=$request->input('invoiceId');
            $result = $client->call("getInvoiceWS", array("arg0" => $invoiceId));
            if (isset($result['faultstring'])) {
                 Log::error("getInvoiceWS Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'get invoice', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $payment = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $payment));
        }catch (Exception $e){
            Log::error("getInvoiceWS Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'get invoice', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }


    //APPLY INVOICE TO PARTICULAR ORDER
    public function applyInvoice(Request $request){
        try{
            $orderId=$request->input('orderId');
             $invoice=array('balance' => 2.0000000000,
                'carriedBalance'=>"0E-10",
                'createDateTime' => "2017-09-21T00:00:00Z",
                'createTimeStamp' => "2018-01-13T09:26:24Z",
                'currencyId' => 20,
                'deleted' => 0,
                'dueDate' => "2017-09-21T00:00:00Z",
                'inProcessPayment' => 1,
                'invoiceLines' => array
                    (
                        'amount' => "2.0000000000",
                        'deleted' => 0,
                        'description' => "Monthly Subscription Period from 01/07/2017 to 31/07/2017",
                        'isPercentage' => 0,
                        'itemId' => 3200,
                        'price' => "2.0000000000",
                        'primaryKey' => 9306,
                        'quantity' => "1.0000000000",
                        'sourceUserId' => 10890,
                    ),

                'isReview' => 0,
                'number' => 29,
                'orders' => 108700,
                'paymentAttempts' => 1,
                'statusDescr'=> "Unpaid",
                'statusId' => 2,
                'toProcess' => 1,
                'total' => "2.0000000000",
                'userId' => 10890,
            );
            $result = $client->call("applyOrderToInvoice",array('arg0'=>$orderId,'arg1'=>$invoice));
            if (isset($result['faultstring'])) {
                 Log::error("applyOrderToInvoice Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'apply invoice', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $invoice = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $invoice));
        }catch (Exception $e){
            Log::error("applyOrderToInvoice Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'apply invoice', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //APPLY PAYMENT TO PARTICULAR INVOICE
    public function applyPayment(Request $request){
        try{
            $invoiceId=$request->input('invoiceId');
             $payment=array(
                'amount' => 522.0000000000,
                'amountAsDecimal' => 522.0000000000,
                'attempt' => 1,
                'balance' => "0E-10",
                'balanceAsDecimal' => 0.0000000000,
                'cheque' => array
                    (
                        'bank' => "ICICI",
                        'date' => "2018-04-12T00:00:00Z",
                        'id' => 1700,
                        'number' => 123453363,
                        'primaryKey' => 1700,
                    ),

                'createDatetime' => "2018-04-12T05:53:48Z",
                'currencyId' => 20,
                'deleted' => 0,
                'id' => 1900,
                'invoiceIds'=> 9805,
                'isPreauth' => 0,
                'isRefund' => 0,
                'method' => "Cheque",
                'methodId' => 1,
                'paymentDate' => "2018-04-12T00:00:00Z",
                'resultId' => 4,
                'updateDatetime' => "2018-04-12T05:53:48Z",
                'userId' => 10890
            );
            $result = $client->call("applyPayment",array('arg0'=>$payment,'arg1'=>$invoiceId));
            if (isset($result['faultstring'])) {
                 Log::error("applyPayment Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'apply payment', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $payment = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $payment));
        }catch (Exception $e){
            Log::error("applyPayment Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'apply payment', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //CREATE ORDER
    public function createOrder(Request $request){
        try{
             $order=array(
                'activeSince' => "2017-07-01T00:00:00Z",
                'billingTypeId' => 2,
                'billingTypeStr' => "post paid",
                'createDate' => "2018-01-13T10:02:28Z",
                'createdBy' => 10810,
                'currencyId' => 20,
                'deleted' => 0,
                'dueDateUnitId' => 3,
                'generatedInvoices' => array
                (
                    'balance' => 2.0000000000,
                    'carriedBalance' => "0E-10",
                    'createDateTime' => "2018-07-08T00:00:00Z",
                    'createTimeStamp' => "2018-07-12T10:04:09Z",
                    'currencyId' => 20,
                    'deleted' => 0,
                    'dueDate' => "2018-07-08T00:00:00Z",
                    'id]'=> 9307,
                    'inProcessPayment' => 1,
                    'invoiceLines' => array
                        (
                            'amount' => 2.0000000000,
                            'deleted' => 0,
                            'description' => "Monthly Subscription Period from 01/07/2017 to 31/07/2017",
                            'id' => 9412,
                            'isPercentage' => 0,
                            'itemId' => 3200,
                            'price' => 2.0000000000,
                            'primaryKey' => 9412,
                            'quantity' => 1.0000000000,
                            'sourceUserId' => 10891,
                        ),

                    'isReview' => 0,
                    'number' => 37,
                    'order' => 108704,
                    'paymentAttempts' => 1,
                    'statusId' => 2,
                    'toProcess' => 1,
                    'total' => 2.0000000000,
                    'userId' => 10891,
                ),

            'id' => 108704,
            'isCurrent' => 0,
            'lastNotified' => "2018-01-13T10:02:51Z",
            'nextBillableDay' => "2017-08-01T00:00:00Z",
            'notesInInvoice' => 0,
            'notify' => 0,
            'orderLines' => array
                (
                    'amount' => 2.0000000000,
                    'amountAsDecimal' => 2.0000000000,
                    'createDatetime' => "2018-01-13T10:02:28Z",
                    'deleted' => 0,
                    'description' => "Monthly Subscription",
                    'editable' => "true",
                    'id' => 208904,
                    'itemId' => 3200,
                    'orderId' => 108704,
                    'price' => 2.0000000000,
                    'priceAsDecimal' => 2.0000000000,
                    'provisioningStatusId' => 2,
                    'quantity' => 1.0000000000,
                    'quantityAsDecimal' => 1.0000000000,
                    'typeId' => 1,
                    'useItem' => "true",
                    'versionNum' => 1,
                ),

            'period' => 200,
            'periodStr' => "Monthly",
            'statusId' => 1,
            'statusStr' => "Active",
            'total' => 2.0000000000,
            'userId' => 10891,
            'versionNum' => 1,
        );
            $result = $client->call("createOrder",array('arg0'=>$order));
            if (isset($result['faultstring'])) {
                 Log::error("createOrder Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'create order ', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $order = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $order));
        }catch (Exception $e){
            Log::error("createOrder Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'create order', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

     //CREATE PAYMENT
    public function createPayment(Request $request){
        try{
            $payment=array(
                'amount' => 522.0000000000,
                'amountAsDecimal' => 522.0000000000,
                'attempt' => 1,
                'balance' => "0E-10",
                'balanceAsDecimal' => 0.0000000000,
                'cheque' => array
                    (
                        'bank' => "ICICI",
                        'date' => "2018-04-12T00:00:00Z",
                        'id' => 1700,
                        'number' => 123453363,
                        'primaryKey' => 1700,
                    ),

                'createDatetime' => "2018-04-12T05:53:48Z",
                'currencyId' => 20,
                'deleted' => 0,
                'id' => 1900,
                'invoiceIds'=> 9805,
                'isPreauth' => 0,
                'isRefund' => 0,
                'method' => "Cheque",
                'methodId' => 1,
                'paymentDate' => "2018-04-12T00:00:00Z",
                'resultId' => 4,
                'updateDatetime' => "2018-04-12T05:53:48Z",
                'userId' => 10890
            ); 
            $result = $client->call("createPayment",array('arg0'=>$payment));
            if (isset($result['faultstring'])) {
                 Log::error("createPayment Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'payment ', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $payment = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $payment));
        }catch (Exception $e){
            Log::error("createPayment Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'payment', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //DELETE ITEM
    public function deleteItem(Request $request){
        try{
            $itemId=$request->input('itemId');
            $result = $client->call("deleteItem", array("arg0" => $itemId));
            if (isset($result['faultstring'])) {
                 Log::error("deleteItem Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'delete item', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $item = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $item));
        }catch (Exception $e){
            Log::error("deleteItem Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'delete item', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //DELETE PAYMENT
    public function deletePayment(Request $request){
        try{
            $paymentId=$request->input('paymentId');
            $result = $client->call("deletePayment", array("arg0" => $itemId));
            if (isset($result['faultstring'])) {
                 Log::error("deletePayment Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'delete payment', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $payment = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record successfully fetched.', 'cause' => '', 'data' => $payment));
        }catch (Exception $e){
            Log::error("deletePayment Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'delete payment', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //UPDATE ITEM
     public function updateItem(Request $request,$id){
        try{
            // $item = $request->except('_token','_method');
            // $item['id'] = $id;
            // $result = $client->call("updateItem", array("arg0" => $item));
            // if (isset($result['faultstring'])) {
            //      Log::error("updateItem Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
            //     $response = Response::json(array('code' => 500, 'message' => 'updateItem', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            // }
            // $item = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record updated successfully.', 'cause' => '', 'data' => $item));
        }catch (Exception $e){
            Log::error("updateItem Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'updateItem', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //UPDATE ITEM CATEGORY
     public function updateItemCategory(Request $request){
        try{
            $item = $request->except('_token','_method');
            $item['id'] = $id;
            $result = $client->call("updateItemCategory", array("arg0" => $item));
            if (isset($result['faultstring'])) {
                 Log::error("updateItemCategory Error :", ['Error : ' => $result['faultstring'], '\nTraceAsString' => $result['faultstring']]);
                $response = Response::json(array('code' => 500, 'message' => 'update item category', 'cause' => $result['faultstring'], 'data' => json_decode("{}")));
            }
            $item = $result['return'];
            $response = Response::json(array('code' => 200, 'message' => 'Record updated successfully.', 'cause' => '', 'data' => $item));
        }catch (Exception $e){
            Log::error("updateItemCategory Error :", ['Error : ' => $e->getMessage(), '\nTraceAsString' => $e->getTraceAsString()]);
            $response = Response::json(array('code' => 201, 'message' => 'update item category', 'cause' => $e->getMessage(), 'data' => json_decode("{}")));
        }
        return $response; 
    }

    //pending api calling pending
    // createInvoice
    // createItem
    // createPaymentLink
    // createSubscription
    // generateCallReport
    // getAgeingESRPDF
    // getAllReportTypes
    // getCallReport
    // getESRPDF
    // getLatestInvoice
    // getLatestPayment
    // getPaperInvoicePDF
    // getUserItemsByCategory
    // payInvoice
    // removePaymentLink
    // updateUser
    // updateUserContact


}
