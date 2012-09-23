describe("AudioGuide", function() {

  var mediaLibrary = { trackFor: function() {} } 
  var firstLocation = new Location("First location");
  var nextLocation =  new Location("Next location");
  var finalLocation =  new Location("Final location");
  var firstTrack = new Track("First Track");
  var nextTrack = new Track("Next Track");
  var finalTrack = new Track("Final Track");

  stub = sinon.stub(mediaLibrary, 'trackFor');
  stub.withArgs(firstLocation).returns(firstTrack);
  stub.withArgs(nextLocation).returns(nextTrack);
  stub.withArgs(finalLocation).returns(finalTrack);
  
  beforeEach(function() {    
    mediaPlayer = sinon.mock({ play: function(track) {} }) ;
    guide = new AudioGuide(mediaLibrary, mediaPlayer.object);
  });

  it("plays media track for initial location", function() {

    mediaPlayer.expects("play").withArgs(firstTrack);
    
    guide.locationChanged(firstLocation);
    
    mediaPlayer.verify();
      
  });
  
  
  it("waits for current track to finish before playing track for new location", function() {

    mediaPlayer.expects("play").withArgs(firstTrack);
    
    guide.locationChanged(firstLocation);
    
    mediaPlayer.expects("play").withArgs(nextTrack);

    guide.trackFinished();  
    
    guide.locationChanged(nextLocation);
    
    mediaPlayer.verify();
   
  });
  
  it("waits for location to change before playing another track after track finishes", function() {
    
    mediaPlayer.expects("play").withArgs(firstTrack);
    guide.locationChanged(firstLocation);

    guide.trackFinished();
    
    mediaPlayer.expects("play").once().withArgs(nextTrack);
    
    guide.locationChanged(nextLocation);
    
    mediaPlayer.verify();
        
  });
  
  it("plays track for current location when user passes through more than one location while track is playing", function() {
    
    mediaPlayer.expects("play").withArgs(firstTrack);
    guide.locationChanged(firstLocation);

    guide.locationChanged(nextLocation);
    guide.locationChanged(finalLocation);
    
    mediaPlayer.expects("play").withArgs(finalTrack);
    
    guide.trackFinished();
            
  });
  
});