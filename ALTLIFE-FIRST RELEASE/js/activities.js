function library(){
	let cost = randint(5,40);

	let html = `<br>
	თითო სესიის ფასი : $${cost}<br><br><br>

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:'კითხვა',
		title:'ბიბლიოთეკა',
		html:html,
		showCancelButton:true,
		showConfirmButton:true,
		showCloseButton:true,
		confirmButtonText:`გადაიხადე $${cost}`,
		cancelButtonText:`დაივიწყე`
	}).then((result) => {
		if (result.value){
			let visitedLibrary;
			if (hasMoney(cost)){
				money -= cost;
				visitedLibrary = true;


			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				visitedLibrary = true;
			}
			else {
				swalNoMoney.fire();
				visitedLibrary = false;
			};

			if (visitedLibrary){
				message(`შენ დახარჯე $${cost} ბიბლიოთეკაში `);
				totalLibVisits += 1;
				if (totalLibVisits < 3){
					intellect += randint(0,2);
				};
				Swal.fire({
					heightAuto:false,
					title:'შენ იმეცადინე ბიბლიოთეკაში',
					icon:'წარმატება',
					confirmButtonText:'კარგია'
				});
				
				display();	
			}
		}
	});

}





function gym(){
	let cost = randint(20,100);

	let html = `<br>
	ფასი თითო სესიის : $${cost}<br><br><br>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:'კითხვა',
		title:'Gym',
		html:html,
		showCancelButton:true,
		showConfirmButton:true,
		showCloseButton:true,
		confirmButtonText:`გადაიხადე $${cost}`,
		cancelButtonText:`დაივიწყე`
	}).then((result) => {
		if (result.value){
			let visitedGym;
			if (hasMoney(cost)){
				money -= cost;
				visitedGym = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				visitedGym = true;
			}
			else {
				swalNoMoney.fire();
				visitedGym = false;
			};


			if (visitedGym){
				message(`შენ დახარჯე $${cost} სპორტ დარბაზის აბონიმენტში`);
				totalGymVisits += 1;
				if (totalGymVisits < 3){
					looks += randint(0,2);
					health += randint(0,1);
					morale += randint(0,1);
				};

				Swal.fire({
					heightAuto:false,
					title:'შენ ივარჯიშე სპორტ დარბაზში!',
					icon:'success',
					confirmButtonText:'ძალიან კარგი'
				});
				
				display();	
			};
		};
	});

};





function exercise(){
	message(`შენ ცოტა ივარჯიშე სახლში.`);
	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"შენ გააკეთე აჯიმანიები და პრესები!",
		confirmButtonText:"Nice"
	});
	var chance = randint(0,3);
	if (chance == 0){
		morale += 1;
		health += 1;
		looks += randint(0,1);
		display();
	};
};









function restaurant(){
	let cost = randint(30,300);
	let rating = randint(30,100);
	let html = 
	`<br><br>
	შეკვეთის ღირებულება - <b>$${cost}</b><br>
	რესტორანის რეიტინგი - <b>${rating}%</b><br>
	<br><br>
	`;
	Swal.fire({
		heightAuto:false,
		title:"რესტორანი",
		icon:"info",
		html:html,
		confirmButtonText:`გადაიხადე $${cost}`,
		showCancelButton:true,
		cancelButtonText:`თქვი უარი`
	}).then((result) => {
		if (result.value){
			let visitedRestaurant = false;
			if (hasMoney(cost)){
				money -= cost;
				visitedRestaurant = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				visitedRestaurant = true;
			}
			else {
				swalNoMoney.fire();
				visitedRestaurant = false;
			};


			if (visitedRestaurant){
				message(`შენ რესტორანში დახარჯე $${cost}`);
				morale += randint(0,2);


				Swal.fire({
					heightAuto:false,
					title:'საჭმელი ძალიან გემრიელია, შენ სულ შეჭამე.',
					icon:'success',
					confirmButtonText:'დატოვე რესტორანი'
				});
			};
			
		display();
		};
	});

};




