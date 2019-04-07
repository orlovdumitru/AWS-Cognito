var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  // creating a user pool object in your app <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  var poolData = {
    UserPoolId : _config.cognito.userPoolId, // Your user pool id here
    ClientId : _config.cognito.clientId // Your client id here
};	
// create userPool
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// register a user/ Sign up for a Yor app ===========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>	

  // After creating a user pool object, users can be signed up for the app. The user's information can be collected through the web UI and used to populate CognitoUserAttribute objects that are passed in the signUp call.

  $("#verificationCodeForm").dialog({autoOpen: false});

function registerButton() {
    let attributeList = [];
    let password;
    let given_name      = document.getElementById("first_name").value;	
    let family_name     = document.getElementById("last_name").value;	
    let middle_name     = document.getElementById("middle_name").value;
    let address         = document.getElementById("address_1").value;
    let address_2       = document.getElementById("address_2").value;
    let city            = document.getElementById("city_name").value;
    let state           = document.getElementById("state_id").value;
    let zip_code        = document.getElementById("zip_code").value;
    let country         = document.getElementById("country_name").value;
    let yearsOfService  = document.getElementById("yearsOfService").value;
    let upi             = document.getElementById("upi_id").value;
    let email           = document.getElementById("email").value;
    let picture         = document.getElementById("picture").value;
    let phoneNumber     = '+' + document.getElementById("countryCode").value + document.getElementById("phoneNumber").value;


    // check if password does match with confirm password
    if (document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        alert("Passwords Do Not Match!")
        throw "Passwords Do Not Match!"
    } else {
        password = document.getElementById("password").value;	
    }
    
    // first name
    var dataGivenName = {
        Name : 'given_name', 
        Value : given_name,
    };

    //last name
    var dataFamilyName = {
        Name : 'family_name', 
        Value : family_name,
    };

    //middle name
    var dataMiddleName = {
        Name : 'middle_name', 
        Value : middle_name, 
    };

    //street address
    var dataAddress = {
        Name : 'address', 
        Value : address, 
    };

    // address 2
    // var dataAddressOptional = {
    //     Name : 'address_2', 
    //     Value : address_2, 
    // };

// city
    var dataCity = {
        Name : 'custom:city', 
        Value : city, 
    };

//State
    var dataState = {
        Name : 'custom:state', 
        Value : state, 
    };

    var dataZip = {
      Name: 'custom:zip',
      Value: zip_code
    };

    //country
    var dataCountry = {
        Name : 'custom:country', 
        Value : country, 
    };

    //yearsOfService
    var dataYearsOfService = {
        Name : 'custom:yearsOfService', 
        Value : yearsOfService, 
    };

    //upi
    var dataUpi = {
        Name : 'custom:upi', 
        Value : upi, 
    };

    //email object
    var dataEmail = {
        Name : 'email', 
        Value : email, //get email from form field
    };

    var dataPicture = {
      Name: 'picture',
      Value: picture
    };

    //phone nuber object
    var dataPhoneNumber ={
        Name: 'phone_number',
        Value: phoneNumber
    };
    
    let attributeGivenName      = new AmazonCognitoIdentity.CognitoUserAttribute(dataGivenName);
    let attributeFamilyName     = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
    let attributeMiddleName     = new AmazonCognitoIdentity.CognitoUserAttribute(dataMiddleName);
    let attributeAddress        = new AmazonCognitoIdentity.CognitoUserAttribute(dataAddress);
    let attributeCity           = new AmazonCognitoIdentity.CognitoUserAttribute(dataCity);
    let attributeState          = new AmazonCognitoIdentity.CognitoUserAttribute(dataState);
    let attributeZip            = new AmazonCognitoIdentity.CognitoUserAttribute(dataZip);
    let attributeCountry        = new AmazonCognitoIdentity.CognitoUserAttribute(dataCountry);
    let attributeYearsOfService = new AmazonCognitoIdentity.CognitoUserAttribute(dataYearsOfService);
    let attributeUpi            = new AmazonCognitoIdentity.CognitoUserAttribute(dataUpi);
    let attributeEmail          = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    let attributePicture        = new AmazonCognitoIdentity.CognitoUserAttribute(dataPicture);
    let attributePhoneNumber    = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

    // let attributeGivenName      = new AmazonCognitoIdentity.CognitoUserAttribute('given_name', given_name);
    // let attributeFamilyName     = new AmazonCognitoIdentity.CognitoUserAttribute('family_name', family_name);
    // let attributeMiddleName     = new AmazonCognitoIdentity.CognitoUserAttribute('middle_name', middle_name);
    // let attributeAddress        = new AmazonCognitoIdentity.CognitoUserAttribute('address', address);
    // let attributeCity           = new AmazonCognitoIdentity.CognitoUserAttribute('custom:city', city);
    // let attributeState          = new AmazonCognitoIdentity.CognitoUserAttribute('custom:state', state);
    // let attributeZip            = new AmazonCognitoIdentity.CognitoUserAttribute('custom:zip', zip_code);
    // let attributeCountry        = new AmazonCognitoIdentity.CognitoUserAttribute('custom:country', country);
    // let attributeYearsOfService = new AmazonCognitoIdentity.CognitoUserAttribute('custom:yearsOfService', yearsOfService);
    // let attributeUpi            = new AmazonCognitoIdentity.CognitoUserAttribute('custom:upi', upi);
    // let attributeEmail          = new AmazonCognitoIdentity.CognitoUserAttribute('email', email);
    // let attributePhoneNumber    = new AmazonCognitoIdentity.CognitoUserAttribute('phone_number', phoneNumber);
    
    //push all attributes to array
    attributeList.push(attributeGivenName);
    attributeList.push(attributeFamilyName);
    attributeList.push(attributeMiddleName);
    attributeList.push(attributeAddress);
    attributeList.push(attributeCity);
    attributeList.push(attributeState);
    attributeList.push(attributeZip);
    attributeList.push(attributeCountry);
    attributeList.push(attributeYearsOfService);
    attributeList.push(attributeUpi);
    attributeList.push(attributeEmail);
    attributeList.push(attributePicture);
    attributeList.push(attributePhoneNumber);
    
    
    // signup user
    userPool.signUp(email, password, attributeList, null, function(err, result){
        if (err) {
            // alert(err.message || JSON.stringify);
            alert(err);
            return;
        }
        let cognitoUser = result.user;
        // console.log('user name is ' + cognitoUser.getUsername());

        $("#verificationCodeForm").dialog("open");

        $("#verificationCodeForm").dialog({
            title: cognitoUser.getUsername() + " check your email for the code",
            autoOpen: false,
            modal: true,
            resizable: false,
            draggable: false,
            width: 400,
            height: 'auto',
            buttons: {
                "Check code": function(){
                    let verificationCode = $('#confirmationCode').val();
                    let cleanCode = verificationCode.toString().trim();
                    if(verificationCode.length > 4){
                        checkVerificationCode(cognitoUser, cleanCode);
                        $("#verificationCodeForm").dialog("close");
                    }
                },
                "Resend code": function(){
                    // resendVerificationCode(cognitoUser);
                    resendVerificationCode(cognitoUser);
                },
                "Cancel" : function(){
                    $("#verificationCodeForm").dialog("close");
                }
            }
           
        })        
    });  
}


