<template>
	<div class="dropdown">
		<label class="dropdown__label">{{label}}</label>
		<div class="dropdown__selecteditem" @click="toggleList()">
			{{selectedItem.name}}
			<span class="dropdown__caret">&#9660;</span>
		</div>
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

	@Prop() public label: string = 'Label';
	@Prop() public items!: IDropDownItem[];

	public toggleList() {
		this.isShowing = !this.isShowing;
	}

	public toggleOption(event: Event) {
		const element = event.target as HTMLInputElement;
		const isChecked = element.checked;
		const id = element.getAttribute('id');
		const item = this.items.filter(x => x.id === Number(id))[0];

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
	$label-height: $height;
	$color: whitesmoke;

	position: relative;
	box-sizing: border-box;
	text-align: left;

	&__label {
		height: $height;
		font-weight: bold;
	}
	&__selecteditem {
		border: $border-size solid darken($color, 20%);
		background-color: darken($color, 10%);
		height: $height;
		padding: $padding-size 0.2rem;
	}

	&__caret {
		float: right;
	}

	&__list {
		list-style-type: none;
		padding: 0;
		margin: 0;

		max-height: 20rem;
		overflow-y: auto;
		position: absolute;
		border: $border-size solid darken($color, 20%);
		width: 100%;
		top: $label-height + $height + ($border-size) + ($padding-size * 2);
		box-sizing: border-box;
		background-color: $color;
		box-shadow: 0 1rem 1rem hsla(0, 0%, 0%, 0.2);
	}

	&__item {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
</style>