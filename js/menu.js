const target = document.getElementById("selector");

const pBazy = document.getElementById("pBazy");
const pSS = document.getElementById("pSS");
const pNudy = document.getElementById("pNudy");

const inputBazy = document.getElementById("inputBazy");
const inputSS = document.getElementById("inputSS");
const inputNudy = document.getElementById("inputNudy");

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
            people.push(new person(element.name, element.baza, element.ss, element.nuda, element.opinie));
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

function handleSubmit(event) {
    event.preventDefault();

    const selectedValue = target.value - 1;
    const ilOpini = people[selectedValue].opinie;

    people[selectedValue].baza = ((people[selectedValue].baza * ilOpini) + inputBazy) / (ilOpini + 1);
    people[selectedValue].ss = ((people[selectedValue].ss * ilOpini) + inputSS) / (ilOpini + 1);
    people[selectedValue].nuda = ((people[selectedValue].nuda * ilOpini) + inputNudy) / (ilOpini + 1);

    people[selectedValue].opinie = people[selectedValue].opinie + 1;

    updatedData = JSON.stringify(people);
    console.log(updatedData)

    fetch('data/opinions.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: updatedData
    })
    .then(response => response.json())
    .then(newData => {
        console.log('JSON file updated successfully:', newData);
    })
    .catch(error => {
        console.log('Error:', error);
    });
    
}