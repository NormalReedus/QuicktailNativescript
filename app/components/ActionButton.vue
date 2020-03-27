<template>
	<StackLayout class="fab-button" @tap="" @touch="">
		<GridLayout rows="2, auto" horizontalAlignment="center" class="fab-icon" :class="buttonAnimation">
			<Label row="1" class="fab-dash--1" />
			<Label row="1" class="fab-dash--2" />
		</GridLayout>
	</StackLayout>
</template>

<script>
	export default {
		name: 'ActionButton'
		
	}
</script>

<style lang="scss" scoped>
.fab-button {
		width: 56;
		height: 56;
		background-color: orangered;
		border-radius: 28;
		vertical-align: center;
}

.fab-icon {
		height: 16;
		width: 16;
}

.fab-dash--1, .fab-dash--2 {
		background-color: #fff;
		transform: translate(0, -2);
		height: 16;
		width: 3;
	}

	.fab-dash--1 {
		transform: rotate(90deg) translate(0, -2);
	}


</style>