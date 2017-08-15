
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
      'id="fiber' + stash._id + '"' +
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
      '<button type="button" data-id="' + stash._id + '" class="btn btn-default pull-right trash" aria-label="remove">' +
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +
      '</button>' +
      '<button type="button" data-id="' + stash._id + '" class="btn btn-default pull-right pencil" aria-label="edit">' +
      '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>' +
      '</button>' +
      '</div></div>';

    //console.log(stashHtml);

    $('.list-group').append(stashHtml);
  }

  function displayInventory(userInfo) {
    // dump the inventory to inventory.ejs
    if (userInfo.inventory.length > 0) {
      userInfo.inventory.forEach(function(stash) {
        renderStash(stash);
      });
    }
  }

  // the user object was retrieved successfully, so we have the inventory
  function handleSuccess(json) {
    //console.log('handleSuccess');
    //console.log(json);

    // but first, let's show the user's avatar
    let avatar = json.avatar || 'images/aSheep6.png';
    $('#invNav').prepend('<img id="avatar" src="' + avatar + '" alt="user avatar" class="pull-right">');

    displayInventory(json);
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

    // move back to the top of the page after adding new stash since the form
    // may be longer than the inventory
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  }

  function handleUpdatedUserError(json) {
    console.log('failed to get updated inventory. sorry.');
  }


  /*
   * Event handler for removing stash items
   */

  $('.list-group').on('click', '.trash', function(event) {
    //console.log('in the trash button click event handler!');
    //console.log($(this).data('id'));

    let theUrl = '/api/user/stash/' + $(this).data('id');
    /console.log(theUrl);

    $.ajax({
      method: 'DELETE',
      url: theUrl,
      success: handleDeleteSuccess,
      error: handleDeleteError
    });

  });

  function handleDeleteSuccess(json) {
    //console.log('stash item was deleted');
    //console.log(json);

    // now need to remove that stash item from the displayed list...
    // get the updated user info (which includes the updated album list!)
    $.ajax({
      method: 'GET',
      url: '/api/user',
      success: handleUpdatedStashDeleteSuccess,
      error: handleUpdatedStashDeleteError
    });
  }

  function handleDeleteError(json) {
    console.log('could not delete that stash item. sorry.');
  }

  function handleUpdatedStashDeleteSuccess(json) {
    // delete the current out-of-date list
    $('.list-group').empty();

    // re-render the inventory list
    displayInventory(json);
  }

  function handleUpdatedStashDeleteError(json) {
    console.log('could not get the updated inventory. sorry.');
  }


  /*
   * Event handler for updating stash items
   */

  $('.list-group').on('click', '.pencil', function(event) {
    console.log('in the pencil button click event handler!');
    console.log($(this).data('id'));
  });


});
