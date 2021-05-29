function checkup(){
	var cost = randint(75,250);
	let html = `<br>
	თანხის გადახდა მოგიწევთ, სანამ ექიმი შეამოწმებს თქვენს
	ჯანმრთელობას <br>ექიმი ავსებს დოკუმენტაციას<br>
	შემოწმების ღირებულება - <b>$${cost}-ი</b><br>
	`;
	Swal.fire({
		heightAuto:false,
		background:swalBackground,
		icon:"info",
		title:"შემოწმება",
		html:html,
		confirmButtonText:`გადახდა $${cost}-ის`,
		showCancelButton:true,
		cancelButtonText:"გადავიფიქრე"
	}).then((result) => {
		if (result.value){
			let hadCheckup = false;
			if (hasMoney(cost)){
				money -= cost;
				hadCheckup = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				hadCheckup = true;
			}
			else {
				
				swalNoMoney.fire();
				
			};
			if (hadCheckup){
				if (hasDisease){
					diseaseCheckup();
				}
				else {
					morale += randint(0,1);
					Swal.fire({
						heightAuto:false,
						title:`თქვენ ხართ ჯანმრთელი!`,
						confirmButtonText:'შესანიშნავია',
						icon:'success',
						text:`თქვენ ჯანმრთელი ხართ!`
					});
				}
			}
			display();
		}

	});
};




function westernMedicine(){
	// cost partially dependent on person's salary
	let cost;
	let html;
	if (hasJob && USER.job.salary <= 3500 ){
		cost = randint(100,500);
		let realCost = randint(500,2000);
		
		html = `<br><br>
		თქვენ იღებთ უფრო იაფ სუბსიდირებულ წამლებს მთავრობისგან,
		თქვენ ხართ საშუალო კლასის მოქალაქე<br>ეკონომიკური კრიზისია<br><br>
		წამლების რეალური ღირებულება ბაზარზე : <b>$${realCost}</b><br>
		სახელმწიფოს მიერ მოწოდებული ფასი : <b>$${cost}</b><br>
		<br><br>`;
	}
	else if (hasJob == false){
		cost = randint(50,250);
		let realCost = randint(500,2000);
		
		html = `<br><br>
		თქვენ იღებთ უფრო იაფ სუბსიდირებულ წამლებს მთავრობისგან,
		თქვენ ხართ უმუშევარი მოქალაქე <br><br>
		წამლების რეალური ღირებულება ბაზარზე : <b>$${realCost}</b><br>
		სახელმწიფოს მიერ მოწოდებული ფასი : <b>$${cost}</b><br>
		<br><br>`;

	}
	else {
		cost = randint(500,2000);

		html = `<br><br>
		წამლის ღირებულება - <b>$${cost}</b><br>
		<br>
		`;
	}
	
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"შავი ბაზარი",
		html:html,
		showCancelButton:true,
		confirmButtonText:`გადაიხადე $${cost}`,
		cancelButtonText:"დაივიწყე"
	}).then((result) => {

		if (result.value){
			let takenMedicine = false;
			if (hasMoney(cost)){
				money -= cost;
				takenMedicine = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				takenMedicine = true;
			}
			else {
				swalNoMoney.fire();
			};

			if (takenMedicine){
				health += randint(1,3);
				message(`თქვენ დახარჯეთ $${cost}-ი შავ ბაზარზე`);

				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:'შავ ბაზარზე ნაყიდი წამალი მიიღეთ!',
					text:'თქვენ ჯანმრთელად გრძნობთ თავს',
					confirmButtonText:'გამოსვლა'
				})
			};
			display();
		}
	});


};

function dentist(){
	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"კბილის ექიმი",
		text:"მიმდინარეობს მუშაობა, განახლების ზუსტი თარიღი უცნობია!"
	});
};








