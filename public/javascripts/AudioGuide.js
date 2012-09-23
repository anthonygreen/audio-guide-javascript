function AudioGuide(mediaLibrary, mediaPlayer) {
  this.mediaLibrary = mediaLibrary;
  this.mediaPlayer = mediaPlayer;
  this.isPlaying = false;
  this.pendingLocation = null;
}

AudioGuide.prototype.locationChanged = function(newLocation) {
  
  if (this.isPlaying) {
    this.pendingLocation = newLocation;
  } else {
    this.mediaPlayer.play(this.mediaLibrary.trackFor(newLocation));
    this.isPlaying = true;
  }
  
};

AudioGuide.prototype.trackFinished = function() {
  if (this.pendingLocation) {
    this.mediaPlayer.play(this.mediaLibrary.trackFor(this.pendingLocation))
   } else {
     this.isPlaying = false;
   }
};
  



