<template>
	<div class="labor-constraint">
		<DropDown :items="items" @selectionMade="selectionMade"/>
		<DropDownCheckbox :items="items"/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DropDown from '@/components/DropDown.vue'; // @ is an alias to /src
import DropDownCheckbox from '@/components/DropDownCheckbox.vue';
import * as restHttp from '@/http';
import ITodo from '@/models/ITodo';

@Component({
	components: {
		DropDown,
		DropDownCheckbox,
	},
})
export default class Home extends Vue {
	public selectedLocation: ITodo = {
		userId: 0,
		id: 0,
		title: '',
		completed: false,
	};
	public items: ITodo[] = [];

	public mounted() {
		this.dataCalls();
		this.selectedLocation;
	}

	public selectionMade(todo: ITodo) {
		this.selectedLocation = todo;
		console.log(this.selectedLocation);
	}

	public async dataCalls() {
		const data = await restHttp.http(
			'https://jsonplaceholder.typicode.com/todos',
		);
		console.log(data);
		this.items = data;
	}
}
</script>
