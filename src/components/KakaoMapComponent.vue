<template>
	<section class="test">
		<div id="map"></div>
	</section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import carOrange from "@/assets/car_orange.png";
import carPurple from "@/assets/car_purple.png";
import AJson from "@/assets/A.json";

const JsApiKey = "42eb1de5521011cb610aa5488dd44d60";
const map = ref(null);
const markers = ref([]);
const latitude = ref(0);
const longitude = ref(0);

//지금은 markerData가 마커 두개의 값으로 들어가는데 이게 A.json 값으로 들어가야하는거잖아.
const markerData = [
	{
		position: [37.54699, 127.09598],
		imageSrc: carOrange,
	},
	{
		position: [37.54799, 127.09698],
		imageSrc: carPurple,
	},
];

const loadKaKaoPostcodeScript = () => {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${JsApiKey}&libraries=services,clusterer&autoload=false`;

		document.head.appendChild(script);
		script.onload = () => {
			window.kakao.maps.load(() => {
				resolve();
			});
		};
		script.onerror = (error) => reject(error);
	});
};

const initMap = () => {
	const container = document.getElementById("map");
	if (!container) return;

	const options = {
		center: new window.kakao.maps.LatLng(latitude.value, longitude.value),
		level: 4,
	};
	map.value = new window.kakao.maps.Map(container, options);
	displayMarkers(markerData); //지금 고정값이 들어감.
	console.log("AJson : " + JSON.stringify(AJson)); //읽어오고 있음.
};

const displayMarkers = (markerData) => {
	if (markers.value.length > 0) {
		markers.value.forEach((marker) => marker.setMap(null));
	}

	const positions = markerData.map(
		(data) =>
			new window.kakao.maps.LatLng(data.position[0], data.position[1])
	);

	if (positions.length > 0) {
		markers.value = markerData.map((data) => {
			const position = new window.kakao.maps.LatLng(
				data.position[0],
				data.position[1]
			);
			const imageSize = new window.kakao.maps.Size(120, 69);
			const imageOption = {
				offset: new window.kakao.maps.Point(20, 50),
			};
			const markerImage = new window.kakao.maps.MarkerImage(
				data.imageSrc,
				imageSize,
				imageOption
			);

			return new window.kakao.maps.Marker({
				map: map.value,
				position,
				image: markerImage,
			});
		});

		const bounds = new window.kakao.maps.LatLngBounds();
		positions.forEach((position) => bounds.extend(position));

		map.value.setBounds(bounds);
	}
};

onMounted(async () => {
	try {
		if (window.kakao && window.kakao.maps) {
			initMap();
		} else {
			await loadKaKaoPostcodeScript();
			initMap();
		}
	} catch (error) {
		console.error(error);
	}
});
</script>

<style scoped>
.test {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

#map {
	width: 1400px;
	height: 1500px;
	border: 1px #a8a8a8 solid;
}
</style>
