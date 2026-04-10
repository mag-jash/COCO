let cart = [];
let total = 0;
function sendWhatsApp() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let mensaje = "¡Hola! Quisiera realizar el siguiente pedido de Coco Garra:\n\n";
    
    cart.forEach(item => {
        mensaje += `✅ ${item.name} - $${item.price} x ${item.quantity}\n`;
    });

    mensaje += `\n*Total a pagar: $${total}*`;
    mensaje += "\n\n¿Me podrían confirmar la disponibilidad?";

    // Reemplaza el número con el tuyo (sin espacios ni el símbolo +)
    const telefono = "52722XXXXXXX"; 
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
}
function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartUI();
    document.getElementById('cart-button').style.display = 'flex';
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const modalTotal = document.getElementById('modal-total');
    const itemsList = document.getElementById('cart-items-list');
    
    itemsList.innerHTML = "";
    let count = 0;
    total = 0;

    cart.forEach((item, index) => {
        count += item.quantity;
        total += (item.price * item.quantity);
        
        itemsList.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.name}</strong><br>
                    $${item.price} x ${item.quantity}
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = total;
    modalTotal.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    if (cart.length === 0) {
        toggleCart();
        document.getElementById('cart-button').style.display = 'none';
    }
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}


  function submitReview() {

        // Obtenemos los elementos

        const nameInput = document.getElementById('rev-name');

        const textInput = document.getElementById('rev-text');

        const container = document.getElementById('reviews-container');

        // Validamos que no estén vacíos o solo con espacios

        const name = nameInput.value.trim();

        const text = textInput.value.trim();

        if (name !== "" && text !== "") {

            // Crear el elemento div de la tarjeta

            const newReview = document.createElement('div');

            newReview.className = 'review-card';

            // Usamos innerText para el contenido y evitamos inyección de código (XSS)

            newReview.innerHTML = `<p>"${text}"</p><h4>- ${name}</h4>`;

            // Agregar al inicio con una pequeña animación si tienes CSS

            container.prepend(newReview);

            // Limpiar los campos después de publicar



            nameInput.value = '';



            textInput.value = '';



            



            alert("¡Gracias por tu opinión!");



        } else {



            alert("Por favor, llena ambos campos antes de publicar.");



        }



    }
