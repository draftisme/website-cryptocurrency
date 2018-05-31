const API_URL = "https://api.coinmarketcap.com/v1/ticker/?limit=2000";
const container = document.getElementById("container");
const coin_container = document.getElementById("coin_container");
let coinsArr = [];

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        coinsArr = [];
        coinsArr = data;
        return coinsArr;
    })
    .then(coinsArr => renderArr(coinsArr))
    .catch(err => console.log(err))


const createDivElm = (coinInfo) => {
    const divCoin = document.createElement("div");
    divCoin.setAttribute("class", "coin");
    // const divInfo = document.createElement("div");
    const divName = document.createElement("div");
    const divRank = document.createElement("div");
    const divPrice = document.createElement("div");
    const divChange = document.createElement("div");
    
    const imgCoin = document.createElement("img");
    imgCoin.setAttribute("src", "./assets/images/color/" + coinInfo.symbol + ".png");
    divName.appendChild(document.createTextNode(coinInfo.name));
    divRank.innerText = "Rank: ";
    divRank.appendChild(document.createTextNode(coinInfo.rank));
    divPrice.innerText = "Price in USD: ";
    divPrice.appendChild(document.createTextNode(coinInfo.price_usd));
    divChange.innerText = "Change in market %: ";
    divChange.appendChild(document.createTextNode(coinInfo.percent_change_1h));

    divCoin.appendChild(imgCoin);
    divCoin.appendChild(divName);
    divCoin.appendChild(divRank);
    divCoin.appendChild(divPrice);
    divCoin.appendChild(divChange);

    coin_container.appendChild(divCoin);
}

const renderArr = (arr) => { 
    const countResult = document.getElementById("countResult");
    countResult.innerText = "There are " + arr.length + " result(s)";
    arr.forEach(element => {
       createDivElm(element); 
    });
}

document.getElementById("logo").addEventListener("click", function(event){
    coin_container.innerText = "";
    renderArr(coinsArr);
})

const filterFunc = () => {
    coin_container.innerText = "";
    const inputValue = document.querySelector("input[name='filter']").value.toUpperCase();
    const foundArr = [];
    for(let coin of coinsArr){
        if(coin.name.toUpperCase().indexOf(inputValue) > -1){
            foundArr.push(coin);
        } 
    }
    renderArr(foundArr);
}

const sortFunc = (event) => {
    let sortType = document.querySelector("select").value;
    const btnType = event.target.innerText;
    console.log(sortType);
    switch(btnType){
        case "name":
            sortAsc(coinsArr, "name", sortType);
            break;       
        case "price":
            sortAsc(coinsArr, "price_usd", sortType);
            break;
        case "rank":
            sortAsc(coinsArr, "rank", sortType);
            break;
        default:
            break;
    }    
}

const sortAsc = (arr, btnType, sortType) => {
    arr.sort((a, b) => {
        if(btnType === "price_usd" || btnType === "rank"){
            a[btnType] = Number(a[btnType]);
            b[btnType] = Number(b[btnType]);
            if(sortType === "ascending"){
                return a[btnType] - b[btnType];
            }
            else{ 
                return b[btnType] - a[btnType];
            }
        } else if(btnType === "name"){
            if(sortType === "ascending"){
                if(a[btnType].toUpperCase() < b[btnType].toUpperCase()) return -1;
                if(a[btnType].toUpperCase() > b[btnType].toUpperCase()) return 1;
            }
            else{ 
                if(a[btnType].toUpperCase() > b[btnType].toUpperCase()) return -1;
                if(a[btnType].toUpperCase() < b[btnType].toUpperCase()) return 1;
            }
        }        
    });
    coin_container.innerText = "";
    renderArr(arr);
}

// const request = async () => {
//     const response = await fetch(API_URL);
//     const data = await response.json();
//     console.log(data);    
// }
// request();