function plasticSurgery(){
	let max = 30000;
	let min = 5000;
	let cost = randint(min,max);
	let html = `<br><br>
	ოპერაციის ღირებულება - <b>$${cost}</b><br>
	წარმატების შანსი - <b>80%</b><br>
	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:"info",
		title:"პლასტიკური ოპერაცია",
		html:html,
		showCancelButton:true,
		confirmButtonText:`გადაიხადე $${cost}`,
		cancelButtonText:"გადავიფიქრე"
	}).then((result) =>{
		if (result.value){
			let gotPlasticSurgery = false;
			if (hasMoney(cost)){
				money -= cost;
				gotPlasticSurgery = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				gotPlasticSurgery = true;
			}
			else {
				swalNoMoney.fire();
			};

			if (gotPlasticSurgery){
				let randNum = randint(0,4);
				if (randNum != 4){
					message(`თქვენი პლასტიკური ოპერაცია წარმატებით დასრულდა`);
					looks += randint(5,12);
					Swal.fire({
						heightAuto:false,
						icon:'success',
						title:'წარმატებული ოპერაცია!',
						text:`თქვენი პლასტიკური ოპერაცია წარმატებით დასრულდა და თქვენ გამოგწერეს სახლში`,
						confirmButtonText:'მაგარია'
					});

				}
				else if (randNum == 4){
					message(`ექიმებმა პლასტიკური ოპერაციის მიმდინარეობისას კრიტიკული შეცდომა დაუშვეს`);
					looks -= randint(4,8);
					Swal.fire({
						heightAuto:false,
						icon:'error',
						title:'აუჩ! მტკივნეულია!',
						text:`თქვენ ცხვირი საერთოდ აღარ გაქვთ`,
						confirmButtonText:'რაქენი ექიმო ეს?!'
					});
				}
			}

			display()
		};
	});


};





function therapy(){
	if (hasDepression){
		var cost = randint(200,600);

		let html = `<br><br>
		თერაპიის ღირებულება: <b>$${cost}</b><br><br>
		თქვენ განიკურნეთ დეპრესიისგან.
		<br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"question",
			title:"თერაპიის სესია",
			html:html,
			confirmButtonText:`გადაიხადე $${cost}`,
			showCancelButton:true,
			cancelButtonText:"გადავიფიქრე"
		}).then((result)=> {
			if (result.value){
				let hadTherapy = false;

				if (hasMoney(cost)){
					money -= cost;
					hadTherapy = true;
				}
				else if (hasMoneyInBank(cost)){
					bankTransaction(-cost);
					hadTherapy = true;

				}
				else {
					swalNoMoney.fire();
					hadTherapy = false;

				};


				if (hadTherapy){
					message(`დეპრესიის თერაპიული სესიაზე იმყოფებით`);
					morale += randint(1,4);

					Swal.fire({
						heightAuto:false,
						title:'დეპრესიის თერაპია',
						text:'თქვენ დეპრესიის თერაპიის სესია გქონდათ. ახლა თავს უკეთ გრძნობთ.',
						icon:'success',
						confirmButtonText:'ნაყინი მინდა'
					});

				}



				display();
			}

		});
	}


	else if (!hasDepression){
		let html = `<br><br>
		არ ჩანს, რომ დეპრესიით ხართ დაავადებული.<br>
		თქვენ არ გჭირდებათ დეპრესიის თერაპიის გავლა ჯანმრთელი ხართ!<br><br>
		`
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"დეპრესიაზე თერაპია არ გჭირდებათ",
			html:html,
			confirmButtonText:"ოკე"
		});
	}
};




function depression(){

	hasDepression = true;
	message(`თქვენ გაქვთ დეპრესია`);
	let html = `
	<br> დეპრესია კიდევ ერთ ადამიანს დაემართა, ამჯერად
	ეს შენ ხარ.<br>
	თქვენი დაბალი მორალი არის მიზეზი იმისა თუ რატომ ხართ დეპრესიაში, დროზე! გაიარეთ თერაპია.<br>
	`;
	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"თქვენ გაქვთ დეპრესია.",
		html:html,
		confirmButtonText:"არა არ მაქვს"
	});

}



