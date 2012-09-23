describe("AudioGuide", function() {

  var mediaLibrary = { trackFor: function() {} } 
  var mediaPlayer = sinon.mock({ play: function(track) {} }) ;
  
  var firstLocation = new Location("First location");
  var nextLocation =  new Location("Next location");
  var firstTrack = new Track("Track for first location");
  var nextTrack = new Track("Track for next location");
  var lastTrack = new Track("Track for last location");
  var guide;
  
  
  beforeEach(function() {
    sinon.stub(mediaLibrary, 'trackFor').withArgs(firstLocation).returns(firstTrack).withArgs(nextLocation).returns(nextTrack);
    guide = new AudioGuide(mediaLibrary, mediaPlayer.object);
  });

  it("plays media track for initial location", function() {
    
    mediaPlayer.expects("play").withArgs(firstTrack).once();
    
    guide.locationChanged(firstLocation);
    
    mediaPlayer.verify();
  
  });
  
});