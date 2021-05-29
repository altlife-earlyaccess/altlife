

function assets(){

	let html = `<br><br>
	<button onclick="my_assets()" class="w3-btn w3-large w3-blue">
	ჩემი ქონება &nbsp;<i class="fa fa-home"></i></button>
	<br><br><hr><br>
	<br><button class="btn btn-success" onclick="purchase_assets()">
	შეიძინე ქონება</button><br><br>
	`;

	Swal.fire({
		heightAuto:false,
		position:"top",
		title:"Assets",
		showConfirmButton:false,
		html:html,
		background:"#333",
		footer:`ყურადღება : თამაში არის ბეტა ფაზაში, ხარვეზები შესაძლოა შეგხვდეთ`,
		showCloseButton:true
	});
};




function my_assets(){
	var html = `<div id="scroll-container">`;
	if (USER.assets.length == 0){
		html = `<br><hr><h2>შენ ამ ეტაპზე არ ფლობ ქონებას! </h2><br>
		<h2><i class="w3-center">:(</i></h2>`;
	}
	else {
		for (x=0;x!=USER.assets.length;x++){
			let asset = USER.assets[x];
			let new_html = `
			<div id="${asset[0]}" class="w3-margin-16 
			w3-panel w3-pale-blue w3-leftbar w3-border-blue">
			<br>
			<h4 class="">${asset[0]}</h4>
			<h6 class="">${asset[1]}$</h6>
			<br>
			<button onclick=sell_assets(${x})
			class="w3-btn w3-small w3-red w3-hover-green w3-center">
			გაყიდე</button><br>
			</div>
			`;

			html = html+new_html;

		}	
	}
	html = html + "<br></div>";


	
	Swal.fire({
		heightAuto:false,
		title:"ჩემი ქონება",
		html:html,
		showCloseButton:true,
		showConfirmButton:false,
		position:top
	})


}








function purchase_assets(){
	var btn1 = `<br><button class="btn btn-success" onclick="purchase('house')">იყიდე სახლი</button><br>`;
	var btn2 = `<br><button class="btn btn-success" onclick="purchase('vehicle')">იყიდე მანქანა</button><br>`;
	
	let html =`<br><hr>${btn1}${btn2}`;
	Swal.fire({
		heightAuto:false,
		position:"top",
		icon:"info",
		title:"შეიძინე ქონება",
		showConfirmButton:false,
		html:html
	});

};





function sell_assets(index){
	asset = USER.assets[index];

	let html = `<br><br>
	ქონების ტიპი: - <b>${asset[0]}</b><br>
	ფასი: - <b>${asset[1]}$</b><br><hr><br>
	`;
	
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"გაყიდე ქონება",
		html:html,
		confirmButtonText:"გაყიდე",
		showCancelButton:true,
		cancelButtonText:"გადაიფიქრე"
	}).then((result) => {

		if (result.value){
			asset_sell(index);
		}

	});

};



function asset_sell(index){
	let asset = USER.assets[index];
	let asset_price = asset[1];
	let asset_name = asset[0];
	money += asset_price;
	display();
	USER.assets.splice(index,1);
	message(`შენ გაყიდე შენი ${asset_name} მიიღე ${asset_price}$ -ი `);

	let html = `<br><br>
	<h3>Sგაყიდულია ${asset_price}$ - ად</h3>
	`;
	Swal.fire({
		heightAuto:false,
		title:"გილოცავ შენ გაყიდე შენი ქონება",
		icon:"success",
		html:html,
		confirmButtonText:"გამოსვლა!"
	});

}





function purchase_house(name,cost){
	let chance = randint(0,2);
	let l = [10,15,20,25,30,35,40,45,50,55,60,65,70];
	var discount = false;
	r = l[randint(0,12)];
	let change = 200*r;
	if (chance == 0){
		var price = cost - change;
		var discount = true;
	}
	else {
		var price = cost + change;
	};


	if (discount){
		var html = `
		ფასი - <del>${cost}$</del> <b>${price}$</b><br>
		ფასდაკლება - <b>${cost-price}$</b><br>
		მდგომარეობა - <b>${randint(40,100)}%</b>`;
	}
	else {
		var html = `Price - <b>${price}$</b><br>
		მდგომარეობა - <b>${randint(40,100)}%</b>`;
	}
	Swal.fire({
		heightAuto:false,
		title:name,
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:`გადავიხდი ${price}$`,
		cancelButtonText:"არ ვიჩქარებ!"
	}).then((result) => {
		if (result.value){
			if (has_money(price)){
				money = money - price;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"შენ შეიძინე სახლი!",
					html:`გილოცავ! შენ გახდი ამაყი მფლობელი <b>${name}</b><br>`+
					`შენ ის შეიძნე <b>${price}$ - ად</b>`,
					confirmButtonText:"შესანიშნავია!"
				});
				USER.assets.push([name,price,"სახლი"]);
				message(`შენ იყიდე ${name} ღირებულება ${price}$-ი`)
				morale += randint(5,10);
				display();
			};

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			purchase("სახლი");
		};

	});
};



