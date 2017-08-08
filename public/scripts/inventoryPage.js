
$(document).ready(function() {
  //console.log('running!');

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
    //console.log('renderStash');
    //console.log(stash);
    //console.log(stash.local);

    // build up the HTML needed to display this item from the stash plus the HTML 
    // needed to collapse/uncollapse each stash item (uncollapsed shows details of stash)
    let stashHtml = '<button type="button" class="btn btn-primary btn-block active"' +
      ' data-toggle="collapse" data-target="#collapse' + stash._id + 
      '" aria-expanded="false" aria-controls="collapse' + stash._id + '">' +
      stash.item + '</button>';

    let others = stash.otherFibers.join(', ');
    //console.log('others: ' + others);
    if (others === '') {
      others = 'none';
    }
    //console.log('others: ' + others);

    //console.log(others);
    stashHtml = stashHtml + '<div class="collapse" id="collapse' + stash._id + '">' +
      '<div class="well">' +
      ' <strong>Primary fiber:</strong> ' + stash.primaryFiber + '<br>' +
      ' <strong>Other fibers:</strong> ' + others + '<br>' +
      ' <strong>Blend?</strong> ' + stash.blendInfo + '<br>' +
      ' <strong>Amount:</strong> ' + stash.howManyUnits + ' ' + stash.units + '<br>' +
      ' <strong>Color family:</strong> ' + stash.colorFamily + '<br>' +
      ' <strong>Dyed?</strong> ' + stash.dyed + '<br>' +
      ' <strong>Glitz?</strong> ' + stash.glitz + '<br>' +
      ' <strong>Noils?</strong> ' + stash.noils + '<br>' +
      ' <strong>Notes:</strong> ' + stash.notes + '<br>' +
      '<button type="button" class="btn btn-default pull-right" aria-label="remove">' +
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +
      '</button>' +
      '<button type="button" class="btn btn-default pull-right" aria-label="edit">' +
      '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
      '</button>' +
      '</div></div>';

    //console.log(stashHtml);

    $('.list-group').append(stashHtml);
  }

  // the user object was retrieved successfully, so we have the inventory
  function handleSuccess(json) {
    //console.log('handleSuccess');
    //console.log(json);

    // but first, let's show the user's avatar
    let avatar = json.avatar || 'images/aSheep6.png';
    $('#invNav').prepend('<img id="avatar" src="' + avatar + '" alt="user avatar" class="pull-right">');


    // dump the inventory to inventory.ejs
    if (json.inventory.length > 0) {
      json.inventory.forEach(function(stash) {
        renderStash(stash);
      });
    }
  }

  function handleError() {
    //console.log('failed to get stash');
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
    //console.log('renderBreedOptions');
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

  // successfully retrieved the list of breeds
  function handleGetSheepSuccess(json) {
    //console.log('handleGetSheepSuccess');
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
    let otherFluff = $('#others').val().split(', ');

    // form sets defaults for those fields where something is required
    let newStashItem = {
      item: $('#item').val(),
      primaryFiber: $('#primary').val(),
      otherFibers: otherFluff,
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

  // new stash was added successfully, now we need the updated user object
  function handlePostSuccess(json) {
    //console.log(json);
    // get the updated user info
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

  // successfully retrieved the updated user object with the updated inventory
  function handleUpdatedUserSuccess(json) {
    //console.log(json);
    // the new stash was added to the end of the inventory
    renderStash(json.inventory[json.inventory.length - 1]);
  }

  function handleUpdatedUserError(json) {
    console.log('failed to get updated inventory. sorry.');
  }


});
