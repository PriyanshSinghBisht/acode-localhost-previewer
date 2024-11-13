import plugin from '../plugin.json';
import styles from "../assets/style.css";

class LocalhostPreviwer {
  async init() {
    this.$page.id = "localhost_preview";
    this.$page.innerHTML = html;
    
    this.$page.querySelector("#back_button").addEventListener( "click" ,()=> {
      this.$page.hide();
    });
    
    const script = tag("script",{
      id: "dynamic",
      src: `${this.baseUrl}assets/index.js`
    })
    this.$page.appendBody(script);
    
    
  // create icon to show page
  this.pageOpenBtn = tag("span", {
         innerHTML: `<img src="${this.baseUrl}icon.png" width="25px" height="25px">`,
         className: "localhost-previewer-page-show-button",
          style: { pointerEvents: "all" },
      onclick: () => { this.$page.show();
                        }
                });
    //END: Create icon to show page
                
 // add icon to hom header 
  const rootHeader = root.querySelector("header");
  console.log("root",root)
   rootHeader.insertBefore(this.pageOpenBtn, rootHeader.lastChild);
    // END : add icon to hom header 
   
  }
  
  async destroy() {
    this.pageOpenBtn?.remove();
  }
}

if (window.acode) {
  const acodePlugin = new LocalhostPreviwer();
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    acodePlugin.$page = $page;
    await acodePlugin.init();
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}

