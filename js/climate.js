var topLeftClick = document.getElementById('triTL');
var kickstarterClick = document.getElementById('triTR');
var botLeftClick = document.getElementById('triBL');
var botRightClick = document.getElementById('triBR');
var who = document.getElementById('who');
//var what = document.getElementById('what');
var where = document.getElementById('where');
var when = document.getElementById('when');

topLeftClick.addEventListener('click', function() {
    who.setAttribute("class","inFrame");
}, false);

kickstarterClick.addEventListener('click', function() {
	window.open("http://yahoo.com");
}, false);
botLeftClick.addEventListener('click', function() {
    where.setAttribute("class", "inFrame");
}, false);
botRightClick.addEventListener('click', function() {
    when.setAttribute("class", "inFrame");
}, false);

who.addEventListener('click', function() {
	this.className = "";
}, false);
/*what.addEventListener('click', function() {
	this.className = "";
}, false);*/
where.addEventListener('click', function() {
	this.className = "";
}, false);
when.addEventListener('click', function() {
	this.className = "";
}, false);