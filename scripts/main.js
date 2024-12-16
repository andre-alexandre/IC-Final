// document.querySelectorAll('.photo img').forEach(img => {
//     img.addEventListener('click', () => {
//         console.log("Image clicked");
//         EXIF.getData(img, function() {
//             let allMetaData = EXIF.getAllTags(this);
//             console.log("Metadata:", allMetaData); 
//         });
//     });
// });


// function seeTitle() {
//     const h3Elements = document.querySelectorAll('.album h3');
//     h3Elements.forEach(h3Element => {
//         const title = h3Element.title;
//         const url = `/albuns.html?album=${encodeURIComponent(title)}`;
//         window.location.href = url;
//     });
// };



const images = document.querySelectorAll('.photo img');
images.forEach(image => {
    image.addEventListener('click', function() {
        const imageName = image.src.split('/').pop();
        window.location.href = `images.html?image=${imageName}`;
    });
});



const imports = document.querySelectorAll('.imports img');
imports.forEach(image => {
    image.addEventListener('click', function() {
        const importName = image.src.split('/').pop().split('.').shift();

        const width = window.screen.width * 0.4;
        const height = window.screen.height * 0.6; 

        const left = window.screen.width * 0.3; 
        const top = window.screen.height * 0.2; 
        window.open(`import-app.html?import=${importName}`, 'newwindow', `width=${width},height=${height},left=${left},top=${top}`);
    });
});

const importsN = document.querySelectorAll('.importsN img');
importsN.forEach(image => {
    image.addEventListener('click', function() {
        const currentApp = image.src.split('/').pop().split('.').shift();
        window.location.href =`import-choose.html?app=${currentApp}`;
    });
});




function seeTitle() {
    const h3Element = document.querySelector('.album h3');
    const url = `./albuns.html?album=${h3Element.title}`;
    window.location.href = url;
};

function seeTitle2(name) {
    const url = `./import-albuns.html?album=${name}`;
    window.location.href = url;
};

function seeTitle3(name) {
    const url = `./albuns.html?album=${name}`;
    window.location.href = url;
};

function seeTitle4(name) {
    const url = `./choose-albuns.html?album=${name}`;
    window.location.href = url;
};


function albumLoad() {
    const currentLink= window.location.href
    const currentAlbum = currentLink.split('=').pop().split('.').shift();
    const decodedInput = decodeURIComponent(currentAlbum);
    const parts = decodedInput.split('/');
    const h1Element = document.getElementById('album-title');
    h1Element.textContent = parts[1];
};