// Confirm User ==========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// function checkVerificationCode(cognitoUser, code){
    function checkVerificationCode(cognitoUser, code){
        //get code from input field
    // var confirmationCode = document.getElementById("confirmationCode").value;
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
        alert(err.message || JSON.stringify);
        return;
        }
        console.log('call result: ' + result);
        // userPage();
        window.location = "../../greeting.html";
        });
}



// sign in / Authenticate a User ===============================================================>>>
        // A confirmed user signs in to obtain a session. The session contains an ID token that contains user claims, an access token that is used internally to perform authenticated calls, and a refresh token that is used internally to refresh the session after it expires each hour. For more information about tokens, see Using Tokens with User Pools (p. 191). If sign in is successful, the onSuccess callback is called. If sign in fails, the onFailure callback is called. If sign in requires MFA, the mfaRequired callback is called and you must invoke sendMFACode on the cognitoUser object. The verification code that is received must be passed and the user is then signed in.

function signInBtn() {

	let authenticationData = {
        Username : document.getElementById("userName").value,    // userName form input
        Password : document.getElementById("password").value,    // password form input
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    let userData = {
        Username : authenticationData.Username,
        Pool : userPool
    };
    // let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            
            let accessToken = result.getAccessToken().getJwtToken(); 
            var idToken     = result.idToken.jwtToken;
            window.location = "../../profile.html";
        },
        onFailure: function (err) { 
          alert(err.message || JSON.stringify(err));
          // see line 504 in current document
          if((err.message || JSON.stringify(err)) === "Password reset required for the user" ){
            $('#enter-email').dialog('open');
          };
      },

        // in case we have multifactor authentication
        // mfaRequered: function(codeDeliveryDeatils){
        //     var verificationCode = prompt('Please input verification code' , '');
        //     cognitoUser.sendMFACode(verificationCode, this);
        // }
    });
}

// forgot my password, cod in jQuery  =============================================>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function(){

  // //dialog section for entering email
  // $('#dialog-alert').dialog({
  //     autoOpen: false,
  //     modal: false,
  //     resizable: false,
  //     draggable: false,
  //     width: 400,
  //     height: 'auto',
  //     buttons: {
  //         "Close": function(){
  //             $("#dialog-section").dialog('close');
  //         }
  //     }
  // });

  $('#enter-email').dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      draggable: false,
      width: 400,
      height: 'auto',
      buttons: {
          "Send code": function(){
              let userLogId = $('#dialog-username').val();
              if(userLogId.match(re) || userLogId != null){
                  forgottenPassword(userLogId);
                  $('#enter-email').dialog('close');
              }
          }
      }
  });

  $('#dialog-section').dialog({autoOpen: false})
});


