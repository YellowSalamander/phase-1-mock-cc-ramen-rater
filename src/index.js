// write your code here
function fetchRamenFromServer() {
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data=> {
        console.log('response Data:', data)
        const ramens = data;

        console.log('Ramen Data:', ramens)

        const ramenMenu = document.getElementById('ramen-menu');
        const ramenDetail = document.getElementById('ramen-detail');
        const ratingDisplay = document.getElementById('rating-display');
        const commentDisplay = document.getElementById('comment-display');
        
        ramenMenu.innerHTML = ''

        ramens.forEach(ramen => {
            const menuItem = document.createElement('div')
            menuItem.classList.add('menu-item');

            const image = document.createElement('img');
            image.classList.add('menu-image')
            image.src = ramen.image;
            image.alt = ramen.name;

            menuItem.appendChild(image)

            ramenMenu.appendChild(menuItem)

            menuItem.addEventListener('click', () => {
                const detailImage = document.querySelector('#ramen-detail .detail-image');
                const name = document.querySelector('#ramen-detail .name')
                const restaurant = document.querySelector('#ramen-detail .restaurant')

                detailImage.src = ramen.image;
                detailImage.alt = ramen.name;
                name.textContent = ramen.name
                restaurant.textContent = ramen.restaurant;

                ratingDisplay.textContent = ramen.rating
                commentDisplay.textContent = ramen.comment
            })
        })
    })
    .catch(error => console.log('error', error))
}

function addNewRamen(event){
    event.preventDefault();
    const form = document.getElementById('new-ramen')
    const nameInput = document.getElementById('new-name')
    const restaurantInput = document.getElementById('new-restaurant')
    const imageInput = document.getElementById('new-image')
    const ratingInput = document.getElementById('new-rating')
    const commentInput = document.getElementById('new-comment')

    const ramen = {
        name: nameInput.value,
        restaurant: restaurantInput.value,
        image: imageInput.value ,
        rating: parseInt(ratingInput.value),
        comment: commentInput.value 
    };

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(ramen) 
    })
    .then(res => res.json())
    .then(data => {
        fetchRamenFromServer()
        form.reset() 
    })
.catch(error => console.log('Error:', error))
}


document.addEventListener('DOMContentLoaded', () => {
    fetchRamenFromServer()
    const newRamenForm = document.getElementById('new-ramen');
    newRamenForm.addEventListener('submit' , addNewRamen) 
});