function putAlbuns() {
    const newAlbum = localStorage.getItem("newAlbuns");

    const parsedAlbum = JSON.parse(newAlbum);
    const totalKeys = Object.keys(parsedAlbum).length;

    const trashPut = document.getElementById("trashPut");
    var totalClicks = 0;


    for (let i = 1; i <= totalKeys; i++) {
        const firstKey = Object.keys(parsedAlbum)[i-1];

        const albuns = parsedAlbum[firstKey][0];
        const fileName = albuns.split('/P')[0];
        const platform = firstKey;

        var checked1 = 1
        const container = document.getElementById('albuns');
        const album = document.createElement('div');
        album.classList.add('album');
        album.setAttribute("onclick", `seeTitle4('${platform}');`);

        const div1 = document.createElement('div');
        div1.classList.add('selected-b');

        const div2 = document.createElement('div');
        div2.classList.add('selected2');
        div2.onclick = function() {
            event.stopPropagation();
            if (checked1==1){
                checked1 = 0;
                div1.style.backgroundColor = '#3d3d3d';
            }
            else{
                checked1 = 1;
                div1.style.backgroundColor = 'transparent';
            }

        };

        div2.addEventListener('mouseover', () => {
            event.stopPropagation();
            album.style.boxShadow = '0 0 0';
            div2.style.backgroundColor = '#ffffff';
            div1.style.backgroundColor = '#9c9c9c';

            div2.onclick = function() {
            event.stopPropagation();
            if (checked1==1){
                checked1 = 0;
                div2.style.backgroundColor = '#ffffff';
                div1.style.backgroundColor = '#3d3d3d';
                trashPut.style.visibility = 'visible';
                totalClicks = totalClicks + 1;
            }
            else{
                checked1 = 1;
                div1.style.backgroundColor = 'transparent';
                totalClicks = totalClicks - 1;

                if (totalClicks == 0){
                    trashPut.style.visibility = 'hidden';
                }
            }

        };
        });

        div2.addEventListener('mouseout', () => {
            if (checked1==1){
                album.style.boxShadow = '0 0 0';
                div1.style.backgroundColor = 'transparent';
            }
            else{
                album.style.boxShadow = '0 0 0';
                div1.style.backgroundColor = '#3d3d3d';
            }
        });

        album.addEventListener('mouseover', () => {
            album.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.6)';
            div2.style.backgroundColor = '#ffffff';
        });

        album.addEventListener('mouseout', () => {
            album.style.boxShadow = '0 0 0';

            if (checked1==1){
                div2.style.backgroundColor = 'transparent';
            }
            else{
                div2.style.backgroundColor = '#ffffff';
            }
        });
        

        div2.appendChild(div1);
        for (let j = 0; j <= 3; j++) {
            if (parsedAlbum[firstKey][j] != null){
                window[`img${j}`] = document.createElement('img');
                window[`img${j}`].src = parsedAlbum[firstKey][j];
                window[`img${j}`].alt = "Descrição da Foto";
                album.appendChild(window[`img${j}`]);
            }
        }


    
        // Create the img element
        const textElement = document.createElement('h3');
        textElement.textContent = platform;
        textElement.title = "facebook/"+fileName;
                
        album.appendChild(textElement);
    
        // Append the div to the gallery container
        container.appendChild(album);
    }
    

};


function showText(option) {

    const numbers = [1, 2, 3, 4, 5];

    if (!numbers.includes(option)) {
        return;
    }

    numbers.forEach(num => {
        const element = document.getElementById(`text-${num}`);
        const buttonE = document.getElementById(`b${num}`);

        if (element) {
            element.classList.add('hidden');
            buttonE.style.backgroundColor = '';
        }
    });

    const remove = document.getElementById(`text-${option}`);
    const button = document.getElementById(`b${option}`);
    if (remove) {
        remove.classList.remove('hidden');
        
        if (localStorage.getItem('secondaryColor') != null){
            button.style.backgroundColor = localStorage.getItem('secondaryColor');
            console.log(button.style.backgroundColor);
        }
        else{
            button.style.backgroundColor = '#ffffff';
        }
    }
}
function loadSettings(number){
    localStorage.setItem('loadSettings', number);
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("loadSettings")==5){
        showText(5);
        localStorage.setItem("loadSettings", 1)
    }
    else if(localStorage.getItem("loadSettings")==2){
        showText(2);
        localStorage.setItem("loadSettings", 1)
    }
    else if(localStorage.getItem("loadSettings")==1){
        showText(1);
    }
    else{
        showText(1);
    }
});





function changes(){
    primaryColor();
    secondaryColor();
    detailColor();
    textColor();
    borders();
    bordersPri();
    bordersSec();
    showText(1);
}


function borders() {
    const borderPicker = document.getElementById('borders');
    const borderValue = borderPicker.value;
    var border='0.5em';
    if (borderValue==1){
        border = '10em';
    }
    else if (borderValue==3){
        border = '0em';
    }

    const buttons = document.querySelectorAll('#end button')
    buttons.forEach(button => {
        button.style.borderRadius = border;
    });

    localStorage.setItem('borders', border);
}

function bordersPri() {
    const borderPicker = document.getElementById('borPriPicker');
    const color = borderPicker.value;

    const buttons = document.querySelectorAll('.colorB')
    buttons.forEach(button => {
        button.style.backgroundColor= color;
    });

    localStorage.setItem('bordersPri', color);
}

function bordersSec() {
    const borderPicker = document.getElementById('borSecPicker');
    const color = borderPicker.value;

    const buttons = document.querySelectorAll('.colorB')
    buttons.forEach(button => {
        button.style.boxShadow= "0 0 0 3px "+color;
    });

    localStorage.setItem('bordersSec', color);
}


