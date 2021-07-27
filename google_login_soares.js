/**
  Renderiza o botão de login na tela
  Produzido por: Pedro Soares
  E-mail: pedrohosoares@gmail.com
  Linkedin: https://www.linkedin.com/in/pedro-soares-27657756/
*/
const google_login_soares = {

  csrf:document.querySelector('meta[name="csrf-token"]') || '',
  tags:{
    'meta':{
      'parameters':{
        'content':'303659689325-jdh6g6ui8n67itrg20784srcq0kmdu4l.apps.googleusercontent.com',
        'name':'google-signin-client_id'
      }
    },
    'script':{
      'parameters':{
        'src':'https://apis.google.com/js/platform.js?onload=renderButton',
        'async':'',
        'defer':''
      }
    }
  },
  div:document.querySelectorAll('form.signup-form'),
  cE(tag){
    return document.createElement(tag);
  },
  runTags(){
    for (let tag in this.tags) {
      
      let newTag = this.cE(tag);

      for(let prop in this.tags[tag]['parameters']){

        if(prop === 'async' || prop === 'defer'){
        
          newTag.setAttribute(prop,this.tags[tag]['parameters'][prop]);
        
        }else{
        
          newTag[prop] = this.tags[tag]['parameters'][prop];
        
        }
        
      }
      if(tag === 'meta'){

        document.head.appendChild(newTag);

      }else{

        document.body.appendChild(newTag);
        newTag.onload = ()=>{
    
          google_login_soares.createbotao();
    
        };

      }
    }
  },
  createbotao(){
    this.div.forEach((v,i)=>{
        const botao = google_login_soares.cE('botao');
        //console.log(botao,'meu-botao'+i);
        botao.id = 'meu-botao'+i;
        botao.style.display = 'block';
        botao.style.marginTop = '10px';
        v.appendChild(botao);
        google_login_soares.renderbotao('meu-botao'+i);
    });
  },
  renderbotao(idTag) {
    gapi.signin2.render(idTag, {
        'scope': 'email profile https://www.googleapis.com/auth/plus.login', // solicitando acesso ao profile e ao e-mail do usuário
        'width': 'auto',
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': google_login_soares.onSuccess,
        'onfailure': google_login_soares.onFailure
    });
  },
  onSuccess(googleUser) {
    // Recuperando o profile do usuário
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // Recuperando o token do usuario. Essa informação você necessita passar para seu backend
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  },
  onFailure(error) {
    console.log(error);
  },
  signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
  },
  init(){

    this.runTags();
    
  }

};

google_login_soares.init();
