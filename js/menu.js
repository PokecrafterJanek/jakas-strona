const target = document.getElementById("selector");

const pBazy = document.getElementById("pBazy");
const pSS = document.getElementById("pSS");
const pNudy = document.getElementById("pNudy");


class person {
    constructor(name, baza, ss, nuda, opinie) {
        this.name = name;
        this.baza = baza;
        this.ss = ss;
        this.nuda = nuda;
        this.opinie = opinie;
    }
}

var people = [];

fetch('data/opinions.json')
    .then(response => response.json())
    .then(input => {
        console.log(input);

        const l = input.length;

        console.log(l);

        var i = 1;

        input.forEach(element => {
            people.push(new person(element.Name, element.Baza, element.SS, element.Nuda, element.Opinie));
            const newOption = document.createElement("option");
            newOption.text = element.Name;
            newOption.className = "opcja";
            newOption.value = i;
            target.appendChild(newOption);
            i++;
        });


        console.log(people);
    })
    .catch(error => {
        console.log('Error:', error);
    });

target.addEventListener('change', function() {
    const selectedValue = target.value - 1;
    pBazy.innerText = people[selectedValue].baza * 100 + "%";
    pSS.innerText = people[selectedValue].ss * 100 + "%";
    pNudy.innerText = people[selectedValue].nuda * 100 + "%";
});