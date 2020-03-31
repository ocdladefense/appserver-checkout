var postUrl = 'appserver/charge-card/';
var cc_FormUrl = "/ccapp/public/cc_form";
var testData = {
  //TESTING CODE
  //$pricebookEntryIds = array();
  //$contactIds = array();
    pricebookEntryId: '01u1U000001tWTwQAM',
    contactId: "0031U000007J7weQAC",
    customerPaymentProfileId:"1832042791",
  // cardNumber: "4242424242424242",
  // expirationDate: "2038-12",
  // cardCode: "142",
  // firstName: "Humpty",
  // lastName: "Dumpty",
  // address: "555 Elm Street",
  // city: "Eugene",
  // state: "OR",
  // zip: "97402",
  // country: "USA",
  // customerType: "individual",
  // validationMode: "liveMode",
    amount: "500.00",
};
var testDataJson = JSON.stringify(testData);

document.addEventListener("click", doWidgetAction, true);

function doPaymentModal(e)
{  
  var target = e.target;
  var contactId= target.dataset.contactId;
  var pricebookEntryId= target.dataset.pricebookEntryId;


  var contactElement = document.createElement("input");
  contactElement.setAttribute("name","contactId");
  contactElement.setAttribute("type","hidden");
  contactElement.setAttribute("value",contactId);

  var pricebookEntryElement = document.createElement("input");
  pricebookEntryElement.setAttribute("name","pricebookEntryId");
  pricebookEntryElement.setAttribute("type","hidden");
  pricebookEntryElement.setAttribute("value",pricebookEntryId);

  window.theModal = new modal();

  theModal.attachModal();
  theModal.loading();
  theModal.fetchHtml(cc_FormUrl).then(function(html){
    theModal.content(html);  
    renderCards().then(function(){
    theModal.stopLoading();
    });
    var addCardForm =document.getElementById("addCardForm");
    addCardForm.appendChild(contactElement);
    addCardForm.appendChild(pricebookEntryElement);
    theModal.showModal(); 
    //doBootstrapValidation();
  });
}


function doWidgetAction(e)
{ 
  var target = e.target;

  if( target.id == "chargeCard"){
    chargeCard();
  } else if(target.id == "purchase"){
    doPaymentModal(e);
  } else if(target.id == "addNewCard"){
    console.log(target);
    chargeNewCard();
  } else
    return false;
}


function chargeNewCard(){
  theModal.loading();
  
  //getFormData returns data
  var data = getFormData("addNewCardForm");

  var responseJson = postFormData(postUrl, data);

  responseJson.then(function(response){

    theModal.stopLoading();

    if (response.chargeStatusResponseCode == 1){
      var html =("<div>" +"charge:"+ response.chargeStatusResponseCode +"</div>" + "<div>" + "amount:" + response.amount +"</div>" + "<div>" + "order number:" + response.orderNumber +"</div>" + "<div>" +"card charged:" + response.ccNumber +"</div>"  );
      theModal.changeContent(html);
    } else {
      var html ="charge unsuccesful";
      theModal.changeContent(html);
    }
  });
}

function chargeCard(){
  
  theModal.loading();
  
    //getFormData returns data
  var data = getFormData("addCardForm");

  var responseJson = postFormData(postUrl, data);  

  console.log(responseJson);

  responseJson.then(function(response){

    theModal.stopLoading();

    if (response.chargeStatusResponseCode == 1){
    var html =("<div>" +"charge:"+ response.chargeStatusResponseCode +"</div>" + "<div>" + "amount:" + response.amount +"</div>" + "<div>" + "order number:" + response.orderNumber +"</div>" + "<div>" +"card charged:" + response.ccNumber +"</div>"  );
    theModal.changeContent(html);
    } else {
      var html ="charge unsuccesful";
      theModal.changeContent(html);
    }
  });
}