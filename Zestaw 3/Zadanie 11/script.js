var subregionArray=[];
var regionsOnPage=5;
var currPage=1;

function regionstoSubregions(allRegions,regionArray){
    allRegions.innerHTML+=`
    <div class="title">
    <h3>NAME</h3>
    <h3>Capital</h3>
    <h3>Population</h3>
    <h3>Area</h3>
    </div>`;
    regionArray.forEach(region=>{
        allRegions.innerHTML+=`
        <div class="region">    
            <p>${region.name}</p>
            <p>${region.capital}</p>
            <p>${region.population}</p>
            <p>${region.area}</p>
        </div>`;
    })
}

function loadSubregions(subregion,map){
    let subregionPopulation=(array)=>{
        let population=0;
        array.forEach(region=>{
            population+=region.population;
        });
        return population;
    }
    
    let subregionArea=(array)=>{
        let area=0;
        array.forEach(region=>{
            area+=region.area;
        });
        return area;
    }    
    let subregionDiv=document.createElement("div");
    subregionArray.push(subregionDiv);
    subregionDiv.classList.add("subregion");
    subregionDiv.innerHTML+=`
    <div class="data">
        <div class="sign">➜</div>
        <h1>${subregion}</h1>
        <h1>${subregionPopulation(map.get(subregion))}</h1>
        <h1>${subregionArea(map.get(subregion))}</h1>
    </div>
    <div class="regionContainer"></div>`;
    var open=false;
    subregionDiv.querySelector(".data").addEventListener("click",()=>{
        var sign=subregionDiv.querySelector(".data").querySelector("div");
        if(open){
            regions.style.display="none";
            sign.style.transform="rotate(0deg)";
        }else{
            regions.style.display="flex";
            sign.style.transform="rotate(450deg)";
        }
        open=!open;
    })
    var regions=subregionDiv.querySelector(".regionContainer");
    regionstoSubregions(regions,map.get(subregion));
}


function displaySubregions(){
    let allSubregions=document.querySelector("#allsubregions");
    allSubregions.innerHTML="";
    for(let i=currPage*regionsOnPage;i<Math.min(regionsOnPage*(currPage+1),subregionArray.length);i++){
        allSubregions.appendChild(subregionArray[i]);
    }
}

function sortingFunction(){
    let header=document.querySelector("header");
    let titles=header.querySelectorAll("h1");
    let areaCheck=(a,b)=>{
        let areaA=a.querySelector(".data").querySelectorAll("h1")[2].innerText;
        let areaB=b.querySelector(".data").querySelectorAll("h1")[2].innerText;
        return areaB-areaA;
    }

    let populationCheck=(a,b)=>{
        let populationA=a.querySelector(".data").querySelectorAll("h1")[1].innerText;
        let populationB=b.querySelector(".data").querySelectorAll("h1")[1].innerText;
        return populationB-populationA;
    }
    
    let nameCheck=(a,b)=>{
        let NameA=a.querySelector(".data").querySelectorAll("h1")[0].innerText;
        let NameB=b.querySelector(".data").querySelectorAll("h1")[0].innerText;
        if(NameA>NameB){
            return 1;
        }
        if(NameB>NameA){
            return -1;
        }
        return 0;
    }

    titles[0].addEventListener("click",()=>{
        subregionArray.sort((a,b)=>nameCheck(a,b));
        displaySubregions();
    })
    titles[1].addEventListener("click",()=>{
        subregionArray.sort((a,b)=>populationCheck(a,b));
        displaySubregions();
    })
    titles[2].addEventListener("click",()=>{
        subregionArray.sort((a,b)=>areaCheck(a,b));
        displaySubregions();
    })
}
function changePage(nextPage){
    let footerChild=document.querySelector("footer").querySelectorAll("div");
    footerChild.forEach(number=>{
        if(number.innerText-1==currPage){
            number.classList.remove("currPageDown");
        }
        if(number.innerText-1==nextPage){
            number.classList.add("currPageDown");
        }
    })
    currPage=nextPage;
}

function footerDisplay(){
    let footer=document.querySelector("footer");
    for(let i=0;i<(subregionArray.length/regionsOnPage);i++){
        let pageDiv=document.createElement("div");
        pageDiv.classList.add("number");
        pageDiv.innerText=i+1;
        pageDiv.addEventListener("click",()=>{
            changePage(pageDiv.innerText-1);
            displaySubregions();
        })
        footer.appendChild(pageDiv)
    }
}


async function getdata() {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const data = await response.json();
    return data;
}

function start(){

getdata().then(
    data=>{
    const subregions=new Set();
    const mapForSubregions=new Map();
    data.forEach(element => {
        subregions.add(element.subregion);
    });
    subregions.forEach(region=>{
        mapForSubregions.set(region,[]);
    });
    data.forEach(element=>{
        mapForSubregions.get(element.subregion).push({
            name:element.name.common,
            capital:element.capital,
            population:element.population,
            area:element.area,
        })    
    })
    subregions.forEach(region=>{
        loadSubregions(region,mapForSubregions);
    })
    displaySubregions()
    footerDisplay()})
    
sortingFunction();
changePage(0);
}

start();