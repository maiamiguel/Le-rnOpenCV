/*

*/

function validateForm() {
    $('#email_alert').css("visibility", "hidden");
    $('#password_confirm_alert').css("visibility", "hidden");
    var username = document.forms["register_form"]["username_input"].value;
    var fname = document.forms["register_form"]["firstname_input"].value;
    var lname = document.forms["register_form"]["lastname_input"].value;
    var pwd = document.forms["register_form"]["pwd_input"].value;
    var pwd_cnf = document.forms["register_form"]["pwd_input_confirm"].value;
    var email = document.forms["register_form"]["email_input"].value;
    var check = true;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
        check = false;
        console.log("CHECK failed email");
        $('#email_alert').css("visibility", "visible");
        return false;
    }

    if(pwd != pwd_cnf)
    {
        check = false;
        console.log("CHECK failed password");
        $('#password_confirm_alert').css("visibility", "visible");
        return false;
    }
    console.log("CHECK is " + check);
}