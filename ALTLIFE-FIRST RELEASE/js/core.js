function profile(){

	let assetsWorth = calculateAssetsWorth();
	let netWorth = calculateNetWorth();

	let html = `<br><br>
	სახელი: ${USER.name}<br>
	ქვეყანა : ${USER.country}<br>
	კარიერა : ${USER.job.name}<br>
	მთლიანი ქონება : <b>${USER.assets.length}</b><br><br>
	შემოსავალი: <b class="w3-text-green">$${netWorth}</b>
	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:'info',
		imageHeight:125,
		imageWidth:125,
		imageAlt:"Profile",
		position:"top",
		title:"პროფილი",
		showConfirmButton:false,
		html:html
	});
};




function settings(){
	let html = `<br><br>

	${buttons.credits}<br><br>
	${buttons.help}<br><br>
	${buttons.contributions}<br><br>
	${buttons.displayThemes}<br><br>

	<br><br>`;
	Swal.fire({
		heightAuto:false,
		title:"პარამეტრები",
		position:"top",
		showConfirmButton:false,
		html:html,
		background:swalBackground,
		showCloseButton:true
	});


}


function displayThemes(){

	let html = `<br><br>
	<button onclick="darkTheme()" class="w3-btn btn-dark">შავი მოდი</button>
	<br><br>
	<button onclick="ultraDarkTheme()" class="w3-btn w3-black">მუქი შავი მოდი</button>

	<br><br>`;


	Swal.fire({
		heightAuto:false,
		title:"აირჩიე თამაშის გამოსახულება",
		html:html,
		showConfirmButton:false,
		showCloseButton:true,
		background:swalBackground
	});

}



function contributions(){

	let html = `<br><br>
	ამ ეტაპზე მიმდინარეობს ტექნიკური სამუშაო მალე დაემატება ინსტრუქცია.
	<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:"info",
		position:top,
		html:html,
		title:"შემოწირულობა",
		confirmButtonText:"Back",
		showCloseButton:true,
		background:swalBackground
	});

}


function ultraDarkTheme(){

		$("body").css("background-color","#111010");
		$("body").css("color","white");
}
	
function darkTheme(){

		$("body").css("background-color","#1b1b1b");
		$("body").css("color","white");
}



function credits(){
	let html = `<br><br>
	აიქონები მოპოვებულია <b>FontAwesome</b>-ზე<br>
	გამოყენებულია <b>Bootstrap</b> და მადლობა გითჰაბის მომხმარებელს <b>დახმარებისთვის</b><br>
	თამაში არის <b> early access</b> - ფაზაში და შესაძლოა დაფიქსირდეს ბაგები<br>
	კოდზე იმუშავა დათო დგებუაძემ
	<br><br>
	 <i class="fas fa-heart" style="color:#d0142b"></i>
	<br><br>`;
	Swal.fire({
		heightAuto:false,
		title:"კრედიტები",
		html:html,
		icon:"info",
		background:swalBackground,
		confirmButtonText:"თამაშში დაბრუნება"
	})
};




function help(){
	let html=`<br><br>

	მიმდინარეობს მუშაობა<br>.
	მეინ საიტი.
	<br><br>
	<a href="https://datodgebuadze.github.io/portfolio/" 
	target="_blank" class="w3-button w3-blue">View Help</a>
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"სექცია",
		showCloseButton:true,
		html:html,
		icon:"success",
		showConfirmButton:false,
		background:swalBackground

	});

}



function inheritance(){

	let randNum = randint(1,1001);
	let amt = approx(randint(1500,6500));

	if (randNum == 1001){
		amt = approx(randint(1000000,10000000));
		message(`შენ მიიღე ქონება შენი მდიდარი მშობლებისგან`);
	}

	else if (randNum > 995 && randNum != 1001){
		amt = approx(randint(100000,1000000));
		message(`თქვენ მშობლებმა დაგიტოვეს $${amt}-ი`);
	}
	else if (randNum < 5){
		amt = approx(randint(0,100));
		message(`თქვენ თითქმის არაფერი არ დაგიტოვეს მშობლებმა`);
	}
	else {
		message(`თქვენ მიიღეთ $${amt} მშობლების დაწერილი ანდერძის მიხედვით.`);
	};

	money = amt;
	display();
}











const swalNoMoney = Swal.mixin({
	heightAuto:false,
	background:swalBackground,
	title:'თანხა ხელიდან გეცლება!',
	icon:'error',
	text:`რამე იღონე, აღარც ბანკში და აღარც ხელზე თანხა აღარ გაქვს`
})
