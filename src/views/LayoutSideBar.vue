<template>
	<div class="layout-sidebar">
		<section class="sidebar">
			<DropDownCheckbox label="Fruit" :items="fruitItems" @onSelectedItemsChanged="setSelectedFruits"/>
		</section>
		<section class="content"></section>

		<ul>
			<li v-for="fruit in selectedFruits" :key="fruit.id">{{fruit.icon}}</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DropDown from '@/components/DropDown.vue'; // @ is an alias to /src
import DropDownCheckbox from '@/components/DropDownCheckbox.vue';
import * as restHttp from '@/http';
import { IFruit } from '@/models/IModels.ts';

@Component({
	components: {
		DropDown,
		DropDownCheckbox,
	},
})
export default class LayoutSideBar extends Vue {
	public fruitItems: IFruit[] = [];
	public selectedFruits: IFruit[] = [];

	public created() {
		this.dataCalls();
	}

	public setSelectedFruits(fruits: IFruit[]) {
		this.selectedFruits = fruits;
	}

	public async dataCalls() {
		const data: IFruit[] = await restHttp.http(
			'https://my-json-server.typicode.com/mikezano/zson/fruits',
		);
		this.fruitItems = data;
	}
}
</script>

<style lang="scss" scoped>
.layout-sidebar {
	border: 1px solid black;
	height: calc(100vh - 100px);

	display: flex;
	.sidebar {
		width: 10rem;
		border: 1px solid red;
		padding: 1rem;
	}
}
</style>
