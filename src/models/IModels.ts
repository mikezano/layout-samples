export interface IDropDownItem {
	id: number;
	name: string;
}

export interface IFruit extends IDropDownItem {
	icon: string;
	quantity: number;
	price: number;
	origin: string;
}
