function ageEvents(){
	newsEvents();
	if (hasJob){
		monthlyJobEvent();
	}
	if (isStudent){
		studentEvents();
	}
	if (hasDisease){
		diseaseEvents();
	}
	if (!hasDisease){
		randomDiseaseEvents();
	}
	
	extremeEvents();
	monthlyBudgetEvents();
	
	loan_check();
	money_in_bank_check();
	need_house_check();
	depression_check();
	if (USER.age/12 > 65){
		oldAgeEvent();
	}
	if (!isJailed){
		randomEvents();
	}
	if (isJailed){
		jailEvents();
	}

	if (!isJailed){
		extremeEvents();
	}
	

	display();

};





function oldAgeEvent(){
	if (USER.age/12 > 65){
		let randNum = randint(0,2);
		health -= randNum;
	}
	if (USER.age/12 > 80){
		let chance = randint(0,50);
		if (chance == 50){
			death();
		}
	}
	if (USER.age/12 > 95){
		let chance = randint(0,20);
		if (chance == 20){
			death();
		}
	}

}


function healthEvents(){

}






function oldAgeEvent(){
	if (USER.age/12 > 60){
		

	};
};



function studentEvents(){
	studentRandomEvents();
	student.months += 1;


	if (student.months != 1){
		message(`შენ უკვე ${student.months} თვეა სწავლობ შენს უნივერსიტეტში`);
	}
	else if (student.months == 1){
		message(`შენ უკვე ${student.months}თვეა სწავლობ შენს უნივერსიტეტში`);
	};
	

	if (hasStudentLoan){
		message(`შენი სტუდენტური კრედიტი $${student.loanAmount} დაკავშირდა შენი ბანკის ექაუნთთან`);
		BANK.loan += student.loanAmount;

	};

	if (student.months == 48){
		message(`შენ დაამთავრე უნივერსიტეტი`);

		let html = `<br>
		შენ წარმატებით დაამთავრე უნივერსიტეტი. ფაკულტეტი: ${student.course} !<br>
		შენ სახელზე იუსტიციის სამინისტრომ გასცა დიპლომი, გილოცავ. ის საზეიმო ვითარებაში გადმოგეცა.<br>

		<br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:'success',
			title:'უნივერსიტეტი წარმატებით დამთავრებულია!',
			html:html,
			confirmButtonText:"გაგრძელება!",
			allowOutsideClick:false
		}).then((result) => {
			if (result.value){
				graduateCollege();
			}

		});
	};

}



// function studentEvents(){


// 	if (isStudent){
// 		student_months = student_months + 1;
// 		let test_chance = randint(1,10);
// 		if (test_chance == 1){
// 			student_test();
// 		}

// 		if (student_has_loan == false){
// 			// for future
// 		};

// 		if (student_months%12==0){

// 			intellect += randint(1,4);
// 			display();
// 			var total_years = student_months/12;

// 			if (total_years == 1){
// 				message(`You've completed your first year in college`);
// 				let html = `<br>
// 				Your Academic Performance - <b>${randint(30,100)}%</b><br>
// 				`;
// 				Swal.fire({
// 					heightAuto:false,
// 					icon:"success",
// 					title:"First year in college completed!",
// 					html:html,
// 					confirmButtonText:"Good!"
// 				}).then((result) =>{
// 					if (student_has_loan){

// 						student_loan_notice();
// 					}
// 				});
// 			}
// 			else {
// 				message(`You've completed ${total_years} years in college`);
// 				let html = `<br>
// 				Your Academic Performance - <b>${randint(30,100)}%</b><br>
// 				`;
// 				Swal.fire({
// 					heightAuto:false,
// 					icon:"success",
// 					title:`${total_years} years in college completed!`,
// 					html:html,
// 					confirmButtonText:"Good!"
// 				}).then((result) =>{
// 					if (student_has_loan){
// 						student_loan_notice();
// 					}
// 					// 0 because stu months have been reset to 0
// 					else if (student_months == 0){
// 						Swal.fire({
// 							heightAuto:false,
// 							icon:"success",
// 							title:"You completed your College!",
// 							confirmButtonText:"Sweet!"
// 						});
// 					};

// 				});
// 			};

// 		};



// 		if (student_has_loan){

// 			if (student_months%12==0){
				
// 			};
// 			if (student_months >= 48){
// 				message(`You have $${total_student_loan} as total student loans`);
// 				message(`Your student loan will be paid when you start earning`)
// 				message(`You are no longer entitled to more student loans`);

// 			};
// 		};
	
// 		if (student_months == 48){
// 			student_pass();
// 		};
	
// 	};
	
// 	if (hasJob == false){
// 		if (isStudent == false){
// 			if (student_has_loan){
// 				if (USER.age/12 >= 30){
// 					money = money - total_student_loan;
// 					let html = `
// 					You reached the student loan repayment deadline<br>
// 					and had to pay <b>$${total_student_loan}</b><br>
// 					`;
// 					Swal.fire({
// 						heightAuto:false,
// 						icon:"warning",
// 						title:"Student Loan Deadline!",
// 						html:html,
// 						confirmButtonText:"Okay"
// 					});
// 					student_has_loan = false;
// 					message(`Student loans repayment deadline has been reached`);
// 					message(`You had to pay all your pending loans`);
// 				};
// 			};
// 		};
// 	};

// };








function jailEvents(){

	if (isJailed){
		morale -= 1;
		looks -= 1;
		jail_months_spent += 1;
		if (jail_months_spent == jail_months){
			message(`შენი დატოვე ციხე, ციხეში გაატარე ${jail_months} თვე`);
			Swal.fire({
				heightAuto:false,
				icon:"success",
				title:"Released from jail!",
				confirmButtonText:"Finally!",
				html:`<br><hr><br>მოხდილი მსჯავრი - <b>${jail_months} თვე</b>`
				});
			isJailed = false;
			USER.job = "უმუშევარი";
			jail_months_spent = 0;
			$("#jail").attr("onclick","actions()");
			$("#jail").attr("class","btn-lg btn-danger");
			$("#jail").attr("id","actions");
			$("#activities").show();
			$("#assets").show();

		};


	};



};




function loan_check(){

	if (hasLoan){
		let inc = Math.floor((2/100)*BANK.loan);
		BANK.loan += inc;
	}
}


function money_in_bank_check(){

	let inc = Math.floor((1/100)*BANK.balance);
	BANK.balance += inc;

}


var need_house_notif = false;
function need_house_check(){
	if (USER.age/12 >= 35){
		var has_house = false;
		for (x=0;x!=USER.assets.length;x++){
			if (USER.assets[x][2] == "სახლი"){
				has_house = true;
			}
		}
		if (!has_house){
			morale -= randint(1,2);
		}
	}
	if (USER.age/12 == 35 || USER.age/12 == 40 ||
		USER.age/12 == 45 || USER.age/12 == 50 && !has_house){

		message(`რეკომენდირებულია შეიძინოთ სახლი`);
		let html = `
		<br>
		შენ ხარ <b>${USER.age/12}</b> წლის და ისევ არ გაქვს ადგილი,
		რომელსაც სახლს დაარქმევ, შენ ამას იმსახურებ.
		 კომფორტი, კომუნიკაბელური და დაცული სამეზობლო
		მეგობრული გარემო.<br><br>
		<b>altlife</b> Towers შეიძინე მხოლოდ დღეს ნახევარ ფასად.<br>

		`;
		Swal.fire({
			heightAuto:false,
			icon:"warning",
			title:"რეკლამა",
			html:html,
			confirmButtonText:"სახლის ყიდვა",
			showCancelButton:true,
			cancelButtonText:"გამოსვლა",
			footer:"გაფრთხილება : სახლის გარეშე, თქვენი მორალის მაჩვენებელი ნელ-ნელა შემცირდება"
		}).then((result) => {
			if (result.value){
				purchase("სახლი");
			}
		});

	}
}



function depression_check(){
	if (morale < 20 && !has_depression){
		let chance = randint(0,3);
		if (chance == 0){
			depression();
		}
	}

	if (hasDepression){
		if (morale > 40){
			cure_depression();
		}
		else {
			morale -= randint(0,2);	
			if (morale < 15){
				health -= randint(0,1);
				let chance = randint(0,5);
				if (chance == 0){
					depression_effect();
				}
			}

		}
		
	}
	display();
}




function death(){
	var age = (USER.age-USER.age%12)/12;
	var html = `
	<br><hr><br>
	სახელი : ${USER.name}<br>
	დაგროვილი ქონება : $${money}<br>
	ასაკი : ${age}<br>

	<br><hr><br>თქვენ გადაგასვენეს მორგში, საფლავების არასაკმარისი რაოდენობის გამო, მოხდა თქვენი კრემაცია ${USER.country}
	<br><hr><br>
	`
	;
	Swal.fire({
		heightAuto:false,
		title:`თქვენ მოკვდით ${age}-ში`,
		imageUrl:"images/death.png",
		imageHeight:80,
		imageWidth:80,
		imageAlt:"Death",
		html:html,
		confirmButtonText:"მშვიდათ განისვენე :("
	});
	
	let bottomPanel = document.querySelector('#bottom-panel');
	bottomPanel.innerHTML = '';
	let topPanel = document.querySelector('#top-panel');
	topPanel.innerHTML = '';



	let content = `
	<h2 class="text-danger">შენ გვირაბის ბოლოს სინათლე დაინახე</h2><br><br>
	`;
	let console = document.querySelector('#console');
	console.innerHTML = content;

	health = 0;
	display();
};






function randomEvents(){
	var chance = randint(0,60);
	if (chance == 0){
		lostAndFoundEvent();
	}


};



function lostAndFoundEvent(){
	
	let items = [
	'საფულე','საათი','ყელსაბამი','სამაჯური','დილდო','გუჩის ჩანთა','პისტოლეტი:P250'
	];
	let item = items[randint(0,items.length-1)];
	let html = `<br>პარკში სეირნობისას გადააწყდი დაკარგულ ნივთს: <b>${item}</b><br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"question",
		title:`როგორ მოიქცევი?`,
		html:html,
		confirmButtonText:"გადასცემ პოლიციას",
		showCancelButton:true,
		cancelButtonText:"დაიტოვებ",
		allowOutsideClick:false
	}).then((result) => {
		if (result.value) {
			karma = karma + 25;
			message(`თქვენ გადაეცით დაკარგული ნივთი:${item} პოლიციას`);

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			karma = karma - 10;
			message(`შენ გადაწყვიტე დაგეტოვა დაკარგული ნივთი: ${item}`);
			var inc = randint(5,125);
			money = money + inc;
			message(`ეს ${item} ღირებულია, მისი ფასია $${inc}`);
			display();
		};
	});
};








function thiefEncounter(){
	let chance = randint(0,1);
	if (chance == 0){
		// success
		let prize = randint(500,2000);
		message(`შენ დაეხმარე პოლიციას ქურდის დაჭერაში`);
		money += prize;
		morale += randint(3,6);
		display();
		let html = `გაწეული დახმარებისთვის საპატრულო პოლიცია <b>$${prize}</b> გაჯილდოვებთ
		თქვენ ჩვენი ქვეყნის სამაგალითო მოქალაქე ხართ. საპატრულო პოლიცია აფასებს თქვენს პატრიოტიზმს.`;
		Swal.fire({
			heightAuto:false,
			icon:"success",
			title:"თქვენ დარეკეთ პოლიციაში, რის საფუძველზეც დამნაშავე დააკავეს!",
			html:html,
			confirmButtonText:"ნასეტკა!"
		});
	}
	else {
		message(`დამნაშავემ გაიგო თქვენი განზღახვა, თქვენ მის პირისპირ აღმოჩნდით`);
		Swal.fire({
			heightAuto:false,
			icon:"warning",
			title:"ქურდმა, ტელეფონი წაგართვათ, თქვენ გაუწიეთ წინააღდმეგობა და ის ძირს დააგდეთ",
			confirmButtonText:"დრო იხელთე, გაიქეცი!",
			showCancelButton:true,
			cancelButtonText:"შეებრძოლე",
			allowOutsideClick:false
		}).then((result) => {
			if (result.value){
				message(`თქვენ გაიქეცით, დამნაშავემ თქვენს კვალს ვერ მიაგნო`);
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"თქვენ გაექეცით!",
					confirmButtonText:"ჰუჰ"
				});
				morale -= randint(3,5);
				display();
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				let chance = randint(0,1);
				if (chance == 0){
					message(`თქვენ დაუპირისპირდით დამნაშავეს, ცემთ მას, მიუხედავად მისი წინააღმდეგობისა თქვენს მას არ აძლევთ საშუალებას გაიქცეს`);
					let prize = randint(500,2000);
					money += prize;
					morale += randint(3,6);
					display()
					let html = `
					პოლიცია ადგილზეა!
					პოლიციამ მოახდინა თქვენი დამნაშავისგან განცალკევება. თქვენ დაგაჯილდოვეს
					<b>$${prize}</b> გაწეული სამსახურისთვის!
					`;
					Swal.fire({
						heightAuto:false,
						icon:"success",
						title:"თავპირი დაალეწეთ ქურდს!",
						html:html,
						confirmButtonText:"აპა რავა:)"
					});
				}
				else {
					let html=`
					მან შეგიწყალათ, თუმცა თქვენი თირკმელები არა!
					დამნაშავე: აქამდე ჯობდა წასულიყავი, უკვე გვიანია.
					`;
					message(`ქურდი თქვენ ფიზიკურად გაგისწორდათ, 2 დღიანი კომისა და 1 თვიანი მკურნალობის შემდეგ თქვენ გამოგწერეს საავადმყოფოდან.`);
					health -= randint(6,15);
					morale -= randint(3,6);
					display();
					Swal.fire({
						heightAuto:false,
						icon:"error",
						title:"ვაიმე თირკმელი",
						html:html,
						confirmButtonText:"ვაი დედა"
					});
				}
			}
		});
	}
}



function newsEvents(){
	let randNum = randint(0,40);
	if (randNum == 0){
		let msg = `ექსკლუზიური ამბავი! ექსკლუზიური ამბავი არ არის!`;
		message(msg);
	}
	//develop later on after fixing bugs ok
}



function extremeEvents(){
	let randNum = randint(0,600);
	if (randNum == 0){
		accident();
	}
	else if (generateRange(1,10).includes(randNum)){
		humanEvents();
	}

};


function humanEvents(){

	let rand = randint(0,1);

	if (rand == 0){
		message(`თქვენ გადაეყარეთ ქურდს`);
		let html = `<br>
		ქურდს არ შეუმჩნევიხათ, თუმცა როგორც ჩანს ის ნაძარცთან ერთად გარბის
		ის ნელ-ნელა გშორდებათ.<br>
		რა გინდათ რომ გააკეთოთ ?<br>
		`;

		Swal.fire({
			heightAuto:false,
			allowOutsideClick:false,
			icon:"warning",
			title:"თქვენ გადაეყარეთ ქურდს!",
			html:html,
			confirmButtonText:"გააგრძელე გზა",
			showCancelButton:true,
			cancelButtonText:"დაურეკე პოლიციას"
		}).then((result)=>{
			if (result.value){
				message(`თქვენ გააგრძელეთ გზა`);
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:"თითქოს არაფერი მომხდარა!"
				});
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				thiefEncounter();
			}
		});
	}
	else if (rand == 1){

		message(`შენ შეხვდი უცხო პიროვნებას`);

		let country = generate('ქვეყანა',1)[0];
		let amt = randint(10000,25000);

		let html = `
		<br>უცნობ პიროვნებას სურს შემოგთავაზოთ სამუშაო, თქვენ მოგიწევთ ნივთის ტრანსპორტირება
		 <b>${country}-ში</b>.<br><br>
		ის მზად არის გადაგიხადოთ <b>$${amt}</b> გაწეული სამსახურისთვის.
		ყველა წვრილმან ხარჯს უცხო პიროვნება აანაზღაურებს თქვენ მხოლოდ ქეისის გადატანა მოგიწევთ!
		<br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"question",
			title:"უცხო ადამიანი შემოვიდა კონტაქში",
			html:html,
			allowOutsideClick:false,
			showCancelButton:true,
			confirmButtonText:"სარისკოა!",
			cancelButtonText:"უპრობლემოდ გავაკეთებ"
		}).then((result) => {
			if (result.value){
				Swal.fire({
					heightAuto:false,
					icon:"info",
					title:"უარი თქვით შემოთავაზებაზე!",
					confirmButtonText:"შანსი არაა"
				});
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				karma -= 25;
				let chance = randint(0,1);
				if (chance == 1){
					// success
					message(`თქვენ ქეისი წარმატებით გადაიტანეთ საზღვარზე`);
					money += amt;
					morale += randint(3,6);
					display();
					let html=`<br>სასაზღვრო პოლიციამ გაგაჩერად და შეგამოწმათ, თუმცა ვერაფერი ვერ შეამჩნია, ნარკოტიკები კარგად იყო დამალული
					თქვენ წარმატებით გადაიტანეთ ქეისი<b>${country}-ში</b> თანხის სანაცვლოდ რაოდენობა:
					<b>$${amt}</b>.<br>`;
					Swal.fire({
						heightAuto:false,
						icon:"success",
						title:"ქეისი დანიშნულების ადგილზეა!",
						html:html,
						confirmButtonText:"იზი!"
					});
				}
				else {
					// good luck in jail ig
					morale -= randint(5,15);
					message(`ნარკოტიკებით დატვირთული ქეისის საზღვარზე გადატანისას დაგაკავეს`);
					display();
					let html = `<br><br>
					თქვენზე საქმე აღიძრა, თქვენი გადაგიყვანეს განყოფილებაში, ადამიანი, 
					რომელმაც ეს საქმე დაგავალათ გაუჩნარდა.
					
					`;
					Swal.fire({
						heightAuto:false,
						icon:"error",
						title:"თქვენზე სისხლის სამართლის საქმეა აღძრული!",
						html:html,
						confirmButtonText:"ჯანდაბა"
					}).then((result) => {
						jail(randchoice([8,12,18,24,30,60]));
					});

				}
			}
		});
	}
};








