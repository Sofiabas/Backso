const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

const addMessage = (e) => {
  if (document.getElementById("username").value === "")
    return alert("Email obligatorio");
  if (document.getElementById("firstname").value === "")
    return alert("Nombre obligatorio");
  if (document.getElementById("lastname").value === "")
    return alert("Apellido obligatorio");
  if (document.getElementById("age").value === "")
    return alert("Edad obligatorio");
  if (document.getElementById("alias").value === "")
    return alert("Alias obligatorio");
  if (document.getElementById("avatar").value === "")
    return alert("Avatar obligatorio");

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
    author: {
      id: document.getElementById("username").value,
      nombre: document.getElementById("firstname").value,
      apellido: document.getElementById("lastname").value,
      edad: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    fecha: nowFormated,
    text: document.getElementById("texto").value,
  };
  socket.emit("mensaje", mensaje);
  return false;
};

socket.on("mensajes", (data) => {
  const html = data
    .map((elem, index) => {
      return `<div><strong style="color: blue;">${elem.author.id}</strong> <span style="color: brown;">${elem.fecha}</span>: <em style="color: green;">${elem.text}</em><img src="${elem.author.avatar}" /></div>`;
    })
    .join(" ");
  const divmensajes = document.getElementById("mensajes");
  if (divmensajes) divmensajes.innerHTML = html;
});

const onLoadRedirect = () => {
  if (window.location.href.includes("logout")) {
    setTimeout(() => {
      window.location = "/login";
    }, 2000);
  }
};
