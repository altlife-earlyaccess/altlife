

function bank(){

	let html = `<br><br>
	${buttons.bankAccount}
	<br><br>
	${buttons.loanServices}
	
	<br><br>`;



	Swal.fire({
		heightAuto:false,
		title:"ეროვნული ბანკი",
		html:html,
		showConfirmButton:false
	})

}





function bankAccount(){

	let loanStatus;
	let bal = BANK.balance;

	if (hasLoan){
		loanStatus = `კრედიტის სტატუსი : <i class="t-red">არის დავალიანება</i>`
	
	}
	else {
		loanStatus = `კრედიტის სტატუსი : <i class="t-green">არ არის დავალიანება</i>`
	
	};
	
	if (BANK.balance < 0){
		bal = `<span class="t-red">$${BANK.balance}</span>`;
	}


	let html = `<br><br>
	მფლობელი : ${USER.name}<br>
	ბანკის ბარათის ID : ${BANK.id}<br>
	შესრულებული ტრანზაქციები : ${BANK.transactions}<br>
	არსებული დავალიანება(კრედიტი) : <b>$${BANK.loan}</b><br><br><br>

	<h5>ბალანსზე არსებული თანხა  : <b>$${bal}</b></h5><br><br>
	
	${loanStatus}<br><br><br>
	${buttons.deposit}&nbsp;&nbsp;&nbsp;
	${buttons.withdraw}
	<br><br><br>`;
	
	Swal.fire({
		heightAuto:false,
		title:`ეროვნული ბანკი`,
		html:html,
		position:top,
		showConfirmButton:false,
		showCloseButton:true
	})

}


function loanServices(){

	let html = `<br>
	<h4> არსებული დავალიანება : <b>$${BANK.loan}</b>
	<br><br><hr>
	<button onclick="loan()" class="w3-btn w3-red w3-large">კრედიტის აღება</button>
	<button onclick="repay_loan()" class="w3-btn w3-green w3-large">კრედიტის დაფარვა</button>
	<br><br>
	`

	Swal.fire({
		heightAuto:false,
		title:"სესხის გაცემის განყოფილება",
		html:html,
		confirmButtonText:"ბანკში დაბრუნება"
	}).then((result) => {
		if (result.value){
			bank();
		}

	});


}


function loan(){

	if (hasJob){

		var max_loan_amt = Math.floor(USER.job.salary*12)*4 - BANK.loan;
	}
	else {
		var max_loan_amt = 20000 - BANK.loan;
	}
	let html = ` <br>
	ბალანსი : <b>$${BANK.balance}</b><br>
	არსებული დავალიანება : <b>$${BANK.loan}</b><br>
	წლიური ხელფასი : <b>$${Math.floor(USER.job.salary*12)}</b><br><br>

	მაქსიმალური კრედიტის რაოდენობა : <b>$${max_loan_amt}</b><br>
	`;
	
	Swal.fire({
		heightAuto:false,
		title:`${USER.country} სესხის გაცემის განყოფილება`,
		html:html,
		position:top,
		showCancelButton:true,
		confirmButtonText:"დამუშავება",
		cancelButtonText:"გადავიფიქრე"
	}).then((result) => {

		if (result.value){
			loan_money(max_loan_amt);
		}
		else if (result.dismiss == Swal.DismissReason.cancel){
			bank();
		}

	});


}


function loan_money(max_loan_amt){

	let html = `
	<br>
	შენ კრდიტის აღების პროცესში ხარ.<br>
	მოთხოვნილი თანხის რაოდენობა მალე ჩაირიცხება თქვენს ანგარიშზე.<br>
	პროცენტი  : <b>2% / თვე</b><br><br> 


	`
	Swal.fire({
		heightAuto:false,
		title:"კრედიტ ოფისი",
		position:top,
		html:html,
		showCancelButton:true,
		cancelButtonText:"უარის თქმა",
		confirmButtonText:"დეკლარირება",
		input:"text",
		inputValue:10000,
		inputValidator: (val) => {

			let isnum = /^\d+$/.test(val);
			
			if (isnum && val < 2500){
				return "მინიმალური კრედიტის რაოდენობა $2500";
			}
			else if (!isnum){
				return "გთხოვთ! შეიყვანოთ მხოლოდ რიცხვი!";
			}
			else if (!val){
				return "გთხოვთ! შეიყვანოთ რაოდენობა";
			}
			else if (isnum && val > max_loan_amt){
				return `მაქსიმუმ გასესხებადი თანხა არის $${max_loan_amt}`;
			}
			else if (isnum && val >= 2500){
				process_loan(val);
			}
			else {
				return "გთხოვთ შეიყვანოთ ადეკვატური რაოდენობა";
			}
		}
	});
}




