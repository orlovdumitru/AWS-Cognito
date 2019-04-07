

// user profile page ==================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function(){
    
    let cognitoUser = userPool.getCurrentUser();
    
    if (cognitoUser != null) {
        
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }
            // console.log('session validity: ' + session.isValid());

            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                // console.log(result);

                for( i = 0; i < result.length; i++){
                    if(result[i].getName() == "given_name"){
                        let headgreet = document.getElementById("greetingHead");
                        headgreet.innerHTML = headgreet.innerHTML + result[i].getValue();
                        document.getElementById("first_name").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == 'family_name'){
                      document.getElementById("last_name").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == 'middle_name'){
                      document.getElementById("middle_name").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == 'custom:upi'){
                      document.getElementById("upi").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == 'picture'){
                      $('#profile_picture').attr('src', result[i].getValue())
                    }
                    else if(result[i].getName() == "email"){
                        document.getElementById("userEmail").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == "phone_number"){
                        document.getElementById("phoneNr").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == 'address'){
                      document.getElementById("street").innerHTML = result[i].getValue() ;
                    }
                    else if(result[i].getName() == 'custom:city'){
                      document.getElementById("city_name").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == 'custom:state'){
                      document.getElementById("state_name").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == 'custom:zip'){
                      document.getElementById("zip_code").innerHTML = result[i].getValue();
                    }
                    else if(result[i].getName() == 'custom:country'){
                      document.getElementById("country").innerHTML = result[i].getValue();
                    }
                }
            });			
        });
    }

});

// Retrive Attributes =================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// function retriveAttributes(cognitoUser){
//     congnitoUser.getUserAttributes(function(err, result){
//         if(err){
//             alert(err)
//             return;
//         }
//         for(i = 0; i < result.length; i++){
//             console.log("attibute " + result[i].getName() + " has value " + result[i].getValue());
//         }
//     });
// }
