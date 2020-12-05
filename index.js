let googleMap



// Initialize and add the map
function initMap() {

	//McMaster university logitude and latitude
	const mcmasterLocation = { lat: 43.26094539110192, lng: -79.91916639360102 };
	
	//Create teh map centered at mcmaster
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 15,
		center: mcmasterLocation,
	});

	
	const marker = new google.maps.Marker({
		position: mcmasterLocation,
		map: map
	})
	
	
	googleMap = map
}


//Fetch Data
async function getAllMarkers(){
	const collection = await firebase.firestore().collection('/Locations').get()
	const markers = []
	
	collection.forEach( doc => {
		markers.push( doc.data() )
		
		const marker = new google.maps.Marker({
			position: {
				lat: parseFloat( doc.data().lat ), 
				lng: parseFloat( doc.data().long )
			},
			
			map: googleMap
		})
		
	})
	
	console.log(markers)
	return markers
}



//Create an entry in the DB
async function saveLocation(){
	
	const lat = document.getElementById('latTextBox').value
	const long = document.getElementById('longTextBox').value
	
	try{
		const x = parseFloat(lat)
		const y = parseFloat(long)
		
		if(isNaN(x) || isNaN(y)){
			console.error('Invalid Input')
			return
		}
	}catch(err){
		console.error('Invalid Input')
		return
	}
	
	await firebase.firestore().collection('/Locations').add({
		long: long, 
		lat: lat
	})
}