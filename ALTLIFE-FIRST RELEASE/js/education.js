const educationButtons = {

	engineeringBtn:`<button class="btn btn-info" onclick="college('engineering')">ინჟინერიის უნივერსიტეტი</button>`,
	liberalArtsBtn:`<button class="btn btn-info" onclick="college('liberalArts')">ხელოფნების უნივერსიტეტი</button>`,
	commerceBtn:`<button class="btn btn-info" onclick="college('commerce')">მარკეტინგის უნივერსიტეტი</button>`,
	lawBtn:`<button class="btn btn-success" onclick="college('law')">სამართლის უნივერსიტეტი</button>`,
	medicalBtn:`<button class="btn btn-success" onclick="college('medical')">სამედიცინო უნივერსიტეტი</button>`,
	communityBtn:`<button class="btn btn-success" onclick="college('community')">საჭარო უნივერსიტეტი</button>`,

}

const courses = {

	engineering:{
		title:'ინჟინერიის უნივერსიტეტი',
		req:75,
		scholarship:85,
		fees:[35000,37000,38000,40000],
	
	},

	medical:{
		title:'სამედიცინო უნივერსიტეტი',
		req:80,
		scholarship:90,
		fees:[40000,42000,44000,45000],
	
	},

	commerce:{
		title:'მარკეტინგის უნივერსიტეტი',
		req:70,
		scholarship:85,
		fees:[28000,30000,32000,35000],
	
	},

	law:{
		title:'სამართლის უნივერსიტეტი',
		req:70,
		scholarship:85,
		fees:[30000,32000,35000,40000],
	
	},

	liberalArts:{
		title:'ხელოვნების უნივერსიტეტი',
		req:60,
		scholarship:80,
		fees:[20000,22000,24000,25000],
	
	},

	community:{
		title:'საჯარო უნივერსიტეტი',
		req:40,
		scholarship:75,
		fees:[12000,15000,18000,20000],
	}


}






function study(){
	let html = `<br><br>
		${educationButtons.engineeringBtn}<br><br>	
		${educationButtons.medicalBtn}<br><br>
		${educationButtons.commerceBtn}<br><br>
		${educationButtons.lawBtn}<br><br>
		${educationButtons.liberalArtsBtn}<br><br>
		${educationButtons.communityBtn}
		<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"აირჩიე სასწავლებელი",
		showConfirmButton:false,
		html:html,
		showCloseButton:true

	});
};




function college(course){

	let title = courses[course]['title'];
	let reqIntellect = courses[course]['req'];
	let scholarshipIntellect = courses[course]['scholarship'];
	let fees = randchoice(courses[course]['fees']);


	let html = `<br>

		საჭირო ინტელექტუალური შესაძლებლობა : ${reqIntellect}%<br>
		საერთო გადასახადი (4 წლის) : $${fees}<br><br> 

		აიღე დიპლომი! რათა შეძლო მუშაობის დაწყება! რეკომენდირებულია საჯარო უნივერსიტეტიდან დაწყება თუ თქვენი ინტელექტი 60-ზე ნაკლებია.<br>
		<br>
		ცადე ეროვნულების მაღალ ქულაზე ჩაბარება და მიიღე დაფინანსება თუ შენი ინტელექტი მაღალია
		 ${scholarshipIntellect}%-ზე.<br><br><br>
		<button onclick=studentLoan('${course}',${fees}) class="btn-sm btn-green">სტუდენტური სესხი</button>
		&nbsp;&nbsp;
		<button onclick=scholarship('${course}') class="btn-sm btn-green">დაფინანსება</button>

		<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:'info',
		title:title,
		html:html,
		showConfirmButton:false,
		showCloseButton:true,
	}).then(() => {

	});


}


function scholarship(course){
	let courseObj = courses[course];

	if (intellect > courseObj.scholarship){
		scholarshipAccept(course);
	}
	else {
		scholarshipReject();
	}

}



function scholarshipAccept(course){

	message(`გილოცავ შენ ეროვნულები ძალიან კარგად ჩააბარე! დაფინანსება გაცემულია`);

	let html = `<br><br>
	შენ მიიღე სრული გრანტი.
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:'success',
		title:'მიღებული ხარ!',
		html:html,
		confirmButtonText:'სტუდენტური ცხოვრების დაწყება',
		showCancelButton:true,
		cancelButtonText:`უარს ვამბობ გრანტზე`
	}).then((result) => {
		if (result.value){
			message(`შენი გრანტი დაამტკიცა იუსტიციის სამინისტრომ და იწყებ სტუდენტურ ცხოვრებას`);
			
			let html = `<br><br>
			შეენ მიიღე დაფინანსება და ახლა იწყებ სწავლას უნივერსიტეტში.
			<br><br>`;


			Swal.fire({
				heightAuto:false,
				title:'სექტემბერიც მოვიდა! სწავლა დაიწყო.',
				icon:'success',
				confirmButtonText:'მზად ვარ',
				html:html
			})
			startCollege(course);
		}

	});

}



function scholarshipReject(){

	let html = `<br><br>
	სამწუხაროდ, შენი ეროვნულის შედეგები ვერ აკმაყოფილებს დაფინანსებისთვის საჭირო მოთხოვნებს.
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:'გამოცდებში ჩაჭრილი!',
		html:html,
		icon:'error',
		confirmButtonText:'კიდევ ვცდი! სტუდენტური სესხიც ხომ არსებობს'
	});
}




