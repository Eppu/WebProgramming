Vue.component('hotel-item',{
    props:['hotel'],
    template: `
    <li>{{hotel.name}} at {{hotel.address}}</li>
    `
});

Vue.component('hotel-item-card',{
    props:['hotel'],
    template: `
   <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{hotel.name}}
            </p>
        </header>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-128x128">
                      <img v-bind:src="hotel.picture" alt="Placeholder image">
                    </figure>
                </div>
                <div class="content">
                    {{hotel.description}}<br><br>
                    <em>{{hotel.address}}, {{hotel.postcode}}, {{hotel.city}}</em>
                </div>
            </div>
        </div>
    </div>
    `
});

Vue.component('hotel-list',{
    props: ["title","status","results"],
    template: `
     <div>
        <div class="card">
             <div class="card-header-title is-centered">
                {{title}}
            </div>
        </div>
        <div>
            <hotel-item-card v-for= "item in results" v-bind:hotel="item" v-bind:key="item.id"></hotel-item-card>
        </div>
    </div>
    `,
    watch:{
        status(newValue) {console.log(newValue);}
    }
});

let thisapp3data = {
	el:"#componentholder",
    data: {
         status:"default status",
         title:"default title",
         results:[]
    },
    methods:{
        update() {
             //inside the then callback below 'this' refers to the scope of the callback function
			 //and does not refer to this (parent) object
             //so store the reference of this in a variable 'current'
             //or use arrow function where 'this' refers to the parent object
			 //as we haven't used arrow functions, we'll store the value of 'this'
		   let current =  this;
		   
		   fetch("data/hoteldata3.json")
			   .then(function(response){
				   if(response.status !== 200){
					   //data transfer not complete
					   return;
				   }
				   response.json().then(function(data){
					   current.status = "OK";
					   current.title = data.title;
					   current.results = data.hotels;
					   for(let i = 0; i< current.results.length;i++){
							current.results[i].id = i;
						}
				   });
				  
			   })
			   .catch(function(error){
				   this.status = "an error has occurred";
			   });
			}
		},
	    mounted(){
		  this.update();
		}
};

let thisapp3 = new Vue(thisapp3data);