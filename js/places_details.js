//getting places details

const request = {
  placeId: [],
};

service = new google.maps.places.PlacesService(map);
service.getDetails(request, callback);

function callback(place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place);
  }
}