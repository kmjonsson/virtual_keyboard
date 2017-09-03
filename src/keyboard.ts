
import $ = require("jquery");

export class Keyboard {
	private layout: string[][] = [
		["1","2","3","4","5","6","7","8","9","0","+"],
		["Q","W","E","R","T","Y","U","I","O","P","Å"],
		[" ","A","S","D","F","G","H","J","K","L","Ö","Ä"],
		[" "," "," ","Z","X","C","V","B","N","M",",",".","-"],
		[" "," "," ","=","/","?","<","~","@"],
	];
	private id : string;
	private enabled : boolean = true;
	private kbd_hook:boolean;
	constructor(id: string, kbd_hook:boolean=true) {
		this.id = id;
		this.kbd_hook = kbd_hook;
	}
	private cb : (key: string, obj: any) => any;
	on_click(cb : (key: string, obj: any) => any) {
		this.cb = cb;
	}
	enable() {
		this.enabled = true;
	}
	disable() {
		this.enabled = false;
	}
	private click(key: string, obj: any) : void {
		if(this.cb === undefined) {
			return;
		}
		if(!this.enabled) {
			return;
		}
		this.cb(key,obj);
	}
	setup() {
		let result = "";
		for(let r of this.layout) {
			let i=0;
			for(let c of r) {
				let classes:string[] = [];
				let key = c;
				if(c.indexOf("\n") >= 0) {
					classes.push("keyboard_twolines"); 
					key = c.substring(0,c.indexOf("\n"));
				}
				if(!i) { 
					classes.push("keyboard_first"); 
				}
				if(c == ' ') {
					classes.push("keyboard_spacing"); 
					c = 'Y';
				} else {
					classes.push("keyboard"); 
				}
				i++;
				result += '<button key="' + key + '" class="' +  classes.join(" ") +  '">' + c + '</button>';
			}
		}
		$(this.id).attr('style',"width: 100%; text-align: center; overflow:hidden");
		$(this.id).html('<div style="">' + result + '</div>');
		let k = this;
		$('body').on('click', 'button.keyboard', function() {  k.click($(this).html(),this) });
		if(this.kbd_hook) {
			$('body').keypress(function(ev) {
				if($('.keyboard[key="' + ev.key.toUpperCase() + '"]').length) {
					ev.preventDefault()
					k.click(ev.key.toUpperCase(),$('.keyboard[key="' + ev.key.toUpperCase() + '"]'));
				}
			});
		}
	}
}
