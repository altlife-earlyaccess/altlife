function jailMenu(){

	let html = `<br><br>
	ციხეში გატარებული დრო: : <b>${jailDurationSpent}</b> თვე<br>
	დარჩენილი დრო: : <b>${jailDuration}</b> თვე<br><br>

	თქვენ ზიხართ ${USER.country}-ის ციხეში<br><br>
	${buttons.profile}

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"აქტივობა(ციხეში)",
		showConfirmButton:false,
		showCloseButton:true,
		html:html

	});

};






function jail(months){



	
	jailDuration = months;

	let html = `<br><br>
	სავარუადო სასჯელი: <b>${jailDuration}</b> თვე<br><br>

	თქვენ შეგიძლიათ, აღიაროთ დანაშაული და ჩაჯდეთ ან უარყოთ და თავი დაიცვათ

	<br><br>`;


	Swal.fire({
		heightAuto:false,
		title:`თქვენ მოგესაჯათ პატიმრობა`,
		icon:"warning",
		html:html,
		allowOutsideClick:false,
		showCancelButton:true,
		cancelButtonText:"მიიღეთ სასჯელი",
		confirmButtonText:"გაასაჩივრეთ"

	}).then((result)=>{
		if (result.value){
			jailAppeal(jailDuration);
		}
		else if (result.dismiss === Swal.DismissReason.cancel){
			jailSentence();
		}
		else {
			jailSentence();
		}
	});

};







function jailSentence(){

	if (isStudent){
		message("თქვენ უნივერსიტეტიდან, გამოგაგდეს, მსჯავრდებულს სწავლა არ შეუძლია, თქვენ ჩამოგერთვათ, უნივერსიტეტში სწავლის უფლება");
		isStudent = false;
		
	}
	else if (hasJob){
		message("თქვენ გაგანთავისუფლეს სამსახურიდან");
		hasJob = false;

	}
	isJailed = true;
	USER.job.name = "პატიმარი"
	message(`თქვენ ახლა იხდით სასჯელს პატიმრობა მოსჯილი გაქვთ ${jailDuration} თვით. `);
	

	HTML.actions.setAttribute('onclick','jailMenu()');
	HTML.actions.classList = [];
	HTML.actions.classList.add('btn-main','btn-black');

	$("#activities-btn").hide();
	
}





function jailAppeal(months){

	var privateDefenderCost = randint(10000,25000);

	let html = `<br><br>
	სახელმწიფოს მიერ დანიშნული ადვოკატი : <b>უფასოდ</b><br>
	კერძო ადვოკატი : <b>$${privateDefenderCost}</b><br><br>
	
კერძო დამცველს გაცილებით მეტი შანსი აქვს გიხსნათ ბრალდებისგან.
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:`გასაჩივრება`,
		html:html,
		allowOutsideClick:false,
		showCancelButton:true,
		cancelButtonText:`სახაზინო ადვოკატი`,
		confirmButtonText:`კერძო ადვოკატი`,
	}).then((result) => {
		if (result.value){
			// private defender
			let hiredDefender = false;
			if (hasMoney(privateDefenderCost)){
				money -= privateDefenderCost;
				hiredDefender = true;

			}
			else if (hasMoneyInBank(privateDefenderCost)){
				bankTransaction(-privateDefenderCost);
				hiredDefender = true;
			}
			else {
				hiredDefender = false;
				Swal.fire({
					heightAuto:false,
					icon:"warning",
					title:"არასაკმარისი თანხა!",
					text:"თქვენ არ გაქვთ საკმარისი თანხა, რომ დაიქირაოთ კერძო ადვოკატიr"
				}).then((result) => {
					jail(jailDuration);
				});
			};

			if (hiredDefender){
				message(`თქვენ დაიქირავეთ კერძო ადვოკატი$${privateDefenderCost}`);
				jailAppealResult('private');
			}


			display();

		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			// public defender
			message(`თქვენ სასამართლომ სახაზინო ადვოკატი დაგინიშნათ უფასოდ`);
			jailAppealResult('საჯარო');
		};
	});

};





function jailAppealResult(defenderType){

	let chance = randint(1,100);
	let saved = false;

	if (defenderType == "კერძო"){
		let randChance = randint(35,65);
		
		if (chance > randChance){
			saved = false;
		}
		else {
			saved = true;
		}
	}
	else {
		
		let randChance = randint(10,15);
		if (chance > randChance){
			saved = false;
		}
		else {
			saved = true;
		}

	};



	if (saved){
		message(`თქვენ მოიგეთ საქმე სასამართლოში, და თქვენ ფორმალური პროცედურების გავლის შემდეგ განგათავისუფლებენ.`);
		Swal.fire({
			heightAuto:false,
			title:'თქვენ მოიგეთ პროცესი!',
			text:'თქვენი ადვოკატის დამსახურებით, თქვენ პატიმრობა აღარ გემუქრებათ.',
			confirmButtonText:'შესანიშნავია',
			icon:'success'
		});
		jailDuration = 0;


	}
	else {
		message(`თქვენ წააგეთ დავა სასამართლოსთან`);
		Swal.fire({
			heightAuto:false,
			title:`ციხე გელის!`,
			text:`შენ წააგე სისხლსი სამართლის საქმე, შენ მოგესაჯა პატიმრობა ${jailDuration} თვე`,
			icon:'error',
			allowOutsideClick:false,
			confirmButtonText:'ოო არა.'
		}).then(() => {
			jailSentence();
		});
	};


};


function jailOver(){

	message(`სასჯელი მოხდილია`);

	let html = `<br><br>
	თქვენ მოიხადეთ პატიმრობა <b>${jailDuration}</b> თვე<br>
	ახლა უკვე თავისუფალი ხარ! დროა ცხოვრება თავიდან დაიწყო
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:'სვაბოდააა',
		html:html,
		icon:'success',
		confirmButtonText:'ძლივს',
		allowOutsideClick:false
	});

	isJailed = false;
	USER.job.name = "უმუშევარი";

	
	HTML.actions.setAttribute('onclick','actions()');
	HTML.actions.classList = [];
	HTML.actions.classList.add('btn-main','btn-dark');

	$("#activities-btn").show();

};









function jailEvents(){
	jailDurationSpent += 1;
	if (jailDuration == jailDurationSpent){
		jailOver();
	};

	

};


