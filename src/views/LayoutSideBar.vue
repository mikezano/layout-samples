<template>
	<div class="layout-sidebar">
		<DropDown :items="items" @selectionMade="selectionMade"/>
		<DropDownCheckbox :items="fruitItems"/>
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
export default class Home extends Vue {
	// public selectedFruit: IFruit = {
	// 	userId: 0,
	// 	id: 0,
	// 	title: '',
	// 	completed: false,
	// };
	public fruitItems: IFruit[] = [];

	public mounted() {
		this.dataCalls();
		//this.selectedLocation;
	}

	//public selectionMade(todo: ITodo) {
	//this.selectedLocation = todo;
	//console.log(this.selectedLocation);
	//}

	public async dataCalls() {
		const data: IFruit[] = await restHttp.http(
			'https://my-json-server.typicode.com/mikezano/zson/fruits',
		);
		console.log(data);
		this.fruitItems = data;
	}
}
</script>
