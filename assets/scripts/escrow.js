$(document).ready(function() {
  // const $().val();

  let clientAccount;
  let amount;
  let freelancerAccount;

  $("#create").click(function() {
    clientAccount = $("#clientAddress").val();
    amount = $("#amount").val();
    console.log(clientAccount + " : " + amount);
    $.post('/create', {account: clientAccount, amount: amount}, function(response) {
      console.log("sent")
    })
  });

  $("#complete").click(function() {
    freelancerAccount = $("#freelancerAddress");
    console.log(freelancerAccount);

  });

  $("#terminate").click(function() {

  });

});
