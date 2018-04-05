Vue.component('message',{

	props:['title','body'],

	data() {
		return{
			isVisible: true
		};
	},

	template:`
			<article class="message" v-show= "isVisible">
				<div class="message-header">
					{{title}} <button @click="isVisible = false" class="delete" aria-label="delete"></button>
				</div>
				<div class="message-body">
					{{body}}
				</div>
			</article>
		`
});

/* back ticks - template literals'   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals  */
/* bad colour format for back ticks in Notepad++, not a problem in Visual Studio Code  */

let thisappData = {
	el:"#componentholder"
};

let thisapp = new Vue(thisappData);

