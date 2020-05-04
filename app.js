window.addEventListener('load', () => {

    let Productos = [{
            'id': 1,
            'Nombre': 'Celular',
            'img': 'img/3778352_1.jpg',
            'precio': 8000

        },
        {
            'id': 2,
            'Nombre': 'Televisor',
            'img': 'img/vintage-tv-1116587__340.webp',
            'precio': 2500

        }, {
            'id': 3,
            'Nombre': 'Equipo de sonido',
            'img': 'img/índice.jpg',
            'precio': 3000

        }
    ];

    //variables
    let card = document.getElementById('card');
    let carr = document.getElementById('carrito');
    let Tcarr = document.getElementById('total');
    let total = 0;
    let carrito = [];

    //funciones
    function cargardata() {

        for (let producto of Productos) {
            card.innerHTML += `
          <div class="col mb-4">
          <div class="card">
              <img src="${producto.img}" class="card-img-top" alt=".">
              <div class="card-body">
                  <h5 class="card-title">${producto.Nombre}</h5>
                  <p class="card-text">Precio: ${producto.precio}</p>
                  <button id="${producto.id}"  class="btn btn-primary btn-block">Agregar</button>
              </div>
          </div>
      </div>`;
        }
    }


    cargardata();

    function caltotal() {
        total = 0;

        for (let row of carrito) {

            let result = Productos.filter(idDB => idDB['id'] == row);

            total = total + result[0]['precio'];
        }

        Tcarr.innerHTML = `<h1>Total: ${total}</h1>`;
    }

    function rendercarrito() {
        carr.innerHTML = '';
        let Pduplicado = [...new Set(carrito)];

        Pduplicado.forEach((item, ind) => {

            let result = Productos.filter(idDB => idDB['id'] == item);

            const cantidad = carrito.reduce((total, valor) => {
                return valor === item ? total += 1 : total;
            }, 0);

            carr.innerHTML += `
        <li class="list-group-item text-right mx-2">
           ${cantidad} ${result[0]['Nombre']} - LPS.${result[0]['precio']}
             <button id="${result[0]['id']}" class="btn btn-danger mx-1">X</button>
        </li>`;

            caltotal();

        });
    }

    function add(e) {
        if ((e.target.localName === 'button') && (e.target.firstChild.nodeValue === 'Agregar')) {
            carrito.push(e.target.id);
            console.log(carrito);
            console.log(e.target.firstChild.nodeValue);
            rendercarrito();
        }

    }


    function borrarItemCarrito(e) {

        // Obtenemos el producto ID que hay en el boton pulsado
        if ((e.target.localName === 'button') && (e.target.firstChild.nodeValue === 'X')) {
            let id = e.target.id;

            // Borramos todos los productos
            carrito = carrito.filter(function(carritoId) {
                return carritoId !== id;
            });
            console.log(carrito);
            // volvemos a renderizar
            rendercarrito();
            caltotal();
        }
    }


    //eventos
    document.body.addEventListener('click', (e) => {

        add(e);
        borrarItemCarrito(e);

    });
});