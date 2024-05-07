const socket = io();

socket.on("productos", (data) => {
  renderizar(data);
});

const renderizar = (productos) => {
  const container = document.getElementById("container");
  container.innerHTML = "";

  productos.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `
                        <div class="card">
                            <img src=${item.thumbnail}" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">${item.description}</p>
                                <p class="card-text">${item.price}</p>
                                <button class="btn btn-primary">Eliminar</button>
                            </div>
                        </div>
                        `;
    container.appendChild(card);
    // container.className("card");

    card.querySelector("button").addEventListener("click", () => {
      eliminarProducto(item.id);
    });
  });
};

const eliminarProducto = (id) => {
  socket.emit("eliminarProducto", id);
};

document.getElementById("btnEnviar").addEventListener("click", () => {
  agregarProducto();
});

const agregarProducto = () => {
  const producto = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    img: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    status: document.getElementById("status").value === "true",
  };
  socket.emit("agregarProducto", producto);
};
