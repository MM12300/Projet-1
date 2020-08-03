//!!!!!!!!!!!!!!!!SLIDE !!!!!!!!!!!!!!!!!!!!
//Images du slide
let images = ["images/agenceslider-1.JPG", "images/agenceslider-2.JPG", "images/agenceslider-3.JPG"];
//Index du slide
let index = 0;
//intervalle du slide
let inter; 

//VARIABLE FORMULAIRE
let boutton1 = document.querySelector("#oeil1");
let boutton2 = document.querySelector("#oeil2");


// Chargement du DOM
window.onload = () => {
    //!!!!!!!!!!!!!!!!SLIDE !!!!!!!!!!!!!!!!!!!!
    // On change d'image toutes les 5 secondes
    inter = setInterval(changeImage, 2000);
    // On récupère la div dans header
    let diapo = document.querySelector("header div");
    //On stoppe le diaporama à l'entrée et à la sortie de la souris
    diapo.addEventListener("mouseenter", stopInter);
    diapo.addEventListener("mouseleave", startInter);
    //Clic flèche droite change slide (forward)
    let flecheDroite = document.querySelector(".fa-chevron-right");
    flecheDroite.addEventListener("click", changeImage);
    //Clic flèche gauche change slide(backward)
    let flecheGauche = document.querySelector(".fa-chevron-left");
    flecheGauche.addEventListener("click", reculeImage);
    //Boucle permettant d'ajouter autant d'indicateurs du slide que d'images
    let cercles = document.querySelector(".cercles");
    let balises = "";
    for(let ligne = 0; ligne < images.length; ligne++){
        if(ligne === 0){
            balises = balises + "<i class='fas fa-circle'></i>";
        }else{
            balises = balises + "<i class='far fa-circle'></i>";
        }
    }
    cercles.innerHTML = balises;
    //fleche qui permet de retourner à la balise top en haut de page
    window.addEventListener("scroll", afficheBouton);
    let fleche = document.querySelector(".top a");
    fleche.addEventListener("click", remonte);
        

    //!!!!!!!!!!!!!!!! FORMULAIRE DE CONTACT !!!!!!!!!!!!!!!!!!!!
    //NAME
    let nom = document.querySelector("[name='name']");
    nom.addEventListener("blur", checkName);

    //EMAIL
    let email2 = document.querySelector("[name='email2']");
    email2.addEventListener("blur", checkMail);

    //MDP : technique avec 2 variable mots de passe querySelector
    boutton1.addEventListener("click", showPassword1);
    boutton2.addEventListener("click", showPassword2);
    let mdp2 = document.querySelector("[name='motdepasse2']");
    mdp2.addEventListener("blur", checkMdp);

    //empêcher le copier/coller
    let email = document.querySelector("[name='email1']");
    email.addEventListener("copy", preventCutCopy);
    email.addEventListener("cut", preventCutCopy);


    //MENU BOUTON !!!!!!!!!!!!!!!!!!!!
    let menubouton = document.querySelector("#bouton");
    menubouton.addEventListener("click", menu);

} // !!!!!!!!!!!!!!!!Fin window.onload !!!!!!!!!!!

// BOUTON MENU !!!!!!!!!!!!!!!!!
function menu(){
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }



//Fonction pour remonter en haut de la page
function remonte(e){
    e.preventDefault();
    let href = this.getAttribute("href");
    let top = document.querySelector(href);
    console.log(top)
    top.scrollIntoView();
}


//Fonction du SLIDE : forward
function changeImage(){
    //Boucle qui permet de changer l'index des images
    if(index < images.length - 1){
        index++;
    }else{
        index = 0;
    }
    //Change la source de l'image en fonction de l'index
    let image = document.querySelector("header img");
    image.src = images[index];

    //Changement des indicateurs du slide
    // On va chercher toutes les balises I de .cercles
    let balisesI = document.querySelectorAll(".cercles i");
    // On parcourt toutes les balises I
    for(let ligne = 0; ligne < balisesI.length; ligne++){
        if(ligne === index){
            // Si la balise correspond à l'image, on met un rond plein
            balisesI[ligne].classList.replace("far", "fas");
        }else{
            // Si la balise ne correspond pas à l'image on met un rond vide
            balisesI[ligne].classList.replace("fas", "far");
        }
    }
}


//Fonction du SLIDE : backward
function reculeImage(){
    //Boucle qui permet de changer l'index des images
    if(index > 0){
        index--;
    }else{
        index = images.length - 1;
    }
    //Change la source de l'image en fonction de l'index
    let image = document.querySelector("header img");
    image.src = images[index];
    let cercles = document.querySelectorAll(".cercles i");
    for(let rond = 0; rond < cercles.length; rond++){
        cercles[rond].classList.replace("fas", "far");
        if(rond === index){
            cercles[rond].classList.replace("far", "fas");
        }
    }
}

