function Location(name){
  this.name = name;
}

Location.prototype.equals = function(otherLocation) {
  return (this == otherLocation);
};