

function printForecast (arr){
    let c = "";
    arr.forEach((element, i) => {
        c += `${element}ºC in ${i + 1} days ,`;
    });
    return c.trim();
}
let a=[17, 21, 23];
let b= [12, 5, -5, 0, 4];
console.log(printForecast(a));
console.log(printForecast(b));