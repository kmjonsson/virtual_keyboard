
import $ = require("jquery");

export class Keyboard {
	private layout: string[][] = [
		["1","2","3","4","5","6","7","8","9","0"],
		["Q","W","E","R","T","Y","U","I","O","P"],
		[" ","A","S","D","F","G","H","J","K","L"],
		[" "," "," ","Z","X","C","V","B","N","M"],
	];
	private id : string;
	constructor(id: string) {
		this.id = id;
	}
	private cb : (key: string) => any;
	on_click(cb : (key: string) => any) {
		this.cb = cb;
	}
	private click(key: string) : void {
		if(this.cb === undefined) {
			return;
		}
		this.cb(key);
	}
	setup() {
		let result = "";
		for(let r of this.layout) {
			let i=0;
			for(let c of r) {
				let classes:string[] = [];
				if(!i) { 
					classes.push("keyboard_first"); 
				}
				if(c == ' ') {
					classes.push("keyboard_spacing"); 
					c = '';
				} else {
					classes.push("keyboard"); 
				}
				i++;
				result += '<div class="' +  classes.join(" ") +  '">' + c + '</div>';
			}
		}
		$(this.id).attr('style',"width: 100%; text-align: center; overflow:hidden");
		$(this.id).html('<div style="">' + result + '</div>');
		let k = this;
		$('body').on('click', 'div.keyboard', function() {  k.click($(this).html()) });
	}
}
