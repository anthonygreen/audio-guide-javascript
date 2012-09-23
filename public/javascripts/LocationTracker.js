function LocationTracker(reverseGeocoder, listener) {
	this.reverseGeocoder = reverseGeocoder;
	this.listener = listener;
  this.lastLocation = null;
}

LocationTracker.prototype.positionChanged = function(newPosition) {
  var location = this.reverseGeocoder.locationOf(newPosition);
	if (!location.equals(this.lastLocation)) {
    this.listener.locationChanged(location);
  	this.lastLocation = location;
  }
};