var myEl = [].slice.call(document.querySelectorAll(".buy"));
var popup = document.getElementById("popup");
var popupBox = document.getElementById("popup-box");

console.log(myEl);

myEl.forEach(function(item, index){
item.addEventListener("click", function(){
	popup.style.display = "block";
	popupBox.style.display = "block";
}, false);
});


popup.addEventListener("click", function(){
	popup.style.display = "none";
	popupBox.style.display = "none";
}, false);
