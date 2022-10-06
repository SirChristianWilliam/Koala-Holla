
console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  koalaTransferClick();
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
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
              <button id="dltBtn"> Delete </button>
            </td>
      `)
    }
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}

function koalaTransferClick() {
  $('#viewKoalas').on('click','.MTT', transferStatus);
}

function transferStatus() {
    let koalasId = $(this).parent().data('id');
    console.log($(this).parent().data('id'));
    console.log('clicked "ready?" button', koalasId);

    $.ajax({
      method: 'PUT',
      url: `/koalas/${koalasId}`,
      data: {status: koalasId},
    })
    .then(function (response) {
      console.log('err on PUT ready state',response);
    });
}

