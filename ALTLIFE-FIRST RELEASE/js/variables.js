

var USER  = {
	'name':null,
	'country':randomCountry(),
	'age':216,
	'status':'None',
	'assets':[],//temp assets | will be much more complex in future
	'education':{
		'degrees':{
			'SAMPLE':{
				cgpa:10,
				grade:'A+',
				remark:'',
			}
		}	
	},

	'job':{
		'name':'Unemployed',
		'salary':0,
		'promotions':0,
		'duration':0,
		'previousJobs':[]

		

	}
}

USER.name = randomName();



var BANK = {
	"balance":0,
	"id":randint(100000,9999999),
	"loan":0,
	"hasLoan":false,
	"transactions":0,
	'transactionsList':[]
}






var money = 0;
var health;
var morale;
var intellect;
var looks;
var karma = 0;



//student variables 



var isStudent = false;
var student = {
	hasStudentLoan:false,
	loanMonths:0,
	loanAmount:0,
	loanAmountPaid:0,
	months:0,
	course:null,
	collegeDuration:0,
}






var isJailed = false;

var totalLibVisits = 0;
var totalGymVisits = 0;
var jobQualified = false;
var hasJob = false;
var jobAllow = true;
var hasLoan = false;
var salary = 0;

var hasDisease = false;
var hasDepression = false;

var DISEASE = false;
var jailDuration = 0;
var jailDurationSpent = 0;
var alertsCount = 0;



// DISEASE RELATED

var diseases = {}
var diseaseCount = 0;

// BUDGET RELATED
var setBudgetAmount = 250;
var budgetAmount = 250;
var monthsSinceLastBudgetUpdate = 0;






var swalBackground = "#333"
var Swal = Swal.mixin({
	background:swalBackground,
	heightAuto:false
})





const buttons = {

	profile:`<button id="profile" class="btn-lg main-btn btn-secondary" onclick="profile()"> <i class="fas fa-user-alt"></i>&nbsp;ჩემი პროფილი</button>`,
	bank:`<button id="bank" class="btn-lg btn-danger" onclick="bank()">ბანკი &nbsp;<i class="fa fa-dollar-sign"></i></button>`,
	budget:`<button id="budget" class="btn-lg btn-info" onclick="budget()">ბიუჯეტი &nbsp;<i class="fa fa-wallet"></i></button>`,
	jobs:`<button id="job-btn" class="btn-lg btn-info" onclick="jobs()">სამსახურები &nbsp;<i class="fa fa-briefcase"></i></button>`,
	study:`<button id="study-btn" class="btn-lg btn-info" onclick="study()">სწავლა &nbsp;<i class="fa fa-graduation-cap"></i></button>`,
	assets:`<button id="assets" class="btn-lg main-btn btn-secondary" onclick="assets()">ქონება <i class="fas fa-home"></i></button>`,
	credits:`<button onclick="credits()" class="btn btn-success">Credits</button>`,
	help:`<button onclick="help()" class="btn btn-success">დახმარება</button>`,
	contributions:`<button onclick="contributions()" class="btn btn-success">დონაცია</button>`,
	displayThemes:`<button onclick="displayThemes()" class="btn btn-info">გამოსახულება</button>`,
	myJob:`<button class="btn-lg btn-success" onclick="myJob()">ჩემი სამსახური</button>`,
	leaveJob:`<button class="btn-md btn-red btn-radius" onclick="leaveJob()">წამოდი სამსახურიდან</button>`,
	bankAccount:`<button onclick="bankAccount()" class="btn-lg btn-info">ბანკის დეტალები</button>`,
	loanServices:`<button onclick="loanServices()" class="btn-lg btn-secondary">კრედიტ განყოფილება</button>`,
	deposit:`<button onclick="deposit()" class="btn-md btn-blue btn-radius">შეტანა&nbsp;</button>`,
	withdraw:`<button onclick="withdraw()" class="btn-md btn-blue btn-radius">გამოტანა</button>`,
	myCollege:`<button class="btn-lg btn-success" onclick="myCollege()">ჩემი უნივერსიტეტი</button>`,
	leaveCollege:`<button class="btn-md btn-red btn-radius" onclick="leaveCollege()">აკადემიურის აღება</button>`,

}

const HTML = {
	console:document.querySelector("#console"),
	ageDisplay:document.querySelector('#age'),
	actions:document.querySelector('#actions-btn'),
	activities:document.querySelector('#activities-btn'),
}




