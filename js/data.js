var modalUrl = "/ccapp/public/modal";
var userId = "0031U000007J7weQAC";
var url ='http://appserver/get-customer-payment-profiles';
var isTestMode = true;

fetchListOfCards();
function fetchListOfCards(){
  fetch(url).then((response) => {});
}

function getFormData(formID){
  var elements = document.getElementById(formID).elements;

  var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    return obj;
}

function postFormData(postUrl, data){
 var postJson = JSON.stringify(data);

  return fetch(postUrl,{
    method: 'POST', // or 'PUT'
    body: postJson, // data can be `string` or {object}!
    headers:{'Content-Type': 'application/json'}
  }).then(res => res.json());
}

function postCardFromList(cardListPostUrl, data){
  var postJson = JSON.stringify(data);

  return fetch(cardListPostUrl, {
    method: 'POST', // or 'PUT'
    body: postJson, // data can be `string` or {object}!
    headers:{'Content-Type': 'application/json'}
  }).then(res => res.json());
}

function  testSuccessfulResponse(){
  var orderResponse = {charge: "succes", ccNumber: "1111111111", orderNumber: "123445677655", amount: "47.50"};
  return Promise.resolve(orderResponse);
}