function textColor() {
    const colorPicker = document.getElementById('textPicker');
    const color = colorPicker.value;

    document.body.style.color = color;
    document.getElementById('b1').style.color = color;
    document.getElementById('b2').style.color = color;
    document.getElementById('b3').style.color = color;
    document.getElementById('b4').style.color = color;
    document.getElementById('b5').style.color = color;




    localStorage.setItem('textColor', color);
}

function primaryColor() {
    const colorPicker = document.getElementById('priPicker');
    const color = colorPicker.value;

    document.getElementById('sidebar').style.backgroundColor = color;
    document.getElementById('topbar').style.backgroundColor = color;
    document.body.style.backgroundColor = color;

    document.getElementById('settings').style.backgroundColor = color;
    document.getElementById('options').style.backgroundColor = color;

    localStorage.setItem('primaryColor', color);
}

function secondaryColor() {
    const colorPicker = document.getElementById('secPicker');
    const color = colorPicker.value;

    document.getElementById('content').style.backgroundColor = color;
    document.getElementById('gallery').style.backgroundColor = color;
    document.getElementById('search-container-input').style.backgroundColor = color;
    document.getElementById('text-1').style.backgroundColor = color;
    document.getElementById('text-2').style.backgroundColor = color;
    document.getElementById('text-3').style.backgroundColor = color;
    document.getElementById('text-4').style.backgroundColor = color;
    document.getElementById('text-5').style.backgroundColor = color;
    document.getElementById('settings-b-a').style.backgroundColor = color;


    localStorage.setItem('secondaryColor', color);
}

