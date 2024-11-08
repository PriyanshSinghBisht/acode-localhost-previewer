import plugin from '../plugin.json';
import styles from "../assets/style.css";

class LocalhostPreviwer {
  async init() {
    this.$page.id = "lh_preview";
    this.$page.settitle("http://localhost:3000");
    
    // init shortcut_url cache
     if(!localStorage.hasOwnProperty('localhost_urls')){
      localStorage.setItem('localhost_urls', JSON.stringify(["http://localhost:3000","http://localhost:5174","http://localhost:8158/index.html",]));
    }
    // End shortcut urls cache
    
    
    let url_shortcut_array = JSON.parse(localStorage.getItem('localhost_urls'));
    
    // Dialog Box Prompt
     const prompt = acode.require('prompt');

    const urlRegex = /^http(s)?:\/\/localhost:\/*$/
    
    const prompt_options = {
      match: urlRegex,    
      required: true,
      placeholder: 'http://localhost:8158',
      test: (value) => !urlRegex.test(value),
    };
   
   const gotourl = (url)=>{
     frame.src = url;
     this.$page.settitle(url);
     localStorage.setItem( 'prevous_localhost_url', url);
   }
   
   const show_prompt = async ( OPTION )=>{
     const url = await prompt('Enter the url', frame.src, 'url', prompt_options);
     
     if(OPTION=="GO_TO" && frame && url){
       gotourl(url);
     }
     if( OPTION == "ADD" && url && !url_shortcut_array.includes(url)){
        url_shortcut_array.push(url);
        
      localStorage.setItem('localhost_urls', JSON.stringify(url_shortcut_array));
     }
   }
    // End Prompt
    
    // Vertical Button to show The Page
    const SideButton = acode.require('sideButton');
    this.sideButton = SideButton({
      text: 'Localhost',
      icon: `${this.baseUrl}icon.png`,
      onclick: () => {
        this.$page.show();
      },
      backgroundColor: '#fff',
      textColor: '#000',
    });

    this.sideButton.show();
    // End Vertical Button to show The Page
    
    // Select Dialog
    const select = acode.require('select');
    const options = [
      ['open_url', 'go to url', 'icon1'],
      ['add_url_shortcut', 'add url shorcut', 'icon2']
    ];
    
    const opt = {
      onCancel: () => window.toast('Cancel Clicked', 3000),
      hideOnSelect: true,
      textTransform: true,
      default: 'open_url',
    };
    
    const showOptions = async( OPTIONS ) => {
      if( OPTIONS==="URL" ){
        const dynamic_op = [
      ['delete_url_shortcut', 'delete shortcut', url_shortcut_array.length!=0],
      [null, 'shortcuts', false] ];
      const shortcut_op = url_shortcut_array.map(s => [s,s]);
      
      const option = await select('Options',[ ...options, ...dynamic_op, ...shortcut_op], opt);
      
       switch(option){
         case "open_url": show_prompt("GO_TO");
           break;
         case "add_url_shortcut": show_prompt("ADD");
           break;
         case "delete_url_shortcut": showOptions("DELETE_SHORTCUT");
           break;
         case null: break;
          default : gotourl(option);
       }
      }
      if( OPTIONS==="DELETE_SHORTCUT"){
        
        const shortcut_selected = await select('Delete shortcut', url_shortcut_array, opt);
        
        if(shortcut_selected){
          url_shortcut_array = url_shortcut_array.filter(ele => ele!=shortcut_selected);
           
           localStorage.setItem('localhost_urls', JSON.stringify(url_shortcut_array));
        }
      }
    }
    
    // End Select Dialog
    
    // Create new elements 
   const scriptTag = tag("script", {
        id: "api_t_script",
        type: "module",
        src: `${this.baseUrl}assets/index.js`,
        attr: {
                crossorigin: ""
        }
             });
             
     const styleTag = tag("style", {
          textContent: styles
     });
     
    const frame = tag("iframe", { 
      id: "frame" ,
      src : "http://localhost:3000"
    });
    
    const button = tag("button", {
      id: "shortcut_menu",
      textContent: "shortcut"
    })
    
    button.addEventListener("click", ()=> console.log("btn clicked"));
    // End new elements
    
    // Add New Elements to Page
    this.$page.appendBody(styleTag);
    this.$page.appendBody(frame);
    this.$page.appendBody(scriptTag)
    // End Add New Elements to Page
    
    //Add Event Listener
    const btn = this.$page.querySelector("header > .text");
    btn.addEventListener("click", ()=> {  showOptions("URL");
    });
    // End Event Listener
    
    // Init previus url
    if(!localStorage.hasOwnProperty('prevous_localhost_url')){
      localStorage.setItem( 'prevous_localhost_url', 'http://localhost:3000');
    }else{
      gotourl(localStorage.getItem('prevous_localhost_url'));
    }
    //End Cache prevour url
  }
  
  
  async destroy() {
    this.sideButton?.hide();
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