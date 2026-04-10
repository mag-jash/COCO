<script>
    let cart = [];

    function addToCart(name, price) {
        // Añadimos el objeto al arreglo
        cart.push({ name, price });
        
        // Ejecutamos la actualización visual
        updateCartUI();
        
        // Opcional: una pequeña alerta visual o log
        console.log(`Añadido: ${name}`);
    }

    function updateCartUI() {
        const btn = document.getElementById('cart-button');
        const countSpan = document.getElementById('cart-count');
        const totalSpan = document.getElementById('cart-total');

        if (cart.length > 0) {
            // Hacemos visible el botón si hay productos
            btn.style.display = 'flex';
            
            // Actualizamos la cantidad de items
            countSpan.innerText = cart.length;

            // Calculamos el total
            const totalValue = cart.reduce((sum, item) => sum + item.price, 0);
            totalSpan.innerText = totalValue.toLocaleString(); // Formato con comas
        } else {
            btn.style.display = 'none';
        }
    }

    function checkout() {
        if (cart.length === 0) return;

        const totalValue = cart.reduce((sum, item) => sum + item.price, 0);
        let message = "¡Hola Coco Garra! Me interesa comprar lo siguiente:%0A%0A";

        // Agrupamos productos repetidos para que el mensaje sea claro
        const summary = cart.reduce((acc, curr) => {
            acc[curr.name] = (acc[curr.name] || 0) + 1;
            return acc;
        }, {});

        for (const [product, qty] of Object.entries(summary)) {
            message += `✅ ${qty}x ${product}%0A`;
        }

        message += `%0A💰 *Total a pagar: $${totalValue}*%0A¿Me podrían dar información para el pago?`;

        // Abrir WhatsApp con el pedido
        window.open(`https://wa.me/527297276189?text=${message}`, '_blank');
    }
</script>