function process_loan(amount){
	var amount = parseInt(amount);
	BANK.balance += amount;
	BANK.loan += amount;
	hasLoan = true;
	message(`თქვენი მოთხოვნა კრედიტზე $${amount} დამუშავდა`);
	message(`მოთხოვნილი თანხა დაჯდა თქვენს საბანკო ანგარიშზე`);

	let html = `
	თანხა გასესხდა : <b>$${amount}</b><br>
	გასესხებული თანხა დაჯდა თქვენს საბანკო ანგარიშზე.<br>

	`
	Swal.fire({
		heightAuto:false,
		title:"Loan სესხი გაცემულია",
		icon:"success",
		html:html,
		confirmButtonText:"დამუშავება",
		allowOutsideClick:false,

	}).then((result) => {

		if (result.value){
			loan_certificate(amount);

		}

	})

}



function loan_certificate(amount){

	let html = `
	<h3> ${USER.country} ეროვნული ბანკი </h3><br><hr><br>

	ეს კონტრაქტი დაიდო ეროვნული ბანკის მომხმარებელ <b>${USER.name}</b> ,
	კლიენტმა ${USER.country} ეროვნული ბანკიდან გაიტანა კრედიტი:
	რომელიც შეადგენს - <b>$${amount}</b> დეკლარირებული პროცენტი
	<b>2%</b> სრული რაოდენობისა / თვეში.<br><br>
	<hr>
	<u>კონტრაქტის მიხედვით მომხმარებელმა აუცილებლად უნდა დაფაროს კრედიტი,
	წინააღმდეგ შემთხვევაში ვალის გადანაწილება და დაგროვება მოხდება ყოველ თვიურად.</u>
	<br><br>
	<hr>
	ბანკის მიერ ნაკისრები მოვალეობა სრულდება და თანხა ჯდება მომხმარებლის ანგარიშზე's 
	<b>${USER.country} ეროვნული ბანკის</b> საცავიდან.
	<br><br>
	კონტრაქტის გაფორმებით, შენ თანხმდები მოცემულ პირობებს<b> მოთხოვნებს & პირობებს </b>
	 ${USER.country} ეროვნული ბანკისა.<br><br>
	`
	Swal.fire({
		heightAuto:false,
		title:"ხელშეკრულება ფიზიკური პირის საბანკო ოპერაციების წარმოების შესახებ",
		html:html,
		confirmButtonText:"კონტრაქტის გაფორმება",
		allowOutsideClick:false,
		position:top,
		footer:"ყურადღება : არ დაგავიწყდეთ კრედიტის დაფარვა, ბანკში კრედიტის განყოფიელბაში."
	});

}




function repay_loan(){

	if (hasLoan){
		let html = `
		<br>
		შენ ეტაპობრივად იხდი შენს საბანკო დავალიანებას.<br>
		გაითვალისწინე, რომ თანხა უნდა იქნას ბანკის ანგარიშზე შეტანილი და მხოლოდ შემდეგ შეგიძლია კრედიტის დაფარვა.<br>
		<br>არსებული დავალიანება : <b>$${BANK.loan}</b><br>	

		`
		Swal.fire({
			heightAuto:false,
			title:"საკრედიტო განყოფილება",
			position:top,
			html:html,
			showCancelButton:true,
			cancelButtonText:"უარის თქმა",
			confirmButtonText:"Authorize",
			input:"text",
			inputValue:2500,
			inputValidator: (val) => {

				let isnum = /^\d+$/.test(val);
			
				if (isnum && val < 2500){
					return "მინიმალური თანხა კრედიტის დასაფარად $2500-ია";
				}
				else if (!isnum){
					return "გთხოვთ აპარატში შეიყვანეთ მხოლოდ რიცხვი";
				}
				else if (!val){
					return "გთხოვთ შეიყვანეთ თანხის რაოდენობისა";
				}
				else if (val >= 2500 && BANK.balance >= val){
					repay_amount(val);
				}
				else if (val >= 2500 && BANK.balance < val){
					return "თქვენს ანგარიშზე არ ფიქსირდება საკმარისი თანხა";
				}
				else {
					return "გთხოვთ შეიყვანეთ თანხის სწორი რაოდენობა";
				}
			}
		});

	}
	else {
		Swal.fire({
			heightAuto:false,
			icon:"error",
			title:"თქვენს სახელზე სესხი არ არის გაცემული!",
			confirmButtonText:"ბანკში დაბრუნება"
		}).then((result) => {
			if (result.value){
				bank();
			}

		})
	}

}



function repay_amount(amount){

	var amount = parseInt(amount);
	if (amount > BANK.loan){
		amount = BANK.loan;
	}
	BANK.balance -= amount;
	BANK.loan -= amount;
	if (BANK.loan <= 0){
		hasLoan = false;
	}

	message(`შენ გადაიხადე $${amount} არსებული სესხიდან`);

	let html = `
	<br>
	კრედიტიდან, დაფარულია : <b>$${amount}</b><br>
	დარჩენილი, კრედიტი : <b>$${BANK.loan}</b><br>
	`;

	Swal.fire({
		heightAuto:false,
		icon:"success",
		title:"კრედიტის გადახდა",
		html:html,
		confirmButtonText:"გამოსვლა"
	});

}



