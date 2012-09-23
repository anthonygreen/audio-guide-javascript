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
  
  
  it("reports when location changes", function() {
		var position1 = new Position(1,2);
		var position2 = new Position(3,4);
		var location1 = new Location("South Kensington");
		var location2 = new Location("Gloucester Road");
    var listener = sinon.mock({ locationChanged: function() {} }); 
    
    var reverseGeocoder = new ReverseGeocoder;
    
    var stub = sinon.stub(reverseGeocoder, 'locationOf');
    stub.withArgs(position1).returns(location1);
    stub.withArgs(position2).returns(location2);
    
    listener.expects('locationChanged').withArgs(location1).once();
    listener.expects('locationChanged').withArgs(location2).once();
    
    var tracker = new LocationTracker(reverseGeocoder, listener.object);
    
    tracker.positionChanged(position1);
    tracker.positionChanged(position2);
    
    listener.verify();
    
  });
  
  it("does not report when location stays the same", function() {
		var position1 = new Position(1,2);
		var position2 = new Position(3,4);
		var location = new Location("South Kensington");
    var listener = sinon.mock({ locationChanged: function() {} }); 

    var reverseGeocoder = new ReverseGeocoder;
    
    var stub = sinon.stub(reverseGeocoder, 'locationOf');
    stub.withArgs(position1).returns(location);
    stub.withArgs(position2).returns(location);
    
    listener.expects('locationChanged').withArgs(location).once();
    
    var tracker = new LocationTracker(reverseGeocoder, listener.object);
       
		tracker.positionChanged(position1);
		tracker.positionChanged(position2);    
    
    listener.verify();
    
  });
  
});