function purchase_vehicle(name,cost){
	let chance = randint(0,2);
	let l = [10,15,20,25,30,35,40,45,50,55,60,65,70];
	var discount = false;
	r = l[randint(0,12)];
	let change = 100*r;
	if (chance == 0){
		var price = cost - change;
		var discount = true;
	}
	else {
		var price = cost + change;
	};


	if (discount){
		var html = `
		ღირებულება - <del>${cost}$</del> <b>${price}$</b><br>
		ფასდაკლება - <b>${cost-price}$</b><br>
		მდგომარეობა - <b>${randint(40,100)}%</b>`;
	}
	else {
		var html = `ფასი - <b>${price}$</b><br>
		მდგომარეობა - <b>${randint(40,100)}%</b>`;
	}
	Swal.fire({
		heightAuto:false,
		title:name,
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:`გადაიხადე ${price}$`,
		cancelButtonText:"არ იჩქარო"
	}).then((result) => {
		if (result.value){
			if (has_money(price)){
				money = money - price;
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"შენ იყიდე მანქანა!",
					html:`შენ ახლა ფლობ მანქანას <b>${name}</b><br>`+
					`You bought it for <b>${price}$</b>`,
					confirmButtonText:"შესანიშნავია!"
				});
				USER.assets.push([name,price,"veმანქანაhicle"]);
				message(`შენ იყიდე ${name}  ${price}$- ად`)
				morale += randint(3,7)
				display();
			};

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			purchase("მანქანა");
		};

	});
};





function purchase(item){

	if (item == "house"){

		let list = [
		{"2 BHK აპარტამენტი":80000},{"3 BHK აპარტამენტი":100000},
		{"4 BHK აპარტამენტი":140000},{"1 ოთახიანი აპარტამენტი":50000},
		{"2 BHK კოტეჯი":70000},{"3 BHK კოტეჯი":90000},
		{"4 BHK კოტეჯი":120000},{"1 ოთახიანი კოტეჯი":40000},
		{"2 BHK თანამედროვე სახლი":120000},{"3 BHK თანამედროვე სახლი":150000},
		{"4 BHK თანამედროვე სახლი":200000},{"1 ოთახიანი თანამედროვე სახლი":90000},
		{"ძვირადღირებული კერძო სახლი":1000000},{"სახლი ზღვის ხედით":160000},
		{"კერძო სახლი":200000},{"4 ოთახიანი კერძო სახლი":420000},
		{"5 ოთახიანი სახლი":300000},{"12 ოთახიანი რეზიდენცია":5000000},
		{"სასახლე":10000000},{"3 ოთახიანი სახლი":25000}

		];
		let all = [];
		for (x=0;x<4;x++){
			let rand = randint(0,list.length-1);
			if (list[rand] in all){
				x = x -1;	
			}
			else {
				all.push(list[rand]);
			};
		};
		let btns = [];
		for (x in all){
			let house = Object.keys(all[x])[0];
			let cost = Object.values(all[x])[0];
			let btn = `<br><button onclick="purchase_house('${house}',${cost})"
			class="btn btn-primary">${house}</button><br>`;
			btns.push(btn);

		};
		let reload_btn = `<br><br><button onclick="purchase('house')" 
		class="btn-lg btn-secondary">ნახე მეტი</button>`;
		let html = "<br><hr><br>"+btns[0]+btns[1]+btns[2]+btns[3]+reload_btn;
		Swal.fire({
			heightAuto:false,
			title:"გასაყიდად გამოტანილი სახლები",
			icon:"info",
			position:"top",
			html:html,
			showConfirmButton:false
		});

	};



	if (item == "vehicle"){

		let list = [
		{"2021 Chevrolet Malibu (Used)":10000},{"2021 Chevrolet Malibu":30000},
		{"Chevrolet Car (Used)":8000},{"Chevrolet Car":25000},
		{"2021 Honda Accord (Used)":12000},{"2021 Honda Accord":35000},
		{"BMW Car (Used)":22000},{"BMW Car":50000},
		{"Audi Car (Used)":21000},{"Audi Car":45000},
		{"Lamborghini":120000},{"Harley Davidson Bike":40000},
		{"Ford Car (Used)":15000},{"Ford Car":40000},
		{"Toyota Prius (Used)":9000},{"Toyota Prius":30000}
		];
		let all = [];
		for (x=0;x<4;x++){
			let rand = randint(0,list.length-1);
			if (list[rand] in all){
				x = x -1;	
			}
			else {
				all.push(list[rand]);
			};
		};
		let btns = [];
		for (x in all){
			let vehicle = Object.keys(all[x])[0];
			let cost = Object.values(all[x])[0];
			let btn = `<br><button onclick="purchase_vehicle('${vehicle}',${cost})"
			class="btn btn-primary">${vehicle}</button><br>`;
			btns.push(btn);

		};
		let reload_btn = `<br><br><button onclick="purchase('vehicle')" 
		class="btn-lg btn-secondary">ნახე მეტი</button>`;
		let html = "<br><hr><br>"+btns[0]+btns[1]+btns[2]+btns[3]+reload_btn;
		Swal.fire({
			heightAuto:false,
			title:"გასაყიდად გამოტანილი მანქანები",
			icon:"info",
			position:"top",
			html:html,
			showConfirmButton:false
		});

	};

};










