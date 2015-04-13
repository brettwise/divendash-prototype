// this is a test

var signupForm = document.getElementById('signup-form');
var signupBtn = document.getElementById('signup-button');
var emailCount = new Firebase("https://testing-form-entry.firebaseio.com/emails/count");
emailCount.child("/").on("value", function(snapshot) {
    var update = document.getElementById('update-me');
    var count = (snapshot.val());
    update.innerHTML = "So far " + count + " people have signed up. You should totally be the next ;-)";
});
var onSignupComplete = function(error) {
signupBtn.disabled = false;
if (error) {
  signupError.innerHTML = 'Sorry. Could not signup.';
  } else {
  incrementCounter();
  analytics.track('Signed Up');
  $('#signup-form').fadeOut(400, function() {
      $(this).html("<h3 classs='subtitle'>+1, got it! We'll be in touch.</h3>").fadeIn(500)
    })  
  }
}
function signup(formObj) {
  var emailStore = new Firebase("https://testing-form-entry.firebaseio.com/emails");
  emailStore.push({
  email: formObj.email.value,
  }, onSignupComplete)
  return false;
}
function incrementCounter() {
    var emailCount = new Firebase("https://testing-form-entry.firebaseio.com/emails/count");
    emailCount.transaction(function (current_value) {
        return current_value+1;
        });
}