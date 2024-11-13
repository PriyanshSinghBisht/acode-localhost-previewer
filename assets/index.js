 // init shortcut_url cache
     if(!localStorage.hasOwnProperty('localhost_urls')){
      localStorage.setItem('localhost_urls', JSON.stringify(["http://localhost:3000/","http://localhost:5174/","http://localhost:8158/index.html",]));
    }
    // End shortcut urls cache
      
    let url_shortcut_array = JSON.parse(localStorage.getItem('localhost_urls'));

// refer to elements
const fram = document.querySelector("#myIframe");
const url_input = document.querySelector("#input-url");
const bookmarked = document.querySelector("input#save");
const bookmarkList = document.querySelector("ul#bookmark_list")
// End : refer to elements

// console.log("bookmarkList",bookmarkList)

// src change on link click
bookmarkList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const clickedText = event.target.textContent;
    url_input.value = clickedText;
    fram.src = clickedText;
    checkToogleBookmark();
  }
});
// End: src change on link click

// save to bookmark list based on icon click
bookmarked.addEventListener("change", (e)=>{
    let temp = url_shortcut_array;
    if(bookmarked.checked && !url_shortcut_array.includes(url_input.value)){
      temp = [...url_shortcut_array, url_input.value];
    }
    else if(!bookmarked.checked && url_shortcut_array.includes(url_input.value)){
       temp = url_shortcut_array.filter((url)=> url!=url_input.value);
    }
    url_shortcut_array = temp;
   // console.log(url_shortcut_array, url_input.value);
    localStorage.setItem('localhost_urls', JSON.stringify(url_shortcut_array));
    rerenderBookmarks();
});
// END : save to bookmark list based on icon click

// Render Bookmark list when url-List change
function rerenderBookmarks(){
    while (bookmarkList.firstChild) {
        bookmarkList.removeChild(bookmarkList.firstChild);
    }
    url_shortcut_array.forEach(url=>{
       const li = document.createElement('li')
       li.textContent = url;
       bookmarkList.appendChild(li);
    });
}

const checkToogleBookmark = ()=>{
    bookmarked.checked = url_shortcut_array.includes(url_input.value);
}
//END :  Render Bookmark list when url-List change

// Restrict some urls
const validate_url = (url)=>{
   const test = ["http://localhost:/index.html","https://localhost:/index.html","http://localhost:","https://localhost:","http://localhost:/","https://localhost:/"];
   return !test.includes(url);
}
// END : Restrict some urls

// Do thing when enter pressed on rul input
let EnterPressed = false;
url_input.addEventListener("keypress", (e)=>{
   if(e.key=="Enter" && validate_url(url_input.value)){
     e.preventDefault();
     fram.src = url_input.value ;
     url_input.value = fram.src;
     localStorage.setItem('prevous_localhost_url', fram.src);
     EnterPressed = true;
     url_input.blur();
     checkToogleBookmark();
   }
});
//END : Do thing when enter pressed on rul input

// Do Things when url inout blur
url_input.addEventListener("blur", ()=>{
   if(!EnterPressed){
     fram.src = localStorage.getItem('prevous_localhost_url');
   }
   EnterPressed = false;
});
//END :  Do Things when url inout blur


    // Init previus url
    if(!localStorage.hasOwnProperty('prevous_localhost_url')){
      fram.src = "http://localhost:3000/";
      localStorage.setItem( 'prevous_localhost_url', 'http://localhost:3000/');
    }else{
       const url = localStorage.getItem('prevous_localhost_url');
       fram.src = url;
        url_input.value = url;
    }
    //End Cache prevour url
    
    // Do things in init
    checkToogleBookmark();
    rerenderBookmarks();
   //END : Do things in init
   
   
 const width = document.querySelector("#width");
const height = document.querySelector("#height");
const zoom = document.querySelector("#zoom");

labelWidth.textContent = fram.clientWidth;
labelHeight.textContent = fram.clientHeight;
labelZoom.textContent = (fram.getBoundingClientRect().width/fram.offsetWidth).toFixed(2);

width.addEventListener("input", (e)=>{ 
       let x = e.target.value;
       labelWidth.textContent = x;
       fram.style.width = x+"px";
  });

height.addEventListener("input", (e)=>{ 
      let y = e.target.value;
      labelHeight.textContent = fram.clientHeight;
      fram.style.height = y+"px";
  });
zoom.addEventListener("input", (e)=>{ 
      let z = e.target.value;
      labelZoom.textContent = (fram.getBoundingClientRect().width/fram.offsetWidth).toFixed(2);
      fram.style.zoom = z;
  });
