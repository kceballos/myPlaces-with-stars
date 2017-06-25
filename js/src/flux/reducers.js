import {init} from '../firebase'
const firebase = init()

export function savePlaces(oldStore, options) {
	const {place} = options; // {place: place}
	return firebase.database().ref('places/' + place.place_id).set({
      	formatted_address: place.formatted_address,
	    name: place.name || "A place has no name", 
	    lat: place.lat,
	    lng: place.lng,
    		})
		.then((data) => {
			const {PLACES} = oldStore;
			PLACES[place.place_id] = {
		      	formatted_address: place.formatted_address,
			    name: place.name || "A place has no name", 
			    lat: place.lat,
			    lng: place.lng,
		    	}
			return Object.assign({}, oldStore, {
				
			});
		})
}

export function loadPlaces(oldStore, options){
	return firebase.database().ref('places').once('value')
		.then((data) => {
			// console.log(data.val())
			return Object.assign({}, oldStore, {
				PLACES: data.val()
			});
		})
}



// export function savePlaces(oldStore, options) {
//     const {place} = oldStore;
//     return Promise.resolve().then(_ => {
//         return Object.assign({}, oldStore, {
//             savePlaces
//         });
//     });
// }