function deposit(){
	let html = `<br>
	<h4>ბანკის ანგარიში : <b>$${BANK.balance}</b></h4><br><br><br>
	ანგარიშზე შეტანილი თანხა, ყოველთვიურად გაიზრდება <b>1%</b> /month<br>
	<h5> შეიტანე თანხა</h5>
	`

	Swal.fire({
		heightAuto:false,
		title:`${USER.country} ეროვნული ბანკი`,
		position:top,
		html:html,
		confirmButtonText:"დადასტურება",
		showCancelButton:true,
		cancelButtonText:"უარყოფა",
		input:"text",
		inputValue:500,
		inputValidator: (val) => {

			let isnum = /^\d+$/.test(val);
			
			if (isnum && val < 500){
				return "მინიმალური შესატანი თანხა $500";
			}
			else if (isnum && val >= money){
				return "არ გაქვს ამდენი თანხა ხელზე";
			}
			else if (!isnum){
				return "გთხოვთ შეიყვანოთ მხოლოდ რიცხვი";
			}
			else if (!val){
				return "გთხოვთ შეიყვანოთ რაოდენობა";
			}
			else if (isnum && val >= 500){
				deposit_money(val);
			}
			else {
				return "გთხოვთ შეიყვანოთ სწორი რაოდენობა";
			}
		}
	});

}


function deposit_money(amount){
	var amount = parseInt(amount);
	money = money - amount;
	BANK.balance = BANK.balance + amount;
	BANK.transactions += 1;

	display()
	message(`თქვენ შეიტანეთ $${amount} თქვენი ბანკის ანგარიშზე`);


	let html = `<br>
	თქვენ შეიტანეთ თანხა თქვენს ანგარიშზე ${USER.country} ეროვნული ბანკი მადლობას გიხდით ნდობისთვის.<br><br>
	შეტანილი რაოდენობა : <b>$${amount}</b><br><br><br>
	<h4>ანგარიშზე დაჯდა : <b>$${BANK.balance}</b></h4><br><br>
	`
	Swal.fire({
		heightAuto:false,
		title:"წარმატებული ტრანზაქცია",
		icon:"success",
		html:html,
		confirmButtonText:"გმადლობთ!"
	});

}




function withdraw(){

	let html = `<br>
	<h4>ბანკის ბალანსი : <b>$${BANK.balance}</b></h4><br><br>

	<h5> თანხის გამოტანა </h5>
	`

	Swal.fire({
		heightAuto:false,
		title:`${USER.country} ეროვნული ბანკი`,
		position:top,
		html:html,
		confirmButtonText:"დაადასტურე ტრანზაქცია",
		showCancelButton:true,
		cancelButtonText:"გაუქმება",
		input:"text",
		inputValue:250,
		inputValidator: (val) => {

			let isnum = /^\d+$/.test(val);
			
			if (isnum && val < 250){
				return "მინიმალური გამოსატანი თანხა $250";
			}
			else if (isnum && val > BANK.balance){
				return "არ გაქვს საკმარისი რაოდენობა ანგარიშზე";
			}
			else if (!isnum){
				return "გთხოვთ მხოლოდ რიცხვები შეიყვანოთ";
			}
			else if (!val){
				return "გთხოვთ შეიყვანეთ რაოდენობა";
			}
			else if (isnum && val >= 250){
				withdraw_money(val);
			}
			else {
				return "გთხოვთ შეიყვანეთ მთელი რიცხვი";
			}
		}
	});



}


function withdraw_money(amount){

	var amount = parseInt(amount);
	money = money + amount;
	BANK.balance = BANK.balance - amount;
	BANK.transactions += 1;

	display()
	message(`თქვენ გამოიტანეთ $${amount} თქვენი ბანკის ანგარიშიდან`);


	let html = `<br>
	თქვენ გამოიტანეთ თანხა თქვენი ${USER.country} ეროვნული ბანკის ანგარიშიდან.<br><br>
	გამოტანილი თანხა : <b>$${amount}</b><br><br><br>
	<h4>ბანკის ანგარიში : <b>$${BANK.balance}</b></h4><br><br>
	`
	Swal.fire({
		heightAuto:false,
		title:"წარმატებული ტრანზაქცია",
		icon:"success",
		html:html,
		confirmButtonText:"მადლობა"
	});


}



function bankTransaction(amount){
	BANK.transactions += 1;
	BANK.balance += amount;
	BANK.transactionsList.push(amount);
	if (amount > 0){
		message(`$${amount} დაემატა თქვენს ანგარიშზე`);
	}
	if (amount < 0){
		let msg = `$${amount} ჩამოიჭრა თქვენი ანგარიშიდან`.replace('-','');
		message(msg);
	}
}
















function forceLoan(amt,msg=null){
	BANK.transactions += 1;
	BANK.loan += Number(amt);
	hasLoan = true;

	if (msg == null){
		 message(`თქვენ მოგიწიათ საარსებო სესხის აღება. $${amt}`);
	}
	if (msg != null){
		message(msg);
	}
}