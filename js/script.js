const clickAbles = document.querySelectorAll("nav ul li:has(ul) h5, .hamburger, main section.teams article.team>h3");
const rootStyles = getComputedStyle(document.documentElement);
const navPrimary = rootStyles.getPropertyValue('--nav-primary');
const initalUl = document.querySelector('nav>ul');

const [hue, saturation, lightness] = navPrimary.split(',').map(value => parseInt(value.trim()));

clickAbles.forEach((clickAble) => {
    clickAble.addEventListener("click", () => {
        clickAble.classList.toggle("active");
    });
})

window.addEventListener("resize", fixImgs);

function applySaturation(element, level){
    let output = "hsl(" + hue + ", " + saturation + "%, " + (lightness + (level * ((100 - lightness) / 4))) + "%)";
    element.style.backgroundColor = output;
    element.querySelectorAll(":scope > li > ul").forEach((ul) => { 
        if (level >= 4){
            applySaturation(ul, level);
        } 
        else{
            applySaturation(ul, level + 1);
        }        
    });
}

function fixImgs(){
    const featuredImgs = document.querySelectorAll(".featured .img");
    featuredImgs.forEach(img => {
        img.style.height = img.clientWidth + "px";
    });
}

applySaturation(initalUl, 0);
fixImgs();