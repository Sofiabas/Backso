const socket = io(); 

const addProduct = (e) => {
  const producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("producto", producto);
  return false;
};

socket.on("productos", (data) => {
  const html = data
    .map((elem, index) => {
      return `<tr>
    <td style="color: white;">${elem.title}</td>
    <td style="color: white;">${elem.price}</td>
    <td><img src="${elem.thumbnail}" /></td>
  </tr>`;
    })
    .join(" ");
  document.getElementById("productos").innerHTML = html;
});

const addMessage = (e) => {
  if (document.getElementById("username").value === "") {
    return alert("Email Requerido");
  }

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const now = new Date();
  const nowFormated = now.toLocaleDateString("es-AR", options).replace(",", "");

  const mensaje = {
    author: document.getElementById("username").value,
    fecha: nowFormated,
    text: document.getElementById("texto").value,
  };
  socket.emit("mensaje", mensaje);
  return false;
};

socket.on("mensajes", (data) => {
  const html = data
    .map((elem, index) => {
      return `<div><strong style="color: blue;">${elem.email}</strong> <span style="color: brown;">${elem.fecha}</span>: <em style="color: green;">${elem.text}</em></div>`;
    })
    .join(" ");

  document.getElementById("mensajes").innerHTML = html;
});
