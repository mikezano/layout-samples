<template>
	<div class="dropdown">
		<div class="dropdown__selecteditem" @click="toggleList()">{{selectedItem.name}}</div>
		<ul class="dropdown__list" v-show="isShowing">
			<li
				v-for="item in items"
				:title="item.name"
				:value="item.id"
				:key="item.id"
				class="dropdown__item"
				:data-id="item.id"
			>
				<input type="checkbox" :id="item.id" @change="toggleOption($event)">
				<label :for="item.id">{{item.name}}</label>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { IDropDownItem } from '@/models/IModels.ts';

@Component({
	components: {
		HelloWorld,
	},
})
export default class DropDown extends Vue {
	public selectedItem: IDropDownItem = {
		id: 0,
		name: 'Selected item',
	};
	public isShowing: boolean = false;
	public selectedItems: IDropDownItem[] = [];

	@Prop() public items!: IDropDownItem[];

	toggleList() {
		this.isShowing = !this.isShowing;
	}

	toggleOption(event: Event) {
		const element = event.target as HTMLInputElement;
		const isChecked = element.checked;
		const id = element.getAttribute('id');
		const item = this.items.filter(x => x.id == Number(id))[0];

		if (isChecked) {
			this.selectedItems.push(item);
		} else {
			const index = this.selectedItems.indexOf(item);
			this.selectedItems.splice(index, 1);
		}

		this.$emit('onSelectedItemsChanged', this.selectedItems);
	}
}
</script>

<style lang="scss" scoped>
.dropdown {
	$border-size: 0.1rem;
	$padding-size: 0.4rem;
	$height: 1rem;

	width: 20rem;
	position: relative;
	box-sizing: border-box;

	&__selecteditem {
		border: $border-size solid gray;
		background-color: lightgray;
		height: $height;
		padding: $padding-size 0;
	}

	&__list {
		list-style-type: none;
		padding: 0;
		margin: 0;
		text-align: left;
		max-height: 20rem;
		overflow-y: auto;
		position: absolute;
		border: $border-size solid gray;
		width: 100%;
		top: $height + ($border-size) + ($padding-size * 2);
		box-sizing: border-box;
		background-color: whitesmoke;
		box-shadow: 0 1rem 1rem hsla(0, 0%, 0%, 0.2);
	}

	&__item {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
</style>