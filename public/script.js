const favoriteDishesData = [
    "Burger",
    "Pizza",
    "veg thali",
    "chole bhature"
];


const canteensData = [
    {
        name: "Canteen 1",
        image: "canteen1.jpg",
        menu: [
            { dish: "veg thali", price: 40},
            { dish: "chole bhature", price: 40},
           
        ]
    },
    {
        name: "Canteen 2",
        image: "canteen2.jpg",
        menu: [
            { dish: "Pasta", price: 7 },
            { dish: "Sandwich", price: 5 },
            // Add more dishes here
        ]
    },
    
];

function populateFavoriteDishes() {
    const favoriteDishesList = document.getElementById('favoriteDishes');
    favoriteDishesData.forEach(dish => {
        const listItem = document.createElement('li');
        listItem.textContent = dish;
        favoriteDishesList.appendChild(listItem);
    });
}


function populateCanteensList() {
    const canteensList = document.getElementById('canteens');
    canteensData.forEach(canteen => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = canteen.name;
        link.href = `#menu-${canteen.name.replace(/\s/g, '')}`;
        listItem.appendChild(link);
        canteensList.appendChild(listItem);
    });
}



function populateCanteenMenu() {
    const menuDiv = document.getElementById('menu');
    canteensData.forEach(canteen => {
        const canteenMenuDiv = document.createElement('div');
        canteenMenuDiv.id = `menu-${canteen.name.replace(/\s/g, '')}`;
        canteenMenuDiv.style.display = 'none';
        canteenMenuDiv.innerHTML = `<h3>${canteen.name}</h3>`;
        canteen.menu.forEach(item => {
            canteenMenuDiv.innerHTML += `<p>${item.dish}: $${item.price}</p>`;
        });
        menuDiv.appendChild(canteenMenuDiv);
    });
}



function handleLogin(event) {
    event.preventDefault();
    
    console.log('Login form submitted');
}

function handleOrder(event) {
    event.preventDefault();
    const dish = document.getElementById('dish').value;
    const quantity = document.getElementById('quantity').value;
    const canteenAddress = document.getElementById('canteenAddress').value;
   
    console.log(`Order placed for ${quantity} ${dish}(s) from ${canteenAddress}`);
}

function populateDishes() {
    const dishSelect = document.getElementById('dish');
    canteensData.forEach(canteen => {
        canteen.menu.forEach(item => {
            const option = document.createElement('option');
            option.value = item.dish;
            option.textContent = `${item.dish} - $${item.price}`;
            dishSelect.appendChild(option);
        });
    });
}


function displayCanteenImage() {
    const canteensList = document.getElementById('canteens');
    canteensList.addEventListener('click', (event) => {
        const canteenName = event.target.textContent;
        const canteen = canteensData.find(c => c.name === canteenName);
        if (canteen) {
            const canteenImage = document.createElement('img');
            canteenImage.src = canteen.image;
            canteenImage.alt = canteen.name;
            const canteenMenuSection = document.getElementById(`menu-${canteen.name.replace(/\s/g, '')}`);
            canteenMenuSection.insertBefore(canteenImage, canteenMenuSection.firstChild);
        }
    });
}



function showHideSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === location.hash.slice(1)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('orderForm').addEventListener('submit', handleOrder);
window.addEventListener('hashchange', showHideSections);


populateFavoriteDishes();
populateCanteensList();
populateCanteenMenu();
populateDishes();
displayCanteenImage();
showHideSections();
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    console.log(data);
  });
  