//Fonction du SLIDE : stoppe le slide
function stopInter(){
    clearInterval(inter);
}


//Fonction du SLIDE : démarre le slide
function startInter(){
    inter = setInterval(changeImage, 2000);
}


//Fonction pour afficher la FLECHE TO TOP et le menu
function afficheBouton(){
    // On récupère la coordonnée du haut du slide par rapport au haut de la page
    let navbarPosition = document.querySelector("#slide").offsetTop;
    // On récupère la position actuelle de la fenêtre
    let windowPosition = window.scrollY;
    let fleche = document.querySelector(".top");
    let menu = document.querySelector("#menu");
    //si la position du scroll dépasse la hauteur de la navbar on affiche la fleche et le menu
    if(windowPosition > navbarPosition){
        fleche.style.display = "block";
        menu.style.display = "flex";

        
    }else{
        fleche.style.display = "none";
        menu.style.display = "none"
    }
}


//!!!!!!!!!!!!!FORMULAIRE DE CONTACT !!!!!!!!!!!!

//FONCTIONS FORMULAIRES !!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//FONCTION POUR VERIFIER LONGUEUR NOM
function checkName() {
    let longueur = this.value.length;
    if (longueur >= 5) {
        if (longueur <= 20) {
            this.nextElementSibling.innerText = ""
            this.style.border = "2px solid green";
        } else {
            this.nextElementSibling.innerHTML = "<i class='las la-exclamation-triangle'></i><p>Votre pseudo doit contenir moins de 20 caractères.</p>";
            this.style.border = "2px solid red";
            let test = document.querySelector(".spanalert");
            console.log(test);
        }
    } else {
        this.nextElementSibling.innerHTML = "<i class='las la-exclamation-triangle'></i><p>* Votre pseudo doit contenir plus de 5 caractères.</p>"
        this.style.border = "2px solid red"
    }
}


//FUNCTION POUR VERIF SI MAILS =
function checkMail() {
    let email = document.querySelector("[name='email1']");
    let email1 = email.value;
    let email2 = this.value;
    if (email1 !== email2) {
        this.nextElementSibling.innerHTML = "<i class='las la-exclamation-triangle'></i><p>* Les adresses emails indiquées sont différentes.</p>"
        this.style.border = "2px solid red";
        email.style.border = "2px solid red";

    }else if((email1 === "" || email2=== "")){
        this.nextElementSibling.innerHTML = "<i class='las la-exclamation-triangle'></i><p>* Merci d'indiquer une adresse email et sa vérification.</p>"
        this.style.border = "2px solid red";
        email.style.border = "2px solid red";
    } else {
        this.nextElementSibling.innerText = "";
        this.style.border = "2px solid green";
        email.style.border = "2px solid green";
    }

}

//FUNCTION POUR AFFICHER LE PREMIER MDP
function showPassword1() {
    if (document.querySelector("#mdpinput1").type === "password") {
        document.querySelector("#mdpinput1").type = "text";
        boutton1.setAttribute("class", "far fa-eye-slash");
    } else if (document.querySelector("#mdpinput1").type === "text") {
        document.querySelector("#mdpinput1").type = "password";
        boutton1.setAttribute("class", "far fa-eye");
    }
}


//FUNCTION POUR AFFICHER LE SECOND MDP
function showPassword2() {
    if (document.querySelector("#mdpinput2").type === "password") {
        document.querySelector("#mdpinput2").type = "text";
        boutton2.setAttribute("class", "far fa-eye-slash");
    } else if (document.querySelector("#mdpinput2").type === "text") {
        document.querySelector("#mdpinput2").type = "password";
        boutton2.setAttribute("class", "far fa-eye");
    }
}


//FUNCTION POUR VERIFIER QUE LES MPD SONT =
function checkMdp() {
    let mdp = document.querySelector("[name='motdepasse1']");
    let mdp1 = mdp.value;
    let mdp2 = this.value;
    console.log(this)
    if (mdp1 !== mdp2 ) {
        this.parentElement.nextElementSibling.innerHTML = "<i class='las la-exclamation-triangle'></i> <p>* Les mots de passe indiqués sont différents.</p>"
        this.style.border = "2px solid red";
        mdp.style.border = "2px solid red";

    } else if ((mdp1 === "" || mdp2=== "")) {
        this.parentElement.nextElementSibling.innerHTML = "<i class='las la-exclamation-triangle'></i> <p>* Merci d'indiquer un mot de passe et sa vérification.</p>"
        this.style.border = "2px solid red";
        mdp.style.border = "2px solid red";
    } else {
        this.parentElement.nextElementSibling.innerText = "";
        this.style.border = "2px solid green";
        mdp.style.border = "2px solid green";
    }
}


/**
 * Cette fonction empêche le copier et le couper
 * @param {Event} e 
 */
function preventCutCopy(e){
    console.log(e);
    e.preventDefault();
    // console.clear();
    console.log("C'est interdit");
}