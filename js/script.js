const apiKey = "tqTl6QtvtPXjnQnB6pLYE7M0b7cyRlTDTgjs76Cs";
const url = "https://api.nasa.gov/neo/rest/v1/feed";

function contentLoaded(){

    const infoElement = document.getElementById("info");

    start.addEventListener("change", function(){

        fetch(`${url}?start_date=${this.value}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => infoData(data, infoElement))
    })
}

/* Busca por data*/

function infoData({near_earth_objects}, infoElement){

    infoElement.innerHTML = Object.keys(near_earth_objects).map(date=>{

        return near_earth_objects[date].map(asteroid=>{

            const name = asteroid.name;
            const min = asteroid.estimated_diameter.kilometers.estimated_diameter_min;
            const max = asteroid.estimated_diameter.kilometers.estimated_diameter_max;
            const dangerous = asteroid.is_potentially_hazardous_asteroid;
            const close_approach_data = asteroid.close_approach_data.shift();
            const miss_distance = close_approach_data.miss_distance.kilometers;

            return `<tr>
            
                <td>${name}</td>
                <td>${min}</td>
                <td>${max}</td>
                <td>${miss_distance}</td>
                <td>${dangerous ? "SIM" : "NÃO"}</td>
                <td>${date}</td>
            
            </tr>`

        }).join("");

    }).join("");
}

function handleError(error){
    console.warn(error.message);
}


window.addEventListener("DOMContentLoaded", contentLoaded)

// /* Busca por nome*/

function searchTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search");
    filter = input.value.toLowerCase();
    table = document.getElementById("list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toLowerCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }

}

// document.getElementById("search").addEventListener("keyup", function(){
//     var asteroidSearch = document.getElementById("search").value.toLoweCase();

//     for (var i = 0; i<tbody.childNodes.leght; i++) {
//         var find = false;
//         var tr = tbody.childNodes[i];
//         var td = tr.childNodes;
//         for (var j = 0; j< td.lenght; j++) {
//             var value = td[j].childNodes[0].nodeValue.toLoweCase();
//             if (value.indexOf(asteroidSearch) >= 0) {
//                 find = true;
//             }
//         }
//     }   if (find) {
//         tr.style.display = "table-row";
//         } else {
//             tr.style.display = "none";
//         }
// });
