
$(document).ready(function() {
  console.log('running!');

  // get the user's current inventory
  $.ajax({
    method: 'GET',
    url: '/api/user',
    success: handleSuccess,
    error: handleError
  });

  function renderStash(stash) {
    console.log('renderStash');
    //console.log(stash);
    //console.log(stash.local);

    // build up the HTML needed to dispay this item from the stash
    let stashHtml = '<p>name: ' + stash.local.email + '</p>';

    $('#inventory').append(stashHtml);
  }

  function handleSuccess(json) {
    console.log('handleSuccess');
    console.log(json);

    // dump the inventory to inventory.ejs
    if (json.inventory.length === 0) {
      $('#inventory').append('<p>Looks like you need to add a few items to your stash!</p>');
    } else {
      json.inventory.forEach(function(stash) {
        renderStash(stash);
      });
    }
  }

  function handleError() {
    console.log('failed to get stash');
    $('#inventory').text('failed to get stash. sorry.');
  }

});
