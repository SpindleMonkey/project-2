
$(document).ready(function() {
  console.log('running!');

  /*
   * get the user's current inventory and display it
   */

  $.ajax({
    method: 'GET',
    url: '/api/user',
    success: handleSuccess,
    error: handleError
  });

  function renderStash(stash) {
    console.log('renderStash');
    console.log(stash);
    //console.log(stash.local);

    // build up the HTML needed to dispay this item from the stash
    // and include the _id so we can display all the stash info if user wants it
    let stashHtml = '<button type="button" class="list-group-item view-details" id="' + stash._id + 
      '">' + stash.item;

    $('.list-group').append(stashHtml);
  }

  function handleSuccess(json) {
    console.log('handleSuccess');
    //console.log(json);

    // dump the inventory to inventory.ejs
    if (json.inventory.length > 0) {
      json.inventory.forEach(function(stash) {
        renderStash(stash);
      });
    }
  }

  function handleError() {
    console.log('failed to get stash');
    $('#inventory').text('failed to get stash. sorry.');
  }


  /*
   * get the list of breed names to build the primary dropdown in the 'add to stash' form
   */

  $.ajax({
    method: 'GET',
    url: '/api/breed',
    success: handleGetSheepSuccess,
    error: handleGetSheepError
  });

  function renderBreedOptions(breeds) {
    console.log('renderBreedOptions');
    //console.log(breeds);

    // build up the HTML needed to fill the primary fiber dropdown
    let breedHtml = '';
    for (let i = 0; i < breeds.length; i++) {
      // Set the Mystery White Sheep as the efault (this is readable, but not the most efficient>
      if (breeds[i] == 'Mystery White Sheep') {
        breedHtml = breedHtml + '<option value"' + breeds[i] + '" selected>' + breeds[i] + '</option>';
      } else {
        breedHtml = breedHtml + '<option value"' + breeds[i] + '">' + breeds[i] + '</option>';
      }
    }

    //console.log(breedHtml);

    $('#primary').append(breedHtml);
  }

  function handleGetSheepSuccess(json) {
    console.log('handleGetSheepSuccess');
    //console.log(json);

    renderBreedOptions(json);
  }

  function handleGetSheepError() {
    console.log('failed to get list of breeds. sorry.');
  }



  /*
   * add a new stash item to a user's inventory
   */

  $('form').on('submit', function(event) {
    event.preventDefault();

    // grab all the data from the form
    let otherArray = $('#others').val().split(', ');

    let newStashItem = {
      item: $('#item').val(),
      primaryFiber: $('#primary').val(),
      otherFibers: otherArray,
      form: $('#fiberForm').val(),
      blendInfo: $('#blend').val(),
      units: $('#units').val(), 
      howManyUnits: $('#quantity').val(), 
      colorFamily: $('#colorFamily').val(), 
      dyed: $('input[name=dyeState]:checked').val(), 
      glitz: $('input[name=glitz]:checked').val(),
      noils: $('input[name=noils]:checked').val(), 
      notes: $('#notes').val(),
    };

    // let str = JSON.stringify(newStashItem);
    // console.log(str);

    $.ajax({
      method: 'POST',
      url: '/api/user/stash',
      data: newStashItem,
      success: handlePostSuccess,
      error: handlePostError
    });

    // clear the form
    $(this)[0].reset();
  });

  function handlePostSuccess(json) {
    console.log(json);
    // get the updated user info
      // get the new album info
    $.ajax({
      method: 'GET',
      url: 'api/user',
      success: handleUpdatedUserSuccess,
      error: handleUpdatedUserError
    });

  }

  function handlePostError(json) {
    console.log('failed to add stash. sorry.');
  }

  function handleUpdatedUserSuccess(json) {
    console.log(json);
    // the new stash was added to the end of the inventory
    renderStash(json.inventory[json.inventory.length - 1]);
  }

  function handleUpdatedUserError(json) {
    console.log('failed to get updated inventory. sorry.');
  }



  /*
   * button handler to show stash details
   */

  $('.view-details').on('click', function(event){
    console.log('stash item clicked');
    let idClicked = event.target.id;
    console.log(idClicked);
  });

});