// enter verification code and new password dialog
function forgottenPassword(userLoginId){
  $('#dialog-section').dialog('open');

      let userData = {
          Username: userLoginId,
          Pool : userPool,
      };
      let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
// ===============================================================

    cognitoUser.forgotPassword({

      onSuccess: function (result) {
        $('#dialog-section').dialog('open');
        console.log('call result: ' + result);
        
      },
      onFailure: function(err) {
          alert(err);
      },
      //original 
      //inputVerificationCode(){
      inputVerificationCode: function () {

         //dialog section for entering verification code and new password
        $('#dialog-section').dialog({
          autoOpen: false,
          modal: true,
          resizable: false,
          draggable: false,
          width: 400,
          height: 'auto',
          buttons: {
              // first button 
              "Validate": function(){
                  // ================= Validation ======================                    
                      let verificationCode = document.getElementById("verification-code").value;
                      let newPassword = document.getElementById("reset-password").value;
                      let verifinewPassword = document.getElementById("verification-rest-password").value;
                      
                      if(newPassword != verifinewPassword){
                          alert("Password does not match");
                      }
                      else{
                        cognitoUser.confirmPassword(verificationCode, newPassword, this);
                        $('#dialog-section').dialog('close');
                      }
              },
              // second button
              "Cancel": function(){
                  $("#dialog-section").dialog('close');
                  // we can put extra functionality here
              }
        // end dialog
          
      }
  });
  // ==========================================================

        

          }
      });
  }

  $('#forgot-password').click(function(){
      $('#enter-email').dialog('open');
      return false;
  });


  //     //dialog section for entering verification code and new password
  //     $('#dialog-section').dialog({
  //         autoOpen: false,
  //         modal: true,
  //         resizable: false,
  //         draggable: false,
  //         width: 400,
  //         height: 'auto',
  //         buttons: {
  //             // first button 
  //             "Validate": function(){
  //                 // ================= Validation ======================                    
  //                 // forgot password 
  //                   let userData = {
  //                                 Username: userLoginId,
  //                                 Pool : userPool,
  //                             };
  //                     let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  //                     let verificationCode = document.getElementById("verification-code").value;
  //                     let newPassword = document.getElementById("reset-password").value;
  //                     let verifinewPassword = document.getElementById("verification-rest-password").value;
  //                     if(newPassword != verifinewPassword){
  //                         alert("Password does not match");
  //                     }
  //                     else{
  //                         cognitoUser.forgotPassword({

  //                             onSuccess: function (result) {
  //                                 console.log('call result: ' + result);
  //                                 $('#dialog-section').dialog('close');
  //                             },
  //                             onFailure: function(err) {
  //                                 alert(err);
  //                             },
  //                             //original 
  //                             //inputVerificationCode(){
  //                             inputVerificationCode: function () {
  //                                 cognitoUser.confirmPassword(verificationCode, newPassword, this);
  //                             }
  //                         });
  //                     }
  //                 // end forgot password
  //             },
  //             // second button
  //             "Cancel": function(){
  //                 $("#dialog-section").dialog('close');
  //                 // we can put extra functionality here
  //             }
  //         }
  //     });
  // }

  // $('#forgot-password').click(function(){
  //     $('#enter-email').dialog('open');
  //     return false;
  // });

// end verification code and dialog 
   


// resend confirmation code ===================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function resendVerificationCode(cognitoUser){
  cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
          alert(err);
          return;
      }else{
          // checkVerificationCode(); 
          setTimeout(function(){
              alert("Please check your email");
          }, 3000);
      }
  });

}
 

// sig out  =====================>>>
function signOut(){
  let cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      
      cognitoUser.signOut();
      // cognitoUser.globalSignOut();
      // AWS.config.credentials.clearCachedId();
      window.location = "../../index.html";
    }
    
}



// Delete an Autheticated User / delete account =======================>>>
function deleteUser(){
  let cognitoUser = userPool.getCurrentUser();
   if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());
        });
    }
    cognitoUser.deleteUser(function(err, result){
        if(err){
            alert(err);
        }else{
          // console.log("call result: " + result);
          // AWS.config.credentials.clearCachedId();
          window.location = "../../sorry.html";
        }
    });
}




// Requiring Imported Users to Reset Their Passwords
// The first time each imported user signs in, he or she is required to enter a new password as follows:
// Requiring imported users to reset their passwords
// The user attempts to sign in, providing username and password (via GetAuthenticationDetails or InitiateAuth).
// Amazon Cognito returns PasswordResetRequiredException.
// The app should direct the user into the ForgotPassword flow as outlined in the following procedure:
// The app calls ForgotPassword(username).
// Amazon Cognito sends a code to the verified email or phone number (depending on what you have provided in the .csv file for that user) and indicates to the app where the code was sent in the response to the ForgotPassword request.
// Note
// For sending reset password codes, it is important that your user pool has phone number or email verification turned on.
// The app indicates to the user that a code was sent and where the code was sent, and the app provides a UI to enter the code and a new password.
// The user enters the code and new password in the app.
// The app calls ConfirmForgotPassword(code, password), which, if successful, sets the new password.
// The app should now direct the user to a sign-in page.