function changeScrollbar(thumbColor) {
    let styleElement = document.querySelector('style[data-scrollbar]');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.setAttribute('data-scrollbar', 'true'); 
        document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
        ::-webkit-scrollbar-thumb {
            background-color: ${thumbColor};
        }
    `;
}

function detailColor() {
    const colorPicker = document.getElementById('detPicker');
    const color = colorPicker.value;
    
    document.getElementById('hr-top').style.backgroundColor = color;
    document.getElementById('hr-bottom').style.backgroundColor = color;
    changeScrollbar(color);

    localStorage.setItem('detailColor', color);
}


function applySaved() {
    const primaryColor = localStorage.getItem('primaryColor');
    const secondaryColor = localStorage.getItem('secondaryColor');
    const detailColor = localStorage.getItem('detailColor');
    const textColor = localStorage.getItem('textColor');
    const borders = localStorage.getItem('borders');
    const bordersPri = localStorage.getItem('bordersPri');
    const bordersSec = localStorage.getItem('bordersSec');



    if (primaryColor) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.backgroundColor = primaryColor;

        const topbar = document.getElementById('topbar');
        if (topbar) topbar.style.backgroundColor = primaryColor;

        document.body.style.backgroundColor = primaryColor;

        const settings = document.getElementById('settings');
        if (settings) settings.style.backgroundColor = primaryColor;

        const options = document.getElementById('options');
        if (options) options.style.backgroundColor = primaryColor;

        const priPicker = document.getElementById('priPicker');
        if (priPicker) priPicker.value = primaryColor;

        const albuns = document.querySelectorAll('.album');
        if (albuns) albuns.forEach(album => {
            album.style.backgroundColor = primaryColor;
        });
    }

    if (secondaryColor) {
        const content = document.getElementById('content');
        if (content) content.style.backgroundColor = secondaryColor;

        const gallery = document.getElementById('gallery');
        if (gallery) gallery.style.backgroundColor = secondaryColor;

        const search = document.getElementById('search-container-input');
        if (search) search.style.backgroundColor = secondaryColor;

        for (let i = 1; i <= 5; i++) {
            const text = document.getElementById(`text-${i}`);
            if (text) text.style.backgroundColor = secondaryColor;
        }

        const settingsA = document.getElementById('settings-b-a');
        if (settingsA) settingsA.style.backgroundColor = secondaryColor;

        const trashA = document.getElementById('chat-a');
        if (trashA) trashA.style.backgroundColor = secondaryColor;

        const privateA = document.getElementById('private-a');
        if (privateA) privateA.style.backgroundColor = secondaryColor;

        const indexA = document.getElementById('home-a');
        if (indexA) indexA.style.backgroundColor = secondaryColor;

        const albunsA = document.getElementById('archive-a');
        if (albunsA) albunsA.style.backgroundColor = secondaryColor;


        const secPicker = document.getElementById('secPicker');
        if (secPicker) secPicker.value = secondaryColor;
    }

    if (detailColor) {
        const hrTop = document.getElementById('hr-top');
        if (hrTop) hrTop.style.backgroundColor = detailColor;

        const hrBottom = document.getElementById('hr-bottom');
        if (hrBottom) hrBottom.style.backgroundColor = detailColor;

        changeScrollbar(detailColor);

        const detPicker = document.getElementById('detPicker');
        if (detPicker) detPicker.value = detailColor;
    }

    if (textColor) {
        document.body.style.color = textColor;
        document.getElementById('b1').style.color = textColor;
        document.getElementById('b2').style.color = textColor;
        document.getElementById('b3').style.color = textColor;
        document.getElementById('b4').style.color = textColor;
        document.getElementById('b5').style.color = textColor;

        const textPicker = document.getElementById('textPicker');
        if (textPicker) textPicker.value = textColor;
    }

    if (borders) {
        const buttons = document.querySelectorAll('#end button');
        buttons.forEach(button => {
            button.style.borderRadius = borders;
        });
    }

    if (bordersPri) {
        const buttons = document.querySelectorAll('.colorB')
        buttons.forEach(button => {
            button.style.backgroundColor= bordersPri;
        });

        const borPriPicker = document.getElementById('borPriPicker');
        if (borPriPicker) borPriPicker.value = bordersPri;
    }

    if (bordersSec) {
        const buttons = document.querySelectorAll('.colorB')
        buttons.forEach(button => {
            button.style.boxShadow= "0 0 0 3px "+bordersSec;
        });

        const borSecPicker = document.getElementById('borSecPicker');
        if (borSecPicker) borSecPicker.value = bordersSec;
    }
}

var check11 = false
var check22 = false
var check33 = false


function popUp2(num){

    if (num == 1 ){
        document.getElementById("text-2").style.filter = "blur(5px)";
        document.getElementById("text-2").style.pointerEvents = "none";
        document.getElementById("apopUp2").style.visibility="visible";
        check22 = true;
    }

    else{
        if (check22==true){
            document.getElementById("text-2").style.filter = "blur(0px)";
            document.getElementById("text-2").style.pointerEvents = "visible";
            document.getElementById("apopUp2").style.visibility="hidden";
            check22 = false;
        }
        else{
            goToPreviousPage();
        }

    }
}


function popUp3(num){

    if (num == 1 ){
        document.getElementById("text-2").style.filter = "blur(5px)";
        document.getElementById("text-2").style.pointerEvents = "none";
        document.getElementById("apopUp3").style.visibility="visible";
        check33 = true;
    }

    else{
        if (check33==true){
            document.getElementById("text-2").style.filter = "blur(0px)";
            document.getElementById("text-2").style.pointerEvents = "visible";
            document.getElementById("apopUp3").style.visibility="hidden";
            check33 = false;
        }
        else{
            goToPreviousPage();
        }

    }
}


function popUp1(num){

    if (num == 1 ){
        document.getElementById("text-2").style.filter = "blur(5px)";
        document.getElementById("text-2").style.pointerEvents = "none";
        document.getElementById("apopUp2").style.visibility="visible";
        check22 = true;
    }

    else{
        if (check22==true){
            document.getElementById("text-2").style.filter = "blur(0px)";
            document.getElementById("text-2").style.pointerEvents = "visible";
            document.getElementById("apopUp2").style.visibility="hidden";
            check22 = false;
        }
        else{
            goToPreviousPage();
        }

    }
}

function popUpPlan(num, num2, ref){
    const plan1 = document.getElementById("plan-1");
    const plan2 = document.getElementById("plan-2");
    const plan3 = document.getElementById("plan-3");

    function changePlan1() {
        plan1.style.backgroundColor = "#9c9c9c";
        plan2.style.backgroundColor = "#e0e0e0";
        plan3.style.backgroundColor = "#e0e0e0";
    };

    function changePlan2() {
        plan2.style.backgroundColor = "#9c9c9c";
        plan1.style.backgroundColor = "#e0e0e0";
        plan3.style.backgroundColor = "#e0e0e0";
    };
    function changePlan3() {
        plan3.style.backgroundColor = "#9c9c9c";
        plan2.style.backgroundColor = "#e0e0e0";
        plan1.style.backgroundColor = "#e0e0e0";
    };

    if (num == 1 ){
        var planOld = JSON.parse(localStorage.getItem("planOld"));
        var planSelected = JSON.parse(localStorage.getItem("planSelected"));

        if (planOld != planSelected){
            if (num2 == 0){
                document.getElementById("text-4").style.filter = "blur(5px)";
                document.getElementById("text-4").style.pointerEvents = "none";
                document.getElementById("apopUpPlan1").style.visibility="visible";
            }
            else{
                console.log("a");
                document.getElementById("text-4").style.filter = "blur(5px)";
                document.getElementById("text-4").style.pointerEvents = "none";
                document.getElementById("apopUpPlan").style.visibility="visible";
            }
        }
        else{
            if (num2 == 0){
                document.getElementById("text-4").style.filter = "blur(5px)";
                document.getElementById("text-4").style.pointerEvents = "none";
                document.getElementById("apopUpPlan2").style.visibility="visible";
            }
            else{
                if (ref != null){ 
                    window.location.href = "./"+ref;
                }
                else{
                    showText(num2);        
                } 
            }
        }
    }

    else if (num == 2){
        var planOld = JSON.parse(localStorage.getItem("planOld"));
        localStorage.setItem("planSelected", planOld)

        if (num2 == 0){
            document.getElementById("text-4").style.filter = "blur(0px)";
            document.getElementById("text-4").style.pointerEvents = "visible";  
            document.getElementById("apopUpPlan1").style.visibility="hidden";
            document.getElementById("apopUpPlan2").style.visibility="hidden";
            document.getElementById("apopUpPlan").style.visibility="hidden";
            window[`changePlan${planOld}`]();

        }
        else{
            window[`changePlan${planOld}`]();
            document.getElementById("text-4").style.filter = "blur(0px)";
            document.getElementById("text-4").style.pointerEvents = "visible";
            document.getElementById("apopUpPlan").style.visibility="hidden";
        }
    }

    else if (num == 3){
        var planSelected = JSON.parse(localStorage.getItem("planSelected"));
        localStorage.setItem("planOld", planSelected)

        if (num2 == 0){
            document.getElementById("text-4").style.filter = "blur(0px)";
            document.getElementById("text-4").style.pointerEvents = "visible";  
            document.getElementById("apopUpPlan1").style.visibility="hidden";
            document.getElementById("apopUpPlan").style.visibility="hidden";
        }
        else{
            document.getElementById("text-4").style.filter = "blur(0px)";
            document.getElementById("text-4").style.pointerEvents = "visible";
            document.getElementById("apopUpPlan").style.visibility="hidden";
        }

    }
}

function resetBodyToDefault() {
    document.getElementById('priPicker').value = '#e0e0e0';
    document.getElementById('secPicker').value = '#ffffff';
    document.getElementById('detPicker').value = '#9c9c9c';
    document.getElementById('textPicker').value = '#000000';
    document.getElementById('borPriPicker').value = '#e0e0e0';
    document.getElementById('borSecPicker').value = '#9c9c9c';
    document.getElementById('borders').value = 2;
    const button = document.getElementById("b1");
    button.style.backgroundColor = '#ffffff';

    primaryColor();
    secondaryColor();
    detailColor();
    textColor();
    bordersSec();
    bordersPri();
    borders();
    showText(1);
}

document.addEventListener('DOMContentLoaded', applySaved);

function clearLocalStorage() {
    localStorage.clear();
    console.log("LocalStorage has been cleared.");
}

function goToPreviousPage() {
    window.history.back();
}

function redirectToPage(page) {
    window.location.href = page;
}