function hospital(){
	var html = 
	`<br><br>
	<button onclick="checkup()" class="btn btn-success">&nbspშეამოწმე შენი ჯანმრთელობა&nbsp</button>
	<br><br>
	<button onclick="westernMedicine()" class="btn btn-success">შეიძინე წამლები შავ ბაზარზე</button>
	<br><br>
	<button onclick="therapy()" class="btn btn-success">გაიარე თერაპია</button>
	<br><br>
	<button onclick="dentist()" class="btn btn-success">ესტუმრე სტომატოლოგს</button>
	<br><br>
	<button onclick="plasticSurgery()" class="btn btn-success">გაიკეთე პლასტიკური ოპერაცია</button>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"საავადმყოფო",
		html:html,
		showCloseButton:true,
		showConfirmButton:false,

	});


};







function crime(){
	let chance = randint(1,100);

	if (chance < 65){ //65% chance
		crimeSuccess();
	}
	else if (chance >= 65 && chance <= 90){ // 25% chance
		crimeFine();
	}
	else {	//10% chance
		crimeJail();
	}

	display();
};



function crimeSuccess(){
	let amt = approx(randint(100,1500));
	money += amt;
	message(`შენ ჩაიდინე დანაშაული და მოიპარე $${amt}`);

	let html = `<br><br>
	შენ ჩაიდინე დანაშაული და მოიპარე <b>$${amt}</b>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"წარმატება",
		title:`წარმატებული ძარცვა`,
		html:html,
		confirmButtonText:"მოქესტე"
	});



}



function crimeFine(){
	let fine = randint(500,2500);
	money -= fine;
	message(`ძარცვისას ადგილზე დაგხვდა CCTV კამერა, რამაც დაგაფიქსირა მცირე ხარისხის დანაშაულის ჩადენისას, სახელმწიფომ გამოგიწერა ჯარიმა $${fine}`);
	
	let html = `<br><br>
	შენ დაგაკავეს ადმინისტრაციული სამართალდარღვევის გამო.<br>
	სასამართლომ განიხილა შენი საქმე და დაგაჯარიმა <b>$${fine}</b>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"error",
		title:`ვაი, გამფაქტეს!`,
		html:html,
		allowOutsideClick:false,
		confirmButtonText:`გადაიხადე $${fine}`
	});	

}



function crimeJail(){
	message(`შენ დაგაკავეს სისხლსი სამართლის დანაშაულის ჩადენისას`);
	let jailTime = randchoice([3,6,8,12]);
	message(`სასამართლო მსჯელობს, შენ შესაძლოა მოგიწიოს  ${jailTime} თვის გატარება ციხეში`);
	
	let html = `<br><br>
	სამართალ დამცავებმა, ჩატარებული სპეც-ოპერაციის შედეგად დაგაკავეს, შენზე აღიძრა სისხლსი სამართლსი საქმე.<br>
	სასამართლომ მსჯელობის შედეგად გადაწყვიტა მოესაჯა <b>${jailTime}</b> თვე ციხეში.
	<br><br>
	`
	Swal.fire({
		heightAuto:false,
		icon:"გაფრთხილება",
		title:"მოხდა შენი დაკავება, გადაგიყვანეს წინასწარი დაკავების იზოლატორში, ემზადები ზონაზე გადასაყვანად!",
		allowOutsideClick:false,
		html:html,
		confirmButtonText:"არა! ღმერთო:("
	}).then((result) => {
		jail(jailTime);
	});
}








function gamble(){
	let placeholder = 100;
	
	let html = `<br><br>
	მინიმალური თანხა : <b>$100</b><br>
	მაქსიმალური თანხა : <b>$10000</b><br><br>
	მოგების შემთხვევაში, შენი შეტანილი თანხა გაორმაგდება.!<br>
	წაგების შემთხვევაში, შენი შეტანილი თანხა დაიაკრგება!<br><br>
	ითამაშე შენი რისკის ფასად! 
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"აზარტული თამაშები",
		input:"text",
		inputValue:placeholder,
		html:html,
		confirmButtonText:"შესვლა!",
		showCancelButton:true,
		cancelButtonText:"არა! არმინდა",
		inputValidator: (cost) => {
			let isnum = /^\d+$/.test(cost);
			if (isnum && hasMoney(cost)){
				startGamble(cost);
			}
			else if (!cost){
				return 'შენ უნდა შემოხვიდე თანხთ'
			}
			else if (!isnum){
				return 'ვაიმე, სად წავიღე საფულე'
			}
			else if (cost < 100){
				return 'თანხის გარეშე დატოვებთ სათამაშო მაგიდას! საწყისი $100'
			}
			else if (cost > 10000){
				return 'ბატონო! მაქსიმალური თანხა არის $10000'
			}
			else if (!hasMoney(cost)){
				return `ვაიმე! თანხა არ მქონია! ლომკაა გამიშვიით`
			}
		}
	})


};





