//putting this into a window.onload results in some probs. after modal closes, but wont scroll
var modalButton = document.getElementById("modalButton");
var htmlElement = document.getElementById("jBForms");
//below is the hidden input before the modal//
var checkboxModal = document.getElementById("modalOne");
//below is the modal itself 
var modalA = document.getElementById("modalA");
var closeModal = document.getElementById("closeModal");
var sendButton = document.getElementById('sendButton');
var cancelButton = document.getElementById('cancelButton');
var inputOptionsDiv = completely(document.getElementById('inputOptions'));
var completelyInputHolderDiv = document.getElementById('completelyInputHolder');
var allHeaderInputs = document.querySelectorAll("header input");
var navigationToggle = document.getElementById("navigationToggle");
var allNavLinks = document.querySelectorAll("a");
var topLevelNavItems = document.querySelectorAll(".top-level-nav");
var secondLevelNavItems = document.querySelectorAll(".second-level-nav");
var backToTopLink = document.getElementById('backToTopLink');


// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(sendButton);
var mc2 = new Hammer(cancelButton);
var picker = new Pikaday(
{
    field: document.getElementById('datepicker'),
    firstDay: 1,
    minDate: new Date('2000-01-01'),
    maxDate: new Date('2020-12-31'),
    yearRange: [2000,2020]
});
     
function modalFunction(){
    htmlElement.setAttribute("class","has-modal");
}
function change(){
    if (checkboxModal.checked === false) {
        htmlElement.setAttribute("class","");
    }
}

modalButton.addEventListener("click",modalFunction,false);
        
(function() {
      VMasker(document.getElementsByClassName("mask-number")).maskNumber();
      VMasker(document.getElementsByClassName("mask-credit")).maskPattern('9999-9999-9999-9999');
      VMasker(document.getElementsByClassName("mask-zip")).maskPattern('99999-9999');
      VMasker(document.getElementsByClassName("mask-alpha")).maskPattern('AAAAAAAAAAAAAAAAAAAAA');
  })();
        
(function() {
    var header = document.querySelector("#header");
    if(window.location.hash) {
      header.classList.add("slide--up");
    }
    new Headroom(header, {
        tolerance: {
          down : 10,
          up : 10
        },
        offset : 0,
        classes: {
          initial: "slide",
          pinned: "slide--reset",
          unpinned: "slide--up"
        }
    }).init();
}());
smoothScroll.init();


mc.on("swiperight panright", function(ev) {
    sendButton.textContent = "Sent";
    sendButton.style.background = "green";
});
mc2.on("swipeleft panleft", function(ev) {
    cancelButton.textContent = "Cancelled";
    cancelButton.style.background = "red";
});


  
inputOptionsDiv.onEnter = function() {
  var text = inputOptionsDiv.input.value;
  var tagToAdd = document.createElement('span');
  try {
    resp = eval(text);  
  } catch (e) {
    resp = 'error:<i>'+e+'</i>';
  }
  tagToAdd.addEventListener("click",deleteTag,false);
  tagToAdd.innerHTML = '-'+text;
  tagToAdd.setAttribute("class","tag-span");
  completelyInputHolderDiv.appendChild(tagToAdd);
  inputOptionsDiv.setText('');
  completelyInputHolderDiv.appendChild(inputOptionsDiv.wrapper);
  //dev tools says the next line is bad
  setTimeout(function() {
    inputOptionsDiv.input.onclick()
    },0); // for IE
}
  
function extractTextForAutocompletion(code) {
    var snip = code;
    var ix = snip.lastIndexOf('.');
    var isLetterOrDigitOrWhitespaceOrDot = function(ch) { 
      return ch === '.'         ||
             (ch>='A'&&ch<='Z') ||
             (ch>='a'&&ch<='z') ||
             (ch>='0'&&ch<='9') ||
             ch==='$'           ||
             ch==='_'           ||
             ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'.indexOf(ch) !==-1; // whitespaces
    };
    
    for (var i=code.length-1;i>=0;i--) {
      var ch = code.charAt(i);
      if (isLetterOrDigitOrWhitespaceOrDot(ch)===false) {
        snip = code.substring(i+1);
        break; 
      }
    }
    if (ix === -1) return { v1 :'', v2 : snip };
    else           return { v1 : snip.substring(0,ix),
                          v2 : snip.substring(ix+1) };    
};
  
inputOptionsDiv.options = ['coffee','cocoa','apple','banana','dog','elephant','frog','gopher','hotdog','ice cream','jelly bean','kitkat','lolipop','msomething','queenbee','raccoon','snake','turtle','usomething','vsomething','wsomething','xsomething','ysomething','zsomething'];
inputOptionsDiv.options.sort();
inputOptionsDiv.onChange = function (text) {
    var v = extractTextForAutocompletion(text);
    if (text.length == 0) {
      inputOptionsDiv.repaint();
      return; 
    }
    try {
       oj = eval(v.v1);
    } catch (ex) {
       oj = null;
    }
    for (var i in oj) { inputOptionsDiv.options.push(''+i); }
    inputOptionsDiv.options.sort();
    inputOptionsDiv.startFrom = text.lastIndexOf('.')+1;
    inputOptionsDiv.repaint();
}

//dev tools says the next line is bad
//what was this supposed to accomplish?
//setTimeout(function(){
  //inputOptionsDiv.input.onclick()
//},0);

function deleteTag(theClicking){
  //really it should generate a popOver to confirm
  theClicking.target.remove();
}

function countastic() {
  new Countastic({
    countable: '#tweet-area',
    button: '#counter-btn',
  });
}
countastic();

//navigation (uncheck items on selection and top level change)
for(var i = 0; i < allNavLinks.length; i+=1){
    allNavLinks[i].addEventListener("click", handleClicks, false);
}
for(var k = 0; k < topLevelNavItems.length; k+=1){
    topLevelNavItems[k].addEventListener("click", handleToplevelClicks, false);
}
function handleClicks(event){
    for(var j = 0; j < allHeaderInputs.length; j+=1){
        allHeaderInputs[j].checked = false;
    }
    navigationToggle.checked = false;
}
function handleToplevelClicks(event){
    for(var l = 0; l < secondLevelNavItems.length; l+=1){
        secondLevelNavItems[l].checked = false;
    }
}

window.onscroll = function(){
    if(pageYOffset < 1000){
        backToTopLink.style.visibility="hidden";
    }
    else{
        backToTopLink.style.visibility="visible";
    }
};
