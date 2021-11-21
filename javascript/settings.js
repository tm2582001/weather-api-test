// let id = (id)=> document.getElementById(id);
// let classes = (classes) => document.getElementsByClassName(classes);
// let queryselector = (query) => document.querySelector(query);

id("gear-icon").addEventListener("click", ()=>{
    classes("setting-button")[0].classList.add("setting-button-animation");
    id("gear-icon").style.display = "none";
    id("settion-option").style.display = "block";
});

classes("close-button")[0].addEventListener("click",()=>{
    classes("setting-button")[0].classList.remove("setting-button-animation");
    id("gear-icon").style.display = "flex";
    id("settion-option").style.display = "none";
});

let theme;

window.addEventListener("load", ()=>{
    if(localStorage.getItem("theme")){
        theme= localStorage.getItem("theme");
        changeTheme(theme);
    }
});

let changeTheme = (theme)=>{
    if(theme == "light"){
        id("light-theme").classList.add("active-option");
        id("dark-theme").classList.remove("active-option");
        document.body.removeAttribute("data-theme","dark");
    }else if(theme == "dark"){
        id("dark-theme").classList.add("active-option");
        id("light-theme").classList.remove("active-option");
        document.body.setAttribute("data-theme","dark");
    }
}

id("light-theme").addEventListener("click", ()=>{
    theme = "light";
    localStorage.setItem("theme", "light");
    changeTheme(theme);
});

id("dark-theme").addEventListener("click", ()=>{
    theme = "dark";
    localStorage.setItem("theme", "dark");
    changeTheme(theme);
});