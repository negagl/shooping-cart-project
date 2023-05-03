const cart = document.querySelector('#carrito');
const cartList = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.querySelector('#vaciar-carrito');
const coursesList = document.querySelector('#lista-cursos');
let cartItems = [];

loadEventListeners();

function loadEventListeners() {
    // add a course when pressing "Agregar al Carrito"
    coursesList.addEventListener('click', addCourseToCart);

    // remove a course
    cart.addEventListener('click', removeCourseFromCart);

    // remove all courses
    clearCartBtn.addEventListener('click', removeAllCourses);
}

// Add course to cart
function addCourseToCart(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        // Select a course and read all the info
        const selectedCourse = e.target.parentElement.parentElement;
        const newCourse = readCourseDetails(selectedCourse);

        // Check if course was already added
        const itemExists = cartItems.some(item => item.id === newCourse.id);

        if (itemExists) {
            const courses = cartItems.map(course => {
                if (course.id === newCourse.id) {
                    course.quantity++;
                    return course;
                } else {
                    return course;
                }
            });

            // Add items updated to the list
            cartItems = [...courses];

        } else {
            // Add items to the list if there are not repeated items
            cartItems = [...cartItems, newCourse];
        }

        // Display items in the cart
        htmlItemsInCart(cartItems);
    }
}

// Remove course from cart
function removeCourseFromCart(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const itemId = e.target.getAttribute('data-id');

        cartItems = cartItems.filter(item => item.id !== itemId);

        htmlItemsInCart(cartItems);
    }
}

// Clear all cart items
function removeAllCourses() {
    cartItems = [];
    cleanCart();
}

// Extract information of the card we're trying to add to cart
function readCourseDetails(course) {
    // Create an object with the course info
    const info = {
        image: course.querySelector('img').src,
        title: course.querySelector('.info-card h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('.info-card a').getAttribute('data-id'),
        quantity: 1,
    };

    return info;
}

// Create HTML for each item in card
function htmlItemsInCart(courses) {

    // first we have to clean the HTML so courses dont accumulate
    cleanCart();


    // Iterate throught the cart and create the items
    courses.forEach(course => {
        const { image, title, price, quantity, id } = course;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src='${image}' width='100px'/>
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        cartList.appendChild(row);
    });

}

// Clean HTML
function cleanCart() {
    // cartList.innerHTML = '';

    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
}
