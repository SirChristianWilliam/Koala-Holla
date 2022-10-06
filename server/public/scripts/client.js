
console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  $('#viewKoalas').on('click', '#dltBtn', deleteKoala)
  setupClickListeners();
  // load existing koalas on page load
  koalaTransferClick();
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(evt){
    evt.preventDefault();
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
            <td data-id=${x.id}>
              ${x.ready_to_transfer}
              <button class="MTT"> Ready? </button>
            </td>
          <td>${x.notes}</td>
            <td>
              <button id="dltBtn" data-id=${x.id}> Delete </button>
            </td>
      `)
    }
  })
} // end getKoalas

function deleteKoala(evt){
  evt.preventDefault();
  let koalaId = $(this).data('id');
  console.log('in delete koalas', koalaId);
  
  $.ajax({
    method: 'DELETE',
    url:  `/koalas/${koalaId}`,
  }).then((response) => {
    console.log('koala TERMINATED');
    getKoalas();
  }).catch((err) => {
    console.log('error on delete', err);
    res.sendStatus(500);
  });
}

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

function koalaTransferClick() {
  $('#viewKoalas').on('click','.MTT', transferStatus);
}

function transferStatus(evt) {
  evt.preventDefault();
    let koalasId = $(this).parent().data('id');
    console.log($(this).parent().data('id'));
    console.log('clicked "ready?" button', koalasId);

    $.ajax({
      method: 'PUT',
      url: `/koalas/${koalasId}`,
      data: {status: koalasId},
    })
    .then(function (response) {
      getKoalas();
      console.log('err on PUT ready state',response);
    });
}

