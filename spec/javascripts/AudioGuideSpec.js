describe("AudioGuide", function() {

  var mediaLibrary = { trackFor: function() {} } 
  var mediaPlayer = sinon.mock({ play: function(track) {} }) ;
  
  var firstLocation = new Location("First location");
  var nextLocation =  new Location("Next location");
  var lastLocation =  new Location("Last location");
  var firstTrack = new Track("Track for first location");
  var nextTrack = new Track("Track for next location");
  var lastTrack = new Track("Track for last location");

  stub = sinon.stub(mediaLibrary, 'trackFor');
  stub.withArgs(firstLocation).returns(firstTrack);
  stub.withArgs(nextLocation).returns(nextTrack);
  stub.withArgs(lastLocation).returns(lastTrack);
  
  var guide;
  
  
  beforeEach(function() {
    guide = new AudioGuide(mediaLibrary, mediaPlayer.object);
  });

  it("plays media track for initial location", function() {
    
    mediaPlayer.expects("play").withArgs(firstTrack);
    
    guide.locationChanged(firstLocation);
    
    mediaPlayer.verify();
      
  });
  
  it("waits for current track to finish before playing track for new location", function() {
    
    mediaPlayer.expects("play").withArgs(firstTrack);
    mediaPlayer.expects("play").withArgs(nextTrack);
    
    guide.locationChanged(firstLocation);
      
    guide.locationChanged(nextLocation);
    guide.trackFinished();
      
     mediaPlayer.verify();
   
  });
    
});