function studentLoan(course,fees){

	let courseObj = courses[course];


	if (intellect >= courseObj.req){
		studentLoanConfirm(course,fees);
	}
	else {
		studentLoanReject();
	};

}


function studentLoanConfirm(course,fees){
	
	message(`ვაპირებ სტუდენტური სესხის აღებას, რომელიც შეადგენს $${fees}`);
	let html = `<br>

	შენ მზად ხარ უნივერსიტეტში სწავლის დასაწყებად, რადგან სესხი გაცემულია.<br>
	შენ უკვე შეგიძლია გააფორმო კონტრაქტი უნივერსიტეტთან, და დაიწყო სწავლა ღირებულება:<b>$${fees}</b> 
	თანხა გაიცა <b>${USER.country} სახელმწიფო ბანკის მიერ</b>.<br>
	<br><br>
	<button onclick=studentLoanAccept('${course}',${fees}) class='btn-sm btn-radius btn-blue'>გაგრძელება</button>
	
	<br><br>`;

	swal.fire({
		heightAuto:false,
		title:'გააფორმე კონტრაქტი',
		html:html,
		icon:'info',
		showConfirmButton:false,
		showCloseButton:true,
		background:swalBackground
	});

}






function studentLoanAccept(course,fees){

	
	student.loanMonths = 0;
	student.loanAmount = approx(fees/48);
	hasStudentLoan = true;
	hasLoan = true;
	message(`შენი სტუდენტური სესხი <b>$${fees}</b> იქნა მიღებული.`);
	message(`შემდეგი რაოდენობის $${student.loanAmount} თანხა ჩამოგეჭრებათ ანგარიშიდან ყოველ თვიურად.`);
	

	let html = `<br>
	სტუდენტური სესხი: $${fees}<br>
	სტუდენტური სესხის, თვიური გადასახადი : $${student.loanAmount}<br>

	<br><br>`;


	Swal.fire({
		heightAuto:false,
		title:'სტუდენტური სესხი სახელმწიფომ გამოყო თქვენთვის',
		icon:'success',
		background:swalBackground,
		html:html,
		confirmButtonText:'გაგრძელება',
		allowOutsideClick:false
	}).then((result) => {
		if (result.value){
			startCollege(course);
		}
	});

}






function studentLoanReject(){
	
	let html = `<br>
	შენი მოთხოვნა სტუდენტურ სესხზე იქნა უარყოფილი, რადგანაც თქვენი ფინანსური შესაძლებლობა ვერ ერგება მოთხოვნილებებს
	ჩარიცხვისათვის.<br>სცადე შემდეგ წელს, და ეცადე მოერგო ჩვენს მოთხოვნებს.

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:'სესხი უარყოფილია!',
		icon:'error',
		html:html,
		confirmButtonText:'გასაგებია',
		background:swalBackground
	})
}







function startCollege(course){

	isStudent = true;
	student.course = course;
	student.months = 0;
	student.collegeDuration = 48;
	USER.job.name = `${capitalize(student.course)} სტუდენტი`;

	message(`შენ უკვე ჩაირიცხე უნივერსიტეტში`);

	HTML.actions.setAttribute('onclick','studentMenu()');
	HTML.actions.classList = [];
	HTML.actions.classList.add('btn-main','btn-green');


}









function studentMenu(){
	

	let html = `<br><br>
	<br><br>
	${buttons.myCollege}
	<br><br><br>
	${buttons.bank}<br><br><br>
	${buttons.profile}&nbsp;&nbsp;${buttons.assets}

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Actions",
		html:html,
		showConfirmButton:false

	});

};