function cureDepression(){
	has_depression = false;
	message(`თქვენ დეპრესიაზე ძლიერი აღმოჩნდით და თავი დაახწიეთ მას`);

	let html = `<br><br>
	თქვენ ეს შეძელით.<br>
	თქვენ დაამარცხეთ დეპრესია.<br>		

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"თქვენ დაამარცხეთ დეპრესია!",
		confirmButtonText:"მაგარია!",
		html:html,
		allowOutsideClick:false
	});

}


function EffectOfdepression(){

	let chance = randint(1,100);
	if (chance >= 5){
		message(`მეტის ატანა აღარ შეგიძლიათ, თქვენ ამას ვეღარ უძლებთ მუდმივად სუიციდზე ფიქრობთ.`);
		message(`თქვენ წერილი ფურცელზე დაწერეთ და ფანჯრის რაფაზე დადეთ, თუმცა ფანჯარა ღია დაგრჩათ და ის ქარმა წაიღო. თქვენ ჩინეთში თვითმკვლელთა ტყეში დაასრულეთ სიცოცხე, თქვენი გვამი იუთუბერმა გადაიღო,(კაი ხო ნამეტანი მოგვივიდა :D)`);
		death();
	};


}






function diseaseCheckup(){
	
	let allDiseases = Object.keys(diseases);
	let diseaseName = allDiseases[0];
	let diseaseObj = diseases[allDiseases];
	let diseaseLevel = diseaseObj.level;
	diseaseObj.detected = true;
	let cost;
	let successChance;

	if (diseaseLevel == 1){
		cost = randint(500,1500);
		successChance = randint(90,100);
	}
	else if (diseaseLevel == 2){
		cost = randint(1000,4500);
		successChance = randint(70,95);
	}
	else {
		cost = randint(2000,5000);
		successChance = randint(35,60);
	};
	

	let html = `<br><br>
	თქვენ დაგიდგინდათ დაავადება <b>${diseaseName}</b><br><br>
	დაავადების ავკარგიანობა : <b class='w3-text-red'>${diseaseObj.severity}</b><br>
	მკურნალობის ღირებულება : <b>$${cost}</b><br>
	წარმატების შანსი : ${successChance}%

	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:'info',
		title:'დაავადება გამოვლენილია',
		html:html,
		showCancelButton:true,
		confirmButtonText:`გადაიხადე $${cost}`,
		cancelButtonText:`ჩემითაც გადავრჩები`
	}).then((result) => {
		if (result.value){
			let gotTreatment = false;

			if (hasMoney(cost)){
				money -= cost;
				gotTreatment = true;
			}
			else if (hasMoneyInBank(cost)){
				bankTransaction(-cost);
				gotTreatment = true;
			}
			else {
				swalNoMoney.fire();
				gotTreatment = false;
			};

			if (gotTreatment){
				let chance = randint(1,100);
				if (successChance > chance){
					diseaseOver(diseaseName);
					message(`თქვენ წარმატებით გაიარეთ სამკურნალო კურსი, და ახლა ჯანმრთელი ხართ ${diseaseName}-სგან`);
					morale += randint(2,4);

					Swal.fire({
						heightAuto:false,
						icon:'success',
						title:'ნახვამდის ავადმყოფობავ!',
						text:`თქვენ გიმკურნალეს ${diseaseName}-სგან`,
						confirmButtonText:'ოჩინ ვერი ნაის!'
					})
				}
				else {
					message(`მკურნალობა ${diseaseName} წარუმატებელი აღმოჩნდა`);
					morale -= randint(1,3);

					Swal.fire({
						heightAuto:false,
						icon:'error',
						title:'უირბლო ინდივიდუალო',
						text:`მკურნალობა ${diseaseName} უშედეგო აღმოჩნდა `,
						confirmButtonText:'ოო არა'
					});

				}
			}
		display();

		}
	});


};



