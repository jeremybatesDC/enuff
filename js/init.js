        var modalButton = document.getElementById("modalButton");
        var htmlElement = document.getElementById("jBForms");
        //below is the hidden input before the modal//
        var checkboxModal = document.getElementById("modalOne");
        //below is the modal itself 
        var modalA = document.getElementById("modalA");
        var closeModal = document.getElementById("closeModal");
        var sendButton = document.getElementById('sendButton');
        var cancelButton = document.getElementById('cancelButton');
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
       
       /*document.addEventListener("DOMContentLoaded", function(event) {
            Socialite.load(document.getElementById("socialDemo"));
        });*/
       

//var mc = new Hammer.Manager(myElement, myOptions);
// listen to events...
mc.on("swiperight panright", function(ev) {
    sendButton.textContent = "Sent";
    sendButton.style.background = "green";
});
mc2.on("swipeleft panleft", function(ev) {
    cancelButton.textContent = "Cancelled";
    cancelButton.style.background = "red";
});