function startGamble(amount){
	
	message(`შენ ითამაშე $${amount}`);
	money -= amount;
	display();

	let html = `<br><br>
	<h5>შენ დახარჯე <b>${amount}$</b> აზარტულ თამაშებში</h5><br><br>
	<h6>ოთხადან უნდა გააკეთო ერთი არჩევანი.<br>
	ერთ-ერთი შენ თანხას გააორმაგებს! ან პირიქით</h6>
	<br><br>`;

	var opts = [1,2,3,4];
	shuffle(opts);

	let btns = `
	<button onclick="resultGamble(${opts[0]},${amount})" class="btn btn-success">არჩევანი 1</button>
	&nbsp;&nbsp;&nbsp;&nbsp
	<button onclick="resultGamble(${opts[1]},${amount})" class="btn btn-success">არჩევანი 2</button>
	<br><br>
	<button onclick="resultGamble(${opts[2]},${amount})" class="btn btn-success">არჩევანი 3</button>
	&nbsp;&nbsp;&nbsp;&nbsp
	<button onclick="resultGamble(${opts[3]},${amount})" class="btn btn-success">არჩევანი 4</button>
	<br><br>`;

	html = html+btns;

	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:"აზარტული თამაშები",
		html:html,
		allowOutsideClick:false,
		showConfirmButton:false
	});

};





