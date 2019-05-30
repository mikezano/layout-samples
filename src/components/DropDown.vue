<template>
	<select v-model="selectedItem" v-if="items != null" @change="onChange($event)">
		<option disabled value>Select Location</option>
		<option v-for="item in items" :value="item.id" :key="item.id">{{item.title}}</option>
	</select>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import ITodo from '@/models/ITodo';

@Component({
	components: {
		HelloWorld,
	},
})
export default class DropDown extends Vue {
	public selected: string = '';

	public selectedItem: ITodo = {
		userId: 0,
		id: 0,
		title: '',
		completed: false,
	};
	@Prop() public items!: any[];

	onChange(event: Event) {
		this.$emit('selectionMade', this.selectedItem);
	}
}
</script>

<style lang="scss" scoped>
select {
	background-color: yellow;
	border: 0.1rem solid gray;
	border-radius: 1rem;
	padding: 0.2rem;
}
</style>

