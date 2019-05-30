<template>
	<div class="dropdown">
		<label class="dropdown__label">{{label}}</label>
		<div class="dropdown__selecteditem" @click="toggleList()">
			{{selectedItem.name}}
			<span class="dropdown__caret">&#9660;</span>
		</div>
		<transition name="fade">
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
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IDropDownItem } from '@/models/IModels.ts';

@Component({
	components: {},
})
export default class DropDown extends Vue {
	public selectedItem: IDropDownItem = {
		id: 0,
		name: 'Selected item',
	};
	public isShowing: boolean = false;
	public selectedItems: IDropDownItem[] = [];

	@Prop() public label!: string;
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
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease-in, height 0.3s ease-in;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
	height: 0;
}
.fade-enter-to,
.fade-leave {
	opacity: 1;
}

.dropdown {
	$border-size: 0.1rem;
	$padding-size: 0.4rem;
	$height: 1rem;
	$label-height: $height;
	$color: whitesmoke;
	$border-radius: 0.2rem;

	position: relative;
	box-sizing: border-box;
	text-align: left;
	margin: 0.8rem 0;

	&__label {
		height: $height;
		font-weight: bold;
	}
	&__selecteditem {
		border: $border-size solid darken($color, 20%);
		border-radius: $border-radius;
		background-color: darken($color, 2%);
		height: $height;
		padding: $padding-size 0.2rem;
	}

	&__caret {
		float: right;
		font-size: 0.6rem;
		line-height: 1.2rem;
	}

	&__list {
		list-style-type: none;
		padding: 0;
		margin: 0;

		max-height: 20rem;
		overflow-y: auto;
		position: absolute;
		border: $border-size solid darken($color, 20%);
		border-top: 0;
		border-radius: 0 0 $border-radius $border-radius;
		width: 100%;
		top: $label-height + $height + ($border-size) + ($padding-size * 2);
		box-sizing: border-box;
		background-color: $color;
		box-shadow: 0 0.2rem 0.5rem hsla(0, 0%, 0%, 0.2);
		z-index: 100;
	}

	&__item {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		padding: ($padding-size / 2) 0;
	}
	&__item:hover {
		background-color: darken($color, 6%);
		cursor: pointer;
	}
}
</style>