function accident(){
	message(`თქვენ მოყევით ავარიაში`);

	let list = ["მანქანა დაგეჯახათ","სატვირთო დაგეჯახათ","ველოსიპეტი ააკაპოტეთ",
	"ბირჟაზე პოლიტიკაზე კამათის გამო გცემეს",
	"პიროვნებამ რომელიც ძალიან გავდა Ted Bundy'ს გაგიტაცათ და ტყეში დაგტოვათ","სკოლის ეზოში ჩხუბის გაშველებისას მძიმედ დაიჭერით",
	"უყურადღებობის გამო ლიანდაგებში ჩავარდით და მატარებელმა გადაგიარათ","ტელეფონის დასატენად შეერთებისას, მოხდა მოკელ ჩართვა დიდი ოდენობით დენმა გაიარა თქვენს ორგანიზმში",
	"გულის შეტევა გაქვთ"];

	let cause = `თქვენ იყავით <span class='w3-text-red'>${list[randint(0,list.length-1)]}</span>`;
	message(cause);
	let survive = randint(0,100);
	let mortality = 100-survive;
	
	let html = `<br><br>
	${cause}<br><br>
	გადარჩენის შანსი - <b>${survive}%</b><br>
	სიკვდილიანობის შანსი - <b>${mortality}%</b><br>
	`
	health -= randint(30,60);
	morale -= randchoice([10,15,20,30])
	display();
	Swal.fire({
		heightAuto:false,
		allowOutsideClick:false,
		icon:"warning",
		title:"ცუდი ამბავი ხდება თქვენს თავს!",
		html:html,
		confirmButtonText:"გაგრძელება",
		confirmButtonColor:"#d31747"
	}).then((result) => {
		if (result.value){
			let chance = randint(0,100);
			if (chance > survive){
				death();
			}
			else {
				surviveAccident();
			}

		}

	});

};






