let cart = [];
let total = 0;

function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartUI();
    
    // Mostrar el botón flotante si hay algo
    document.getElementById('cart-button').style.display = 'flex';
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const modalTotal = document.getElementById('modal-total');
    const itemsList = document.getElementById('cart-items-list');
    
    // Limpiar lista
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
    if (cart.length === 0) toggleCart(); // Cierra si queda vacío
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Cambia tu botón flotante para que llame a toggleCart() en lugar de checkout() directamente
// <button id="cart-button" onclick="toggleCart()"> ... </button>

function sendWhatsApp() {
    if (cart.length === 0) return alert("El carrito está vacío");
    
    let message = "¡Hola Coco Garra! Me gustaría pedir:%0A";
    cart.forEach(item => {
        message += `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})%0A`;
    });
    message += `%0A*Total: $${total}*`;
    
    window.open(`https://wa.me/527297276189?text=${message}`, '_blank');
}

        message += `%0A💰 *Total a pagar: $${totalValue}*%0A¿Me podrían dar información para el pago?`;

        // Abrir WhatsApp con el pedido
        window.open(`https://wa.me/527297276189?text=${message}`, '_blank');
    }
</script>
