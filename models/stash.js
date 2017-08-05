let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let StashSchema = new Schema({
  name: String, // user names the stash item with whatever they like; will have to deal with dups (or don't allow them?)
  primaryFiber: String,
  otherFibers: [String],
  form: String, // roving, top, batt, fleece, locks, etc. -- use a pulldown
  fiberState: String, // applies only to fleece & locks: raw/unwashed or washed
  blendInfo: String, // this needs to be an array or a pulldown!
  units: Number, // lbs, oz, grams, etc.
  howManyUnits: Number, // do i care about package size? e.g., 4oz. braid?
  colorFamily: String, // use a pulldown
  colorDetails: String, // this might be an array, too
  dyed: String, // natural or synthetic or undyed
  glitz: Boolean, 
  noils: Boolean, // or neps, or other non-glitzy chunky stuff
  notes: String,
});

let Stash = mongoose.model('Stash', StashSchema);

module.exports = Stash;
