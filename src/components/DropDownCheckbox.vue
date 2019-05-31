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
					<input type="checkbox" :id="item.name">
					<label :for="item.name">{{item.name}}</label>
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
	private app: HTMLElement | null = null;

	public mounted() {
		this.app = document.getElementById('app');
	}
	public toggleList() {
		this.isShowing = !this.isShowing;

		if (this.isShowing) {
			this.app!.addEventListener('click', this.closeDropDown, {
				capture: true,
			});
		}
	}

	public closeDropDown(event: Event) {
		const element: HTMLElement = event.target as HTMLElement;
		const itemElement = element.closest('.dropdown__item');

		if (itemElement == null) {
			this.isShowing = false;
			this.app!.removeEventListener('click', this.closeDropDown);
		}
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
	//opacity: 0;
	height: 0;
}
.fade-enter-to,
.fade-leave {
	//opacity: 1;
	height: auto;
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
		height: 1rem;
	}
	&__item:hover {
		background-color: darken($color, 6%);
		cursor: pointer;
	}
}
</style>