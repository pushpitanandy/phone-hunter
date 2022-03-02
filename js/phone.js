//search button handler
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear search field
    searchField.value = '';
    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

// display phone search results
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    //check if phones have been found or not
    if (phones.length == 0) {
        const phoneDetails = document.getElementById('phone-details');
        phoneDetails.textContent = '';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <p class="text-center fw-bold">No phone was found. Try searching again.</p>
        `;
        searchResult.appendChild(div);
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h6>${phone.brand}</h6>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="bg-success text-white p-2">Show Details</button>
                </div>
            </div>`;
            searchResult.appendChild(div);
        })
    }
}

//show detail button handler
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

// display phone detail
const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <h6>${phone.brand}</h6>
            <p>${phone.releaseDate}</p>
            <h6>Main Features</h6>
            <li>Chip Set: ${phone.mainFeatures.chipSet}</li>            
            <li>Display Size: ${phone.mainFeatures.displaySize}</li>            
            <li>Memory: ${phone.mainFeatures.memory}</li>
            <li>Storage: ${phone.mainFeatures.storage}</li>
            <li>Sensors: ${phone.mainFeatures.sensors}</li>

        </div>
    `;
    phoneDetails.appendChild(div);
}