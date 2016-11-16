/*!
 * BF stand-alone
 * NaN
 * team@madebysource.com
 * 
 * Copyright 2016 Piffle LLC - All Rights Reserved
 * 
 * Author:
 * Petr Pluhar
 * 
 * Build v1.0.0 - 2016-11-16
 */
function getTimeRemaining(a){var b=Date.parse(a)-Date.parse(new Date),c=Math.floor(b/1e3%60),d=Math.floor(b/1e3/60%60),e=Math.floor(b/36e5%24),f=Math.floor(b/864e5);return{total:b,days:f,hours:e,minutes:d,seconds:c}}function generateItem(a){var b=document.querySelector(".products-content"),c=document.createElement("div");c.className="product",c.id=a.internal_name;var d='<div class="product-img-cont"><div class="product-img"></div></div><div class="product-caption"><h2 class="product-name">'+a.name+'</h2><p class="product-desc">'+a.bf_line+"</p></div>";c.innerHTML=d,b.appendChild(c)}function switchPacks(a){allProducts.forEach(function(b,c){a.includes(b.id)?b.classList.contains("hidden")&&b.classList.remove("hidden"):b.classList.add("hidden")})}function isSketch(){return document.querySelector(".pack#sketch").classList.contains("active")}function switchBtnStates(a){packBtns.forEach(function(b,c){b.id==a?b.classList.add("active"):b.classList.remove("active")})}function switchHeader(a){var b,c,d,e,f,g=a;switch(a){case"chuck":b="Chuck Norris",d="312",e="93",f="https://madebysource.com/payment/chuck-box/",c="19";break;case"des":b="UI Designer",d="88",e="35",f="https://madebysource.com/payment/ui-designer-box/",c="7";break;case"dev":b="Developer",d="135",e="54",f="https://madebysource.com/payment/dev-box/",c="4";break;case"mark":b="Social Marketing",d="64",e="32",f="https://madebysource.com/payment/social-marketing-box/",c="3";break;case"sketch":b="Sketch Free",d="0",e="0",f="https://madebysource.com/payment/redeem/?code=wHul3wnRRu",c="5"}document.querySelector("p.pack-name").innerHTML=b+" Box",document.querySelector("h2.summary-pack-name").innerHTML=b+" Box",document.querySelector("p.pack-content").innerHTML="("+c+" plugins)",document.querySelector("span.previous-price").innerHTML="$"+d,document.querySelector("span.actual-price").innerHTML="$"+e,document.querySelector(".summary-price-container span.previous-price").innerHTML="$"+d,document.querySelector(".summary-price-container span.actual-price").innerHTML="$"+e,document.querySelector("p.price").innerHTML="$"+e+".00",document.querySelector(".cta").href=f,document.querySelector(".scroll-cta").href=f,document.querySelector(".summary-cta").href=f,document.querySelector(".pack-img").id=g,document.querySelector(".summary-img").id=g}function isSketch(){return document.querySelector(".pack#sketch").classList.contains("active")}function switchUIForSketch(){isSketch()?(document.querySelector(".products-header-part#right").classList.add("hidden"),document.querySelector(".products-header-part#sketch-right").classList.remove("hidden"),document.querySelector(".scroll-cta .text-box").classList.add("hidden")):(document.querySelector(".products-header-part#sketch-right").classList.add("hidden"),document.querySelector(".products-header-part#right").classList.remove("hidden"),document.querySelector(".scroll-cta .text-box-sketch").classList.add("hidden"))}var _gaq=[["_setAccount","<%= pkg.analytics %>"],["_trackPageview"]];setInterval(function(){daysv.textContent=getTimeRemaining(deadline).days,hoursv.textContent=getTimeRemaining(deadline).hours,minutesv.textContent=getTimeRemaining(deadline).minutes,secondsv.textContent=getTimeRemaining(deadline).seconds},1e3);var deadline="12/02/2016",daysv=document.querySelector(".days"),hoursv=document.querySelector(".hours"),minutesv=document.querySelector(".mins"),secondsv=document.querySelector(".seconds"),chuck=["pixabay","subtlepatterns","socialkitpro","csshat","csshat2","ioshat","pngexpress","colorkit","svglayers","guideguide","uber-line","perspective-mockups","screensnap","fontic","uber-faces","uber-tuber","uber-frame","uber-columns","uber-spacer"],des=["pixabay","subtlepatterns","colorkit","svglayers","guideguide","uber-line","perspective-mockups"],dev=["csshat","csshat2","ioshat","pngexpress"],mark=["pixabay","subtlepatterns","socialkitpro"],sketch=["sketch-runner","sketch-states","sort-me","state-machine","webalize"];products.forEach(function(a,b){generateItem(a)});var somelist=[].slice.call(document.querySelectorAll(".product")),allProducts=somelist.slice();switchPacks(chuck);var packBtns=[].slice.call(document.querySelectorAll(".pack"));packBtns.forEach(function(a,b){var c;switch(a.id){case"chuck":c=chuck;break;case"des":c=des;break;case"dev":c=dev;break;case"mark":c=mark;break;case"sketch":c=sketch}a.addEventListener("click",function(){switchPacks(c),switchBtnStates(a.id),switchHeader(a.id),switchUIForSketch(),EPPZScrollTo.scrollVerticalToElementById("section-products",1)})}),window.onscroll=function(a){var b=document.querySelector("#scroll-cta"),c=document.querySelector(".products-header").offsetTop,d=document.getElementsByTagName("body")[0].scrollTop;d>=c?b.classList.contains("active")||b.classList.add("active"):b.classList.contains("active")&&b.classList.remove("active")};