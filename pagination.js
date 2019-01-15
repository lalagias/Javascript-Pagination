// Pagination

// rows of tables
let rows = 120;

// number of pages
let numberOfPages = rows / 10;
console.log('NUMBER OF PAGES: ', numberOfPages);

if (numberOfPages > 0) {

    // Initialize Previous Button
    const paginationDOM = document.getElementById('pagination');
    const previous = document.createElement("button");
    const previousText = document.createTextNode("previous")
    previous.appendChild(previousText);
    previous.classList.add("previous");
    previous.setAttribute("id", "previous");
    paginationDOM.appendChild(previous);

    // Initialize Previous Dots Button
    const previousDots = document.createElement("button");
    const previousDotsText = document.createTextNode("...")
    previousDots.appendChild(previousDotsText);
    previousDots.classList.add("previousDots");
    previousDots.setAttribute("id", "previousDots");
    paginationDOM.appendChild(previousDots);
    previousDots.style.display = 'none';

    //Create buttons from 1 to numberOfPages buttons
    for (let i = 0; i < numberOfPages; i++) {
        const button = document.createElement("button");
        const node = document.createTextNode(i + 1);
        if (i === 0) {
            button.appendChild(node);
            paginationDOM.appendChild(button);
            button.classList.add("activePage");
        } else {
            button.appendChild(node);
            paginationDOM.appendChild(button);
        }
        button.setAttribute("id", i);
        button.classList.add("pages");
        button.value = i + 1;
    }

    // Initialize Next Dots Button
    const nextDots = document.createElement("button");
    const nextDotsText = document.createTextNode("...")
    nextDots.appendChild(nextDotsText);
    nextDots.classList.add("nextDots");
    nextDots.setAttribute("id", "nextDots");
    paginationDOM.appendChild(nextDots);
    nextDots.style.display = 'inline-block';

    // Initialize Next Button
    const next = document.createElement("button");
    const nextText = document.createTextNode("next")
    next.appendChild(nextText);
    next.classList.add("next");
    next.setAttribute("id", "next");
    paginationDOM.appendChild(next);
}

// hold a nodeList of all buttons of pagination
const pages = document.querySelectorAll('.pages');
//console.log(pages);

// addEventListener on click, for every button in the nodeList
pages.forEach(function (page) {
    page.addEventListener('click', (e) => pagination(e.target));
});

// assign the activePage to a variable
let activePage = document.querySelector('.activePage').value;

//console.log('CURRENT ACTIVE PAGE: ', activePage);

if (pages.length > 5) {
    //    console.log('more than 5 PAGES');
    pages.forEach(function (page) {
        if (page.value > 5) {
            page.style.display = 'none';
        }
    })
}

function pagination(e) {

    console.log("PAGINATION INVOKED");
    console.log(e);

    let activePageDOM = document.querySelector('.activePage');

    let previousActiveValue = activePageDOM.value;
    console.log('previous ACtive page', previousActiveValue);

    activePageDOM.classList.remove("activePage");

    document.getElementById(`${Number(e.value) - 1}`).classList.add("activePage");
    activePage = document.querySelector('.activePage').value;

    console.log('NEW ACTIVE PAGE', activePage);

    let i = ((activePage) > 5 ? (activePage) - 2 : 1);

    console.log('EVENT VALUE', e.value);

    if (Number(e.value) > previousActiveValue) {

        console.log('TRUE', e.value, previousActiveValue);

        if (Number(e.value) !== numberOfPages) {

            for (; i <= (activePage + 2) && i <= numberOfPages; i++) {
                document.getElementById(`${Number(activePage)}`).style.display = "inline-block";
            }
        }


        for (let j = Number(activePage) - 5; j >= 2; j--) {
            //            console.log("reverse:", j);
            document.getElementById(`${j}`).style.display = "none";
            document.getElementById(`${j -1}`).style.display = "none";
            document.getElementById(`${j -2}`).style.display = "none";

            document.getElementById('previousDots').style.display = "inline-block";
        }
    } else if (Number(e.value) < previousActiveValue) {

        console.log('FALSE', e.value, previousActiveValue);
        console.log(e.value, e.value - 1);

        if (Number(e.value) - 2 >= 0) {
            document.getElementById(`${Number(e.value) - 2}`).style.display = "inline-block";
        }

        if (Number(e.value) - 3 >= 0) {
            document.getElementById(`${Number(e.value) - 3}`).style.display = "inline-block";
        }

        if (Number(e.value) + 2 < numberOfPages) {
            document.getElementById(`${Number(e.value) + 2}`).style.display = "none";
        }

        if (Number(e.value) + 3 < numberOfPages) {
            document.getElementById(`${Number(e.value) + 3}`).style.display = "none";
        }

        if (document.getElementById('0').style.display === "inline-block") {
            document.getElementById('previousDots').style.display = "none";
        }

    } else {
        console.log('tipota');
    }


    if (Number(activePage) === 1) {
        console.log('its 1 ', activePage);
        document.getElementById("previous").disabled = true;
        document.getElementById("previous").classList.add("inactiveLink");

    } else if (Number(activePage) === numberOfPages) {
        document.getElementById("next").disabled = true;
        document.getElementById("next").classList.add("inactiveLink");
    } else {
        document.getElementById("previous").classList.remove("inactiveLink");
        document.getElementById("next").classList.remove("inactiveLink");
        document.getElementById("previous").disabled = false;
        document.getElementById("next").disabled = false;
    }

    if (document.getElementById(`${numberOfPages - 1}`).style.display !== "inline-block") {
        document.getElementById('nextDots').style.display = "inline-block";
    }

    if (Number(e.value) <= 3) {
        document.getElementById("3").style.display = "inline-block";
        document.getElementById("4").style.display = "inline-block";
    } else if (Number(e.value) === numberOfPages) {
        console.log('kalispera');
        document.getElementById(`${Number(e.value) - 5}`).style.display = "inline-block";
    }


    if (document.getElementById(`${numberOfPages - 1}`).style.display === "inline-block") {
        document.getElementById('nextDots').style.display = "none";
    }

    document.querySelector('.active').innerHTML = `${activePage}`;

}

function nextPrevious(e) {
    console.log(e.target);
    if (e.target.getAttribute('id') === 'next') {
        console.log('ghygcftyhfg,', activePage);
        let nextButton = document.getElementById(Number(activePage));
        console.log('NEXT,', nextButton);
        pagination(nextButton);
    } else if (e.target.getAttribute('id') === 'previous') {
        let previousButton = document.getElementById(Number(activePage) - 2);
        console.log('PREVIOUS,', previousButton);
        pagination(previousButton);
    }
}

const eventButton1 = document.getElementById('0');
pagination(eventButton1);

document.querySelector('.next').addEventListener('click', (e) => nextPrevious(e));
document.querySelector('.previous').addEventListener('click', (e) => nextPrevious(e));