function resultGamble(option,amount){
	
	if (option == 1){
		let prize = amount*2;
		money += prize;
		morale += randint(1,2);
		
		message(`არარსებოობს! $${prize} მოვიგეე`);

		let html = `<br><br>
		<b>"კაზინო"!გილოცავთ თქვენ მოიგეთ</b><br><br>
		თქვენ თამაშობთ <b>$${amount}</b><br>
		დიახ,დიახ, დიახ, თქვენ ბანკის ანგარიშზე დაგერიცხათ <b>$${prize}</b>
		<br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:"გილოცავთ!!",
			html:html,
			confirmButtonText:"შესანიშნავია!"
		});
	
	}
	else {
		
		message(`სამწუხაროა, შენ წააგე, სჯობს სხვა დროს ცადო`);
		morale -= randint(0,1);

		let html = `<br><br>
		შენ წააგე <b>${amount}$ აზარტულ თამაშებში</b>
		<br><br>`;
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"სჯობს შეჩერდე შენ წააგე!",
			html:html,
			confirmButtonText:"ცუდ ფეხზე ადექი"
		});

	};
	display();

};










function emigrate(){
	let cost = randint(15000,35000);

	let html = `<br><br>
	<h2 class="w3-center"> Emigration Process <i class="fa fa-plane-departure"></h2><br><br>
	<br>
	ემიგრაციის შემთხვევაში დაგიჯდებათ : <b>$${cost}</b><br><br>
	აირჩიეთ სასურველი ქვეყანა : 
	<br><br>
	`

	Swal.fire({
		heightAuto:false,
		title:"ემიგრაციის სააგენტო",
		position:"top",
		html:html,
		confirmButtonText:"წადი ემიგრაციაში!",
		showCancelButton:true,
		cancelButtonText:"გადავიფიქრე!",
		input:"text",
		inputValidator: (value) => {
			value = value.charAt(0).toUpperCase() + value.slice(1);
			

			// allCountries is global variable declared in countries.js
			let countryFound = allCountries.includes(value);
			
			
			if (countryFound){
				willEmigrate = false;
				if (hasMoney(cost)){
					money -= cost;
					willEmigrate = true;
				}
				else if (hasMoneyInBank(cost)){
					bankTransaction(-cost);
					willEmigrate = true;
				}
				else {
					swalNoMoney.fire();
					willEmigrate = false;
				};


				if (willEmigrate){
					message(`სააგენტოს სერვისისთვის $${cost} გადაუხადე`);
					USER.country = value;
					successEmigrate();
				};

			}
			else {
				return "თქვენს მიერ მოთხოვნილი ქვეყანა, არ იძებნება, თავიდან სცადე!"
			}

		}
	})

}





function successEmigrate(){
	message(`შენ ხარ <b>${USER.country} ემიგრანტი, წარმატებები</b>`);
	message(`ყველა შენი საბანკო რეკვიზიტი, გადაეცა ${USER.country} სახელმწიფო ბანკს`);
	if (isStudent){
		leaveEducation();
	}
	if (hasJob){
		leaveJob();
	}

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"შენ უკვე ემიგრანტი ხარ! ახალი ცხოვრება გელის!",
		text:`შენ წახვედი ემიგრაციაში ${USER.country}!`,
		confirmButtonText:"მზად ვარ",
		allowOutsideClick:false
	});
	display();
}







function vacation(){
	
	let countries = [];
	
	for (x=0;x<5;x++){
		let randCountry = allCountries[randint(0,allCountries.length-1)];
		if (countries.includes(randCountry)){
			x -= 1;
		}
		else if (randCountry == USER.country){
			x -= 1;
		}
		else {
			countries.push(randCountry);	
		};
	};

	var countryObject = {
		country0:countries[0],
		country1:countries[1],
		country2:countries[2],
		country3:countries[3],
		country4:countries[4]
	};

	let html = `<br><br>
	<button onclick="vacation()" class="btn btn-success">ლოკაციები</button>
	<br><br>`;
	
	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:"მოიწყვე არდადეგები",
		showCancelButton:true,
		confirmButtonText:"წავედით",
		cancelButtonText:"არა! გადავიფიქრე",
		input:"select",
		inputOptions:countryObject,
		inputPlaceholder:"აირჩიე ქვეყანა",
		html:html,
		position:"top",
		
	}).then((result) => {
		if (result.value){
			let country = countryObject[result.value];
			let cost = randint(10000,25000);

			let html2 = `<br><br>
			მოგზაურობის ღირებულება : <b>$${cost}</b>
			<br><br>`;

			Swal.fire({
				heightAuto:false,
				icon:"info",
				title:`მივემგზავრები ${country}`,
				showCancelButton:true,
				confirmButtonText:`ფასი $${cost}`,
				cancelButtonText:"არა! ჩემთვის არ არის, ძვირია",
				footer:"სხვათაშორის : არდადეგები, შენს მორალს ერთი-ორად გაზრდის",
				html:html2

			}).then((result) => {
				if (result.value){
					let wentForVacation = false;

					if (hasMoney(cost)){
						money -= cost;
						wentForVacation = true;
					}
					else if (hasMoneyInBank(cost)){
						bankTransaction(-cost);
						wentForVacation = true;
					}
					else {
						swalNoMoney.fire();
						wentForVacation = false;
					};


					if (wentForVacation){
						message(`შენ არდადეგებზე წახვედი ${country}`);
						morale += randint(15,20);
						intellect += randint(-1,1);

						Swal.fire({
							heightAuto:false,
							title:'არდადეგების დროა!',
							text:`შენ იმოგზაურე ${country}!`,
							confirmButtonText:'უკან დაბრუნების დროა',
							icon:'success'
						});

					}
				}
				else if (result.dismiss == Swal.DismissReason.cancel){
					vacation();
				};
			});
			display();
		};

	});
};