function disease(){
	diseaseCount += 1;
	hasDisease = true;

	let randChance = randint(1,100);
	let diseaseLevel = 1; // 1 : lowest & 3 : hardest
	let diseaseSeverity;
	let randDisease;
	let persistTime;

	if (randChance <= 65){
		diseaseLevel = 1;
		diseaseSeverity = "დაბალი";
		persistTime = randint(1,3);
		message(`თქვენ თავს არ გრძნობთ კარგად`);
	
	}
	else if (randChance > 65 && randChance <= 90){
		diseaseLevel = 2;
		diseaseSeverity = "Medium";
		persistTime = randint(2,8);
		message(`თითქოს თავს ცუდათ გრძნობთ`);
	
	}
	else {
		diseaseLevel = 3;
		diseaseSeverity = "High";
		persistTime = randint(6,36);
		message(`ყოველდღიური საქმიანობის განხორციელებაც გიჭირთ, ნამდვილად ცუდათ ხართ.`);

	};

	randDisease = randomDisease(diseaseLevel);

	let alreadyHasDiseases = Object.keys(diseases);
	if (alreadyHasDiseases.includes(randDisease)){
		disease();
	};


	diseases[randDisease] = {
		severity:diseaseSeverity,
		level:diseaseLevel,
		persistsFor:persistTime,
		monthsSince:0,
		detected:false
	}


}




function randomDisease(diseaseLevel){

	const allDiseases = {

		1:['გაცივება','სიცხე','პიროვნების გაორება',
		'მუცლის ტკივილი','ალერგია','ექზემა',
		'ფსორიაზი','შაკიკი','ტრაწი','საჭმლისგან მოწამვლა','აშლილობა',
		'ტიფი','გრიპი'],

		2:['ინდური Covid-19','მენინგიტი','ქლამიდეა','ჰერპესი',
		'ტუბერკულიოზი','სმენის დაკარგვა','მონონუკლეოზი',
		'გრიპი A','გრიპი B','სიფილისი',
		'გენდერული გაორება','ჰეპატიტი','ართრიტი','მენინგიტი',
		'სკლეროზე','ლალი პავლოვნა','მალარია'],

		3:['კიბო','დემენტია','HIV/AIDS-ი','Სისხლის მაღალი წნევა',
		'დიაბეტი','ალცჰაიმერი','ლალი პავლოვნა მძიმე ფორმაში','თირკმლის გათიშვა',
		'გულის შეტევა','გულის დაავადება','სასტიკი კოვიდ -19']
	}

	let listLength = allDiseases[diseaseLevel].length;
	let randDisease = allDiseases[diseaseLevel][randint(0,listLength-1)];
	
	return randDisease; 
	

}



function diseaseEvents(){
	let allDiseases = Object.keys(diseases);

	allDiseases.forEach(diseasePersistence);
	allDiseases.forEach(diseaseEffect);

	function diseasePersistence(diseaseName,index){

		let diseaseObj = diseases[diseaseName];
		diseaseObj.monthsSince += 1;
		if (diseaseObj.monthsSince >= diseaseObj.persistsFor){
			diseaseOver(diseaseName);
			allDiseases.splice(index);
		}		
	};


	function diseaseEffect(diseaseName){

		let diseaseLevel = diseases[diseaseName]['სირთულე'];
		if (diseaseLevel == 1){ //low
			health -= randint(1,2);
		}
		else if (diseaseLevel == 2){ //moderate
			health -= randint(1,3);
			morale -= randint(1,2);
			looks -= randint(0,1);
		}
		else if (diseaseLevel == 3){ //high
			health -= randint(2,3);
			morale -= randint(1,2);
			looks -= randint(1,2);
			intellect -= randint(0,1);

		}
	}

}


function diseaseOver(diseaseName){
	
	let diseaseDetected = diseases[diseaseName]['შემჩნეულია'];
	if (diseaseDetected){
		message(`თქვენ აღარ ხართ დაავადებული: <b>${diseaseName}</b>-სგან`);
	}
	diseaseCount -= 1;


	delete diseases[diseaseName];

}





