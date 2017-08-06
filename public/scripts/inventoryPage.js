
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
    let stashHtml = '<p>name: ' + stash.inventory.item + '</p>';

    $('#inventory').prepend(stashHtml);
  }

  function handleSuccess(json) {
    console.log('handleSuccess');
    console.log(json);

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


  $("form").on('submit', function(event) {
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

    let str = JSON.stringify(newStashItem);
    console.log(str);

    $.ajax({
      method: 'POST',
      url: '/api/user',
      data: str,
      success: handlePostSuccess,
      error: handlePostError
    });

    // clear the form
    $(this)[0].reset();
  });

  function handlePostSuccess(json) {
    console.log(json);
    // need to add stash to user
    renderStash(json);
  }

  function handlePostError() {
    console.log('failed to add new stash. sorry.');
  }



//   function addStash(req, res, next) {
//   console.log('/addStash');
//   res.render('addStash');
// }

// function postStash(req, res) {
//   console.log('POST /addStash');
//   console.log(req.user);
//   console.log(req.body);

//   if (!req.body.item) {
//     res.status(503).send('cannot add stash item without some kind of name');
//   } else if (!req.body.form) {
//     res.status(503).send('cannot add stash without knowing what form it\'s in');
//   } else {
//     let stashList = req.body.otherFibers ? req.body.otherFibers.split(', ') : ''; 
//     let newStash = new db.Stash({
//       item: req.body.item,
//       primaryFiber: req.body.primaryFiber || 'Mystery Sheep',
//       otherFibers: stashList,
//       form: req.body.form,
//       fiberState: req.body.fiberState || 'roving',
//       blendInfo: req.body.blendInfo || 'not a blend',
//       units: req.body.amountUnits || '',
//       howManyUnits: req.body.quantity || 0,
//       colorFamily: req.body.colorFamily || 'naturals',
//       dyed: req.body.dyed || 'natural color',
//       glitz: req.body.glitz || false, 
//       noils: req.body.noils || false,
//       notes: req.body.notes || '',
//     });

//     db.Stash.create(newStash, function(err, aStash) {
//       if (err) res.status(503).send('cannot create stash for your inventory');
//       db.User.findOneAndUpdate({ 'local.email': req.user.local.email }, req.user.inventory.push(newStash), function(err, updatedUser) {
//         if (err) res.status(503).send('could not add stash to your inventory');
//         res.render('inventory');
//       // theUser.breeds.push(gah! have to find the breed in the db first!)
//       });
//     });

//   }
// }



});