function surviveAccident(){
	message(`თქვენ გადაურჩით ფატალურ ინციდენტს`);
	health = health + randint(10,30);
	let yearlySalary = USER.job.salary*12;

	if (hasJob && yearlySalary > 30000 && yearlySalary <= 65000){
		var realBill = randint(50000,75000);
		var bill = randint(20000,30000);

		var notice = `
		საავადმყოფოს გადასახდი : <del>$${realBill}</del>&nbsp;<b>$${bill}</b><br>
		გადანახული თანხა : <b>$${realBill-bill}</b><br><br>
		თქვენ, როგორც საშუალო კლასის მოქალაქებ ისარგებლეთ შეღავათებით..<br>
		`;
	}
	else if (hasJob && yearlySalary <= 30000){
		var realBill = randint(50000,75000);
		var bill = randint(12500,17500);

		var notice = `
		საავადმყოფოს გადასახადი : <del>$${realBill}</del>&nbsp;<b>$${bill}</b><br>
		გადანახული თანხა : <b>$${realBill-bill}</b><br><br>
		თქვენ, როგორც დაბალი კლასის წარმომადგენელი სარგებლობთ სახელწმიფოს დახმარების პროგრამით, და გაქვთ შეღავათები.<br>
		`;
	}
	else if (hasJob && yearlySalary > 65000){
		var bill = randint(50000,75000);

		var notice = `
		საავადმყოფოს გადასახადი : <b>$${bill}</b><br><br>
		თქვენ არ მიგიღიათ არანაირი შეღავათები სახელმწიფოსგან.<br>
		`;
	}
	else if (!hasJob){
		var realBill = randint(50000,75000);
		var bill = randint(7500,12500);
		var notice = `
		საავადმყოფოს გადასახადი : <del>$${realBill}</del>&nbsp;<b>$${bill}</b><br>
		გადანახული თანხა : <b>$${realBill-bill}</b><br><br>
		როგორც, ამჟამად უმუშევარს თქვენ სარგებლობთ სახელმწიფოსგან დაწესებული შეღავათებით.
		`;
	};
	let html = `
	ექიმებმა ოპერაცია წარმატებით ჩაატარეს და თქვენ ახლა თავს კარგად გრძნობთ.!<br>
	გამოწერის შემდეგ, თქვენ მოგიწევთ საავადმყოფოს ხარჯების დაფარვა.<br><br>
	${notice}
	`;

	Swal.fire({
		heightAuto:false,
		allowOutsideClick:false,
		icon:"success",
		title:"თქვენ გადაურჩით სიკვდილს!",
		html:html,
		confirmButtonText:"მადლობა ღმერთს"

	}).then((result) => {
		if (result.value){
			let html = `<br>
			თქვენ , <b>${USER.name}</b> ვალდებული ხართ გადაუხადოთ <b>$${bill}-ი</b>
			საავადმყოფოს. თქვენი მკურნალობა წარმატებით დასრულდა. ყველა დახმარება, რომელიც გეკუთვნოდათ
			<b>სახელმწიფოსგან: ${USER.country}</b> იქნა გამოყენებლი, და ნაწილი მკურნალობის დაფარულია.
			კანონით თქვენ საავადმყოფოს დატოვება შეგიძლიათ მხოლოდ იმის შემდეგ, როდესაც მოხდება თქვენი ხარჯების სრული დაფარვა
			
			<br><br>
			საავადმყოფოში არსებული საბანკო აპარატიდან თქვენ შეგიძლიათ გადარიცხოთ თანხა<br>
			`;
			Swal.fire({
				heightAuto:false,
				icon:"info",
				allowOutsideClick:false,
				title:"ვალდებულების კონტრაქტი",
				html:html,
				confirmButtonText:`გადაიხადე $${bill}-ი`
			}).then((result) => {
				if (result.value){
					forceLoan(bill);
					display();
					message(`თქვენ გადაიხადეთ <b>$${bill}ი</b> თქვენი მკურნალობის თანხა. `);
				}
			});

		}
	});
};






function randomDiseaseEvents(){

	let chance = randint(1,100);
	if (chance > 60){
		disease();
	}

}





