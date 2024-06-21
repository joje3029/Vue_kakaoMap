<template>
	<Kakaomap />
</template>

<script>
import Kakaomap from "./components/KakaoMapComponent.vue";

export default {
	name: "App",
	components: {
		Kakaomap,
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
