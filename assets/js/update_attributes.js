
// creating a user pool object in your app <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var poolData = {
  UserPoolId : _config.cognito.userPoolId, // Your user pool id here
  ClientId : _config.cognito.clientId // Your client id here
};	
// create userPool
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

let cognitoUser = userPool.getCurrentUser();


function updateInformation(){

  $('#updateForm').dialog({
      // autoOpen: false,
      modal: true,
      // resizable: false,
      draggable: false,
      width: 'auto',
      height: 'auto',
      buttons: {
          // first button 
          "Update": function(){
              // ================= update ======================                    
              let attributeList = [];
                // given name
              let dataGivenName = {
                Name: "given_name",
                Value: $('#update_first_name').val()
              }

               var dataFamilyName = {
                  Name : 'family_name', 
                  Value : $('#update_family_name').val(),
              };

                //middle name
                var dataMiddleName = {
                    Name : 'middle_name', 
                    Value : $('#update_middle_name').val(), 
                };

                 //street address
                  var dataAddress = {
                      Name : 'address', 
                      Value : $('#update_address').val(), 
                  };

                  // city
                var dataCity = {
                    Name : 'custom:city', 
                    Value : $('#update_city').val(), 
                };

                //State
                var dataState = {
                    Name : 'custom:state', 
                    Value : $('#update_state').val(), 
                };

                var dataZip = {
                  Name: 'custom:zip',
                  Value: $('#update_zip_code').val()
                };

                //country
                var dataCountry = {
                    Name : 'custom:country', 
                    Value : $('#update_country').val(), 
                };

                //yearsOfService
                var dataYearsOfService = {
                    Name : 'custom:yearsOfService', 
                    Value : $('#update_yearsOfService').val(), 
                };


                   var dataPicture = {
                    Name: 'picture',
                    Value: $('#update_picture').val()
                  };
              //email object
                  var dataEmail = {
                      Name : 'email', 
                      Value : $('#updateEmail').val()
                  };

                  //phone nuber object
                  let phoneNumber = '+' + $('#countryCode').val() + $('#updatePhoneNumber').val()
                  var dataPhoneNumber ={
                      Name: 'phone_number',
                      Value:  phoneNumber
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
                    let attributeEmail          = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
                    let attributePicture        = new AmazonCognitoIdentity.CognitoUserAttribute(dataPicture);
                    let attributePhoneNumber    = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

                  attributeList.push(attributeGivenName);
                  attributeList.push(attributeFamilyName);
                  attributeList.push(attributeMiddleName);
                  attributeList.push(attributeAddress);
                  attributeList.push(attributeCity);
                  attributeList.push(attributeState);
                  attributeList.push(attributeZip);
                  attributeList.push(attributeCountry);
                  attributeList.push(attributeYearsOfService);
                  attributeList.push(attributeEmail);
                  attributeList.push(attributePicture);
                  attributeList.push(attributePhoneNumber);

                cognitoUser.updateAttributes(attributeList, function(err, result) {
                  if (err) {
                    alert(err);
                    return;
                  }
                  // console.log('call result: ' + result);
                });

              $('#updateForm').dialog('close');
              location.reload();

          },
          // second button
          "Cancel": function(){
              $("#updateForm").dialog('close');
              // we can put extra functionality here
          }
      }
  });


  // ========================= Autopopulate fields =================================================
  cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }

            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                for( i = 0; i < result.length; i++){
                    if(result[i].getName() == "given_name"){
                        $('#update_first_name').val(result[i].getValue());
                    }
                    else if(result[i].getName() == "family_name"){
                        $('#update_family_name').val(result[i].getValue());
                    }
                     else if(result[i].getName() == "middle_name"){
                        $('#update_middle_name').val(result[i].getValue());
                    }
                     else if(result[i].getName() == "address"){
                        $('#update_address').val(result[i].getValue());
                    }
                     else if(result[i].getName() == "custom:city"){
                        $('#update_city').val(result[i].getValue());
                    }
                     else if(result[i].getName() == "custom:state"){
                        $('#update_state').val(result[i].getValue());
                    }
                     else if(result[i].getName() == "custom:zip"){
                        $('#update_zip_code').val(result[i].getValue());
                    }
                     else if(result[i].getName() == "custom:country"){
                        $('#update_country').val(result[i].getValue());
                    }
                    else if(result[i].getName() == "picture"){
                        $('#update_picture').val(result[i].getValue());
                    }
                    else if(result[i].getName() == "email"){
                        $('#updateEmail').val(result[i].getValue());
                    }
                    else if(result[i].getName() == "custom:yearsOfService"){
                        $('#update_yearsOfService').val(result[i].getValue());
                    }
                    else if(result[i].getName() == "phone_number"){
                      let phone = result[i].getValue()
                      phone = (phone.slice(2, (result[i].getValue()).length))
                      $('#updatePhoneNumber').val(phone);
                    }
                }
            });			
    });
}
// reset password for autenticated user
function resetPassword(){
  $('#resetPassword').dialog({
      modal: true,
      draggable: false,
      width: 'auto',
      height: 'auto',
      buttons: {
          "Update": function(){
              // autenticate User
            if (cognitoUser != null) {
              cognitoUser.getSession(function(err, session) {
              if (err) {
                alert(err);
                return;
                }
              });
            }
            // end autenticate user
            let = oldPassword = $('#oldPassword').val();
            let newPassword = document.getElementById("newPassword").value;
            if(newPassword === document.getElementById("newPasswordCheck").value){
              cognitoUser.changePassword(oldPassword, newPassword, function(err, result){
                if(err){
                  alert(err)
                  return;
                }
                console.log('call result: ' + result)
                $("#resetPassword").dialog('close');
              })
            }
            else{
              alert("New Password and retyped password does not match please try again");
            }
          },
          "Cancel": function(){
            $("#resetPassword").dialog('close');
          }
      }
  })
  
}