const html = `
<style>
  .tile{ display: none;}
  *{
  margin: 0;
  paddin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  color: var(--text-color);
}
:root{
  --background-color: white;
  --forground-color: #e0e0e0;
  --secondary-color: #eee;
  --dark-secondary-color: #d1d5d2;
  --text-color: black;
   --page-background: white;
}

@media ( prefers-color-scheme: dark){
  :root{
  --background-color: #2f2f2f;
  --forground-color: #202020;
  --secondary-color: #1f1f1f;
  --dark-secondary-color: #151515;
  --text-color: white;
  --page-background: black;
  }
}

.body{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: var(--background-color);
}
header{
  display:flex;
  align-items: center;
  width: 100%;
  padding-inline: 5px;
}
.input-container{
  display: flex;
  align-items: center;
  margin: 6px 0;
  flex: 1;
  background: var(--forground-color);
  border-radius: 50px;
  padding-right: 15px;
}
.input-container .url:focus {
    background: var(--dark-secondary-color);
}
.url{
  font-size: 19px;
  padding: 10px 15px;
  width: 100%;
  border: none;
  outline: none;
  background: var(--forground-color);
  border-radius: 50px;
}

label{
  select: none;
}
input#save{
display: none;}
input#save ~ .saved,input#save + .not_saved{
  display: none;
}

input#save:checked ~ .saved{
  display: block;
}
input#save:not(:checked) + .not_saved {
  display: block;
}

nav{
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  max-width: 100%;
  padding-inline: 8px;
  background: var(--background-color);
  z-index: 2;
  overflow-x: hidden;
  transition: all 0.5s;
}

nav label[for="show-nav"]{
  text-align: right;
  margin: 9px 0 0 -5px;
}
#show-nav{display: none;}
#show-nav:checked + .body nav{
  width: 250px;
}
#show-nav:not(:checked) + .body nav{
  width: 0;
  padding-inline: 0;
}
nav ul{
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  overflow: hidden;
}

nav h2{
  font-size: 20px;
}
#h2seprator{
  margin: 10px 0px;
}

nav ul li{
  transition: all 0.2s;
  background: var(--secondary-color);
  font-size: 16px;
  padding: 7px;
  cursor: pointer;
  overflow: hidden;
}
nav ul li:hover{
  font-weight: 600;
  background: var(--dark-secondary-color);
}

label#toggle-controls{
  margin-top: 11px;
  padding: 7px 9px;
  border-radius: 20px;
  width: fit-content;
  text-wrap: nowrap;
  background: #171717;
  color: white;
  shadow: 0 0 8px white;
}
label#toggle-controls:active{
  shadow: 0 0 20px white;
}
.shadow{
  position: fixed;
  background: rgba(0,0,0,0.3);
  width: 100%;
  height: 100%;
}
input#show-nav:not(:checked) + .body .shadow{
   display: none;
}
input#show-nav:checked + .body .shadow{
  display: block;
}


.fram-container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: 2px solid #444;
  overflow: auto;
}
.fram{
  width: 100%;
  height: 100%;
  background: white;
}
.controls{
   background: var(--secondary-color);
   color: var(--text-color);
   position: absolute;
   display: flex;
   flex-direction: column;
   bottom: 0;
   left: 0;
   width: 100%;
   padding-inline: 40px;
   opacity: 0.7;
  }
input#show-controls{ display: none; }
.controls input{
    width: 100%;
  }
.controls  label[for="show-controls"]{
    margin-left: auto;
}
    
 input#show-controls:checked ~ .body .controls{
   display: flex;
 }
 input#show-controls:not(:checked) ~ .body .controls{
   display: none;
 }
  }
  
</style>


<input type="checkbox" id="show-controls">
<input type="checkbox" id="show-nav">
<div class="body">
  <label for="show-nav" class="shadow"></label>
<header>
  <svg id="back_button" fill="var(--text-color)" width="26px" height="26px" version="1.1" viewBox="144 144 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="m348.99 543.16c-3.9922 0-7.9805-1.4688-11.129-4.6172l-127.42-127.42c-6.0859-6.0898-6.0859-16.164 0-22.254l127.42-127.42c6.0898-6.0859 16.164-6.0859 22.254 0 6.0859 6.0898 6.0859 16.164 0 22.254l-116.3 116.3 116.3 116.29c6.0859 6.0898 6.0859 16.164 0 22.254-2.9414 3.1484-7.1367 4.6172-11.125 4.6172z"></path> <path d="m578.43 415.74h-353.3c-8.6055 0-15.742-7.1367-15.742-15.742 0-8.6094 7.1367-15.746 15.742-15.746h353.3c8.6055 0 15.742 7.1367 15.742 15.746 0 8.6055-7.1367 15.742-15.742 15.742z"></path> </g> </g></svg>
  
  <div class="input-container">
  <input id="input-url" type="text" class="url" placeholder="Enter url here" value="http://localhost:3000">
   <i>
    <label for="save">
     <input id="save" type="checkbox">
     <svg class="not_saved" width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00001 0H7.00001L5.51292 4.57681L0.700554 4.57682L0.0825195 6.47893L3.97581 9.30756L2.48873 13.8843L4.10677 15.0599L8.00002 12.2313L11.8933 15.0599L13.5113 13.8843L12.0242 9.30754L15.9175 6.47892L15.2994 4.57681L10.4871 4.57681L9.00001 0Z" fill="#aaa"></path> </g></svg>
      <svg class="saved" width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00001 0H7.00001L5.51292 4.57681L0.700554 4.57682L0.0825195 6.47893L3.97581 9.30756L2.48873 13.8843L4.10677 15.0599L8.00002 12.2313L11.8933 15.0599L13.5113 13.8843L12.0242 9.30754L15.9175 6.47892L15.2994 4.57681L10.4871 4.57681L9.00001 0Z" fill="#FAC416"></path> </g></svg>
     </label>
   </i>
  </div>
  
  <label for="show-nav">
  <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H14M4 18H9" stroke="var(--text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  </label>

</header>

<div class="fram-container">
<iframe id="myIframe" src="" class="fram"frameborder="0"></iframe>
</div>

<nav>
    <label for="show-nav">
    <svg id="close" width="20px" height="20px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="var(--text-color)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>close [#1511]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -240.000000)" fill="var(--text-color)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <polygon id="close-[#1511]" points="375.0183 90 384 98.554 382.48065 100 373.5 91.446 364.5183 100 363 98.554 371.98065 90 363 81.446 364.5183 80 373.5 88.554 382.48065 80 384 81.446"> </polygon> </g> </g> </g> </g></svg>
      </label>
    <h2>Bookmarks</h2>
    <hr id="h2seprator">
    <ul id="bookmark_list">
    <li>Error occured ! default data show</li>
    <li>http://localhost:5174</li>
    <li>http://localhost:5174</li>
    <li>http://localhost:5174</li>
    <li>http://localhost:5174</li>
  </ul>
     <label for="show-controls" id="toggle-controls">
        Responsive controls
     </label>
</nav>


<div class="controls">
   <label for="show-controls">
   <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z" fill="var(--text-color)"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="var(--text-color)"></path> </g></svg>
   </label>
  <label for="width">width: <span id="labelWidth"></span></label>
  <input type="range" name="width" min="10" max="1500"  id="width">
   <label for="height">height: <span id="labelHeight"></span></label>
  <input type="range" name="height" id="height" min="10" max="1200">
   <label for="zoom">zoom: <span id="labelZoom"></span></label>
  <input type="range" name="zoom" id="zoom" min="0.2" max="1" step="0.01" value="1">
  </div>
</div>`