function myCollege(){

	let monthsRemain = student.collegeDuration - student.months;

	let html = `<br>
	დაგრჩა უნივერსიტეტში: ${student.months} თვე<br>
	გასავლელი გაქვს : ${monthsRemain} თვე<br>
	<br><br>
	${buttons.leaveCollege}

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:'ჩემი უნივერსიტეტი',
		html:html,
		showConfirmButton:false,
		showCloseButton:true
	})

}



function leaveCollege(){


	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"დარწმუნებული ხარ რომ აკადემიური გსურს?",
		confirmButtonText:"კი",
		showCancelButton:true,
		cancelButtonText:"არა"
	}).then((result) => {
		if (result.value){

			let html = `<br>
			ისწავლე : <b>${student.months}</b> თვე<br>
			აკადემიური ხარისხი : <b>${student.course}</b><br>
			<br><br>`;

			Swal.fire({
				heightAuto:false,
				icon:"info",
				title:"აიღე აკადემიური",
				html:html
			});	

			isStudent = false;
			student.months = 0;
			student.course = null;
			student.collegeDuration = 0;
			

			USER.job.name = "უმუშევარი";
			message(`თქვენ აკადემიური აიღეთ უნივერსიტეტიდან`);

			HTML.actions.setAttribute('onclick','actions()');
			HTML.actions.classList = [];
			HTML.actions.classList.add('btn-main','btn-dark');

		}

	});

	
};





function graduateCollege(){
	deg = USER.job.name;
	let course;

	if (deg.includes("Engineer")){
		course = "ENG";
	}
	else if (deg.includes("Liberal")){
		course = "LIB";
	}
	else if (deg.includes("Commerce")){
		course = "COM";
	}
	else if (deg.includes("Arts")){
		course = "ART";
	}
	else if (deg.includes("Law")){
		course = "LAW";
	}
	else if (deg.includes("Medical")){
		course = "MED";
	}
	else if (deg.includes("Community")){
		course = "COMMUNITY";
	}
	else {
		document.write("Error in student_pass()");
	}
	

	message(`You passed out as a ${deg}`);
	USER.job.name = "უმუშევარი";
	isStudent = false;
	student.months = 0;
	student.hasLoan = false;

	USER.education.degrees[course] = {
		'cgpa':null,
		'grade':null,
		'remark':"გილოცავ! უნივერსიტეტიდაამთავრე წარმატებით"
	}
	
	HTML.actions.setAttribute('onclick','actions()');
	HTML.actions.classList = [];
	HTML.actions.classList.add('btn-main','btn-dark');
};




function studentTestResult(result){

	if (result == "pass"){
		message(`შენ ჩააბარე ფინალური გამოცდა`);
		Swal.fire({
			heightAuto:false,
			title:"შენ ჩააბარე ტესტი.!",
			icon:"success",
			confirmButtonText:"გამოსვლა!"
		});
		intellect += randint(1,2);

	}
	else {
		message(`შენ ჩაიჭერი ფინალურ გამოცდაში`);
		Swal.fire({
			heightAuto:false,
			title:"შენ ჩაიჭერი!",
			icon:"error",
			confirmButtonText:"გამოსვლა"
		});

		intellect -= randint(1,3);
	}
	display();
};








function studentTest(start=false){
	if (start==true){
		let rand = randint(0,1);

		let p1 = randint(1,12);
		let p2 = randint(1,12);
		let p3 = randint(1,20);

		if (rand == 0){
			var ans = p1*p2+p3;
			var sign = "+";
		}
		else {
			var ans = p1*p2-p3;
			var sign = "-";
		}
		let question = `${p1} <b>x</b> ${p2} <b>${sign}</b> ${p3}`;
		let html = `
		<br>
		უპასუხე შემდეგ შეკითხვებს : <br><br>
		<h3>${question}</h3>
		<br><br>
		`;
		Swal.fire({
			heightAuto:false,
			icon:"question",
			title:"მიმდინარეობს გამოცდა",
			html:html,
			confirmButtonText:"Submit",
			allowOutsideClick:false,
			input:"text",
			timer:6000,
			timerProgressBar:true,

			inputValidator: (answer) => {
				if (answer == ans){
					studentTestResult('ჩააბარე');
				}
				else {
					studentTestResult('ჩაიჭერი');
				}
			}
		}).then((result) => {
			if (result.dismiss == Swal.DismissReason.timer){
				studentTestResult("ჩაიჭერი");
			};
		});
	}
	else {
		let html=`<br><br>
		
		შენ გაქვს <b>6</b> წამი რომ უპასუხო შემდეგ შეკითხვებს.<br>
		შენ უნდა უპასუხო სწორად რომ ჩააბარო ფინალური გამოცდა.
		
		<br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"info",
			title:"ფინალური გამოცდა",
			html:html,
			confirmButtonText:"დაწყება",
			showCancelButton:true,
			cancelButtonText:"გაცდენა",
			allowOutsideClick:false

		}).then((result)=> {
			if (result.value){
				message(`შენ დაამთავრე ფინალური გამოცდის წერა`);
				studentTest(true);
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				message(`შენ არ გამოცხადდი ფინალურებზე და ჩაიჭერი`);
				intellect -= randint(2,3);
				studentTestResult("ჩაჭრა");

			}
		});
	};
};


function studentRandomEvents(){

	let rand = randint(1,100);

	if (rand <= 6){
		studentTest();
	}


}