function monthlyBudgetEvents(){

	if (!isJailed && !isStudent){
		let budgetMessage;
		monthsSinceLastBudgetUpdate += 1;
		if (monthsSinceLastBudgetUpdate >= 3){
			monthsSinceLastBudgetUpdate = 0;
			budgetAmount = calculateMonthlyBudget();
			if (budgetAmount > setBudgetAmount){
				message(`თქვენ უნდა გაზარდოთ თქვენი არსებული(ყოველდღიური) ბიუჯეტი, რათა დააკმაყოფილთ თქვენი ყოველდღიური მოთხოვნები`);
			}
		};

		if (fetchBankBalance() > setBudgetAmount){
			bankTransaction(-setBudgetAmount);
			budgetMessage = `გადასახადების დროა $${setBudgetAmount} თქვენ გადასახადი ჩამოჭრილი იქნა თქვენი ბანკის ანგარიშიდან`;
		}
		else if (fetchBankBalance() < setBudgetAmount && money >= setBudgetAmount){
			money -= setBudgetAmount;
			budgetMessage = `გადასახადების დროა, $${setBudgetAmount}-ი გადაიხადეთ თქვენი საცხოვრებელი სახლის მოპირდაპირე მხარეს არსებული სწრაფი გადახდის აპარატიდან`;
		}
		else if (fetchBankBalance() < setBudgetAmount && money < setBudgetAmount){
			let msg = `ფულის ნაკლებობის გამო , თქვენ მოგიწიათ სესხის აღება $${setBudgetAmount}-ი, იმიტომ რომ შეძლოთ ცხოვრება,`;
			forceLoan(setBudgetAmount,msg);
			budgetMessage = `თქვენ გადაიახადეთ ამ თვის გადასახადი აღებული სესხით $${setBudgetAmount}`;
			// alert user using new beta feature [IMPORTANT]

		};






		message(budgetMessage);

		if (setBudgetAmount < budgetAmount){
			health -= randint(0,2);
			morale -= randint(1,2);

		}
		display();


	};

 	//maybe also set for student

}




function budget(){

	let html = `<br><br>
	<h4>არსებული ბიუჯეტი : <b>$${setBudgetAmount}</b></h4><br><br>
	<h4>რეკომენდირებული ბიუჯეტი : <b>$${budgetAmount}</b></h4><br><br><br>
	<button onclick="modifyBudget()" class="btn btn-success">დააკორექტირე შენი ბიუჯეტი</button>
	<br><br>
	`;

	Swal.fire({
		heightAuto:false,
		title:"ამ თვის ბიუჯეტი",
		html:html,
		showConfirmButton:false,
		showCloseButton:true
	});


};



function modifyBudget(){

	let html = `
	<h4>არსებული ბიუჯეტი : <b>$${setBudgetAmount}</b></h4><br><br>
	<h4>რეკომენდირებული ბიუჯეტი : <b>$${budgetAmount}</b></h4><br><br>
	`;

	Swal.fire({
		heightAuto:false,
		title:"ბიუჯეტის კორექტირება",
		html:html,
		icon:"info",
		showCancelButton:true,
		confirmButtonText:"დააკორექტირე",
		cancelButtonText:"გამოსვლა",
		input:"text",
		inputValue:budgetAmount,
		inputValidator: (val) => {
			let isnum = /^\d+$/.test(val);

			if (isnum && val >= 100){
				message(`შენ შეცვალა შენი ამ თვისთვის განკუთვნილი ბიუჯეტი <b>$${val}</b>`);
				Swal.fire({
					heightAuto:false,
					icon:"success",
					title:`ამ თვის ბიუჯეტი შეიცვალა $${val}-ით`,
					confirmButtonText:"მშვენიერია"
				});
				setBudgetAmount = val;
			}
			else if (!val){
				return `გთხოვთ დააკონკრეტეთ თანხა`
			}
			else if (!isnum){
				return `არასწორად! გაქვთ შეყვანილი თანხის რაოდენობა`
			}
			else if (val < 250){
				return `გაითვალისწინე ბიუჯეტი ვერ იქნება 250 დოლარზე ნაკლები`
			}
			else {
				return `გამოიყენეთ მხოლოდ რიცხვები!`
			};
		}
	});
};







