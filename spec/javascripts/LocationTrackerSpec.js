describe("LocationTracker", function() {
  
  beforeEach(function() { 
  });
  
  it("reports when first location discovered", function() {
    var position = new Position(1,2);
    var location = new Location("South Kensington");
    var listener = sinon.mock({ locationChanged: function() {} }); 
    var reverseGeocoder = new ReverseGeocoder;
    
     
    sinon.stub(reverseGeocoder, 'locationOf').withArgs(position).returns(location);
         
    listener.expects('locationChanged').withArgs(location);
    
    
    var tracker = new LocationTracker(reverseGeocoder, listener.object);
    
      
    tracker.positionChanged(position);
    
    listener.verify();
  });
  
  
  
  
});