
console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      gender: $('#genderIn').val(),
      age: $('#ageIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $('#viewKoalas').empty();
  $.ajax({
    method: 'GET',
    url: '/koalas'
  })
  .then(function(response) {
    console.log("GET /addKoala response",response);
    for(let x of response) {
      $('#viewKoalas').append(`
        <tr>
          <td>${x.name}</td>
          <td>${x.gender}</td>
          <td>${x.age}</td>
            <td>
              ${x.ready_to_transfer}
              <button id="MTT"> Ready? </button>
            </td>
          <td>${x.notes}</td>
            <td>
              <button id="dltBtn"> Delete </button>
            </td>
      `)
    }
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function (response) {
    console.log('response from server', response);
    getKoalas();
  }).catch(function (error) {
    console.log('error from POST', error);
  });
}
