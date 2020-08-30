let images = ['images/index-slide01.jpg', 'images/index-slide02.jpg', 'images/index-slide03.jpg'] ;
let index = 0 ;
let inter ; // Variable qui servira a stocker le setInterval

// On attend que le DOM soit chargé
window.onload = () => {
    //Ce qui est ici s'exécutera quand le DOM sera chargé

    //On récupère la 1ère balise nav
    // let baliseNav = document.querySelector("nav") ;
    // baliseNav.innerHTML = " <h2> J'ai effacé la nav </h2>" ;

    // On récupère tous les H2 de la page
    // let balisesH2 = document.querySelectorAll("h2") ;
    // console.log(balisesH2) ;

    //On récupère le globe
    // let globe = document.querySelector(".titre .fa-globe") ;
    // On veut connaître la couleur du globe
    // console.log(window.getComputedStyle(globe).color) ;
    //On écrit le globe en rouge
    // globe.style.color = "red" ;

    // On écoute l'événement "entrée de la souris" (mouseenter)
    // globe.addEventListener("mouseenter", function(){
    //     console.log("La souris est entrée sur " +this.tagName)
    // }) ;

    // globe.addEventListener("mouseleave", sortie) ;
    // baliseNav.addEventListener("mouseleave", sortie) ;

    // Bordure rouge ou verte quand on quitte element name dans formulaire + affiche nom trop court ou trop long

let name = document.querySelector("[name='name']") ;
name.addEventListener("blur", checkName) ;

let message = document.querySelector("[name='message']") ;
message.addEventListener("keyup", checkMessage) ;

let email2 = document.querySelector("[name=email2]") ;
email2.addEventListener("blur", checkEmails) ;

let email = document.querySelector("[name=email]") ;
email.addEventListener("copy", checkCopy) ;
email.addEventListener("cut", checkCopy) ;

// On récupère la div dans header
let diapo = document.querySelector(".imagetitre") ;
diapo.addEventListener("mouseenter", stopInter) ;
diapo.addEventListener("mouseleave", startInter) ;

// On récupère le chevron gauche
let chevronLeft = document.querySelector(".fa-chevron-left") ;
chevronLeft.addEventListener("click", reculeImage) ;

// On récupère le chevron droit
let chevronRight = document.querySelector(".fa-chevron-right") ;
chevronRight.addEventListener("click", changeImage) ;

// On récupère les ronds
let cercles = document.querySelector(".circle") ;
cercles.innerHTML = "<i class='fas fa-circle'></i>" ;
let balises = "" ;

for (let ligne = 0; ligne < images.length; ligne++) {
    if (ligne==0) {
        balises = balises + "<i class = 'fas fa-circle'></i>" ;
    } else {
        balises = balises + "<i class = 'far fa-circle'></i>" ;
        }
}
cercles.innerHTML = balises ;


// On change d'image toutes les 3 secondes
inter = setInterval(changeImage, 3000) ;


window.addEventListener("scroll", afficheBouton);

// Pour faire le scroll doucement (et d'abord mettre dans css html scroll smooth):

// On intercepte le clic sur la fleche
let fleche = document.querySelector(".top a");
fleche.addEventListener("click", remonte);


} //Fin window.onload

function remonte (e) {
    // Pour pas executer ce qu il y a dans le href
    e.preventDefault();
    // On récupère le href
    let href = this.getAttribute("href") ;
    let top = document.querySelector(href) ;
    top.scrollIntoView () ;
 }

function sortie (){
    // Elément qui déclenche la fonction
    console.log("La souris est sortie de "+ this.tagName)
}

function checkName (){
    //On récupère la longueur de la saisie
    let longueur = this.value.length ;
    if (longueur >= 5){
        if (longueur <= 20) {
            this.style.border = "2px solid green";
            this.nextElementSibling.innerText = "" ;
        } else {
            console.log("Le nom est trop long") ;
            this.style.border = "2px solid red" ;
            this.nextElementSibling.innerText = "Le nom est trop long" ;
        }
    } else {
        this.style.border = "2px solid red" ;
        this.nextElementSibling.innerText = "Le nom est trop petit" ;
    }
}

function checkMessage () {
    // On récupère la longueur de la saisie
    let longueur = this.value.length ;
    if (longueur <20) {
        this.nextElementSibling.innerText = "Le message est trop petit"  ;
        this.nextElementSibling.style.color = "red" ;
        this.style.border = "2px solid red" ;
    } else {
        this.nextElementSibling.innerText = "" ;
        this.style.border = "2px solid green";
    }
}

function checkEmails () {
    let email = document.querySelector("[name=email]") ;

    if (email.value != this.value) {
        this.nextElementSibling.innerText = "Les deux emails doivent être identiques" ;
        this.style.border = "2px solid red" ;
        email.style.border = "2px solid red" ;
        this.nextElementSibling.style.color = "red" ;
    } else {
        this.nextElementSibling.innerText = "" ;
        this.style.border = "2px solid green" ;
        email.style.border = "2px solid green" ;
    }
}

function checkCopy (e) {
    e.preventDefault () ;
    console.clear () ;
    console.log("Tricheur") ;
}

function changeImage () {
    // On déplace le pointeur "index"
        if (index < images.length - 1) {
            index++ ;
        } else {
            index = 0 ;
        }      
        // On change la source de l'image dans le HTML
        let change = document.querySelector(".imagetitre > img") ;
        change.src = images[index] ;
        // On va chercher toutes les balises I de .circle
        let balisesI = document.querySelectorAll(".circle i") ;
        // console.log(balisesI) ;
        //On parcourt toutes les balises I
        for (let ligne = 0; ligne < balisesI.length; ligne++) {
            if (ligne == index) {
                // Si la balise correspond à l'image, on met un rond plein
                balisesI[ligne].classList.replace("far", "fas") ;
            } else {
                // Si la balise ne correspond pas à l'image on met un rond vide
                balisesI[ligne].classList.replace("fas", "far") ;
                }
        }
}

/**
 * Stoppe l'intervalle du diaporama
 * */
function stopInter () {
    clearInterval (inter) ;
}

/**
 * Démarre l'intervalle du diaporama
 */
function startInter () {
    inter = setInterval(changeImage, 5000) ;
}

function reculeImage () {
    // On recule le pointeur "index"
        if (index > 0) {
            index-- ;
        } else {
            index = images.length-1 ;
        }
        // On change la source de l'image dans le HTML
        let change = document.querySelector(".imagetitre > img") ;
        change.src = images[index] ;

        // On va chercher toutes les balises I de .circle
        let balisesI = document.querySelectorAll(".circle i") ;
        // console.log(balisesI) ;
        //On parcourt toutes les balises I
        for (let ligne = 0; ligne < balisesI.length; ligne++) {
            if (ligne == index) {
                // Si la balise correspond à l'image, on met un rond plein
                balisesI[ligne].classList.replace("far", "fas") ;
            } else {
                // Si la balise ne correspond pas à l'image on met un rond vide
                balisesI[ligne].classList.replace("fas", "far") ;
                }
        }
}

function afficheBouton(){
   
    // On récupère la coordonnée du haut de la navbar par rapport au haut
    let navbarPosition = document.querySelector("nav").offsetTop ;

    //On récypère la position actuelle de la fenêtre
    let windowPosition = window.scrollY ;
    
    let fleche = document.querySelector(".fa-arrow-circle-up");

	if(windowPosition > navbarPosition){
        fleche.style.display = "block";
    } else{
        fleche.style.display = "none";
	}
}

