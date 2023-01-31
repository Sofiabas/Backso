import ServiciosCarritos from "../services/ServiceCarritos.js";
import { mailOptions } from "../middlewares/nodemailer.js";
import {
  ADMIN_PHONE,
  twilioWaNumber,
  messageOptions,
} from "../middlewares/twilio.js";

const carrito = new ServiciosCarritos();
const cartGet = async (req, res) => {
  const user = req.session.user;

  let carritoActual = "";
  let totalActual = 0;

  if (user) {
    const userid = user._id;
    const cart = await carrito.getByUserId(userid);
    carritoActual = await carrito.tablaCarrito(cart);
    totalActual = await carrito.totalCarrito(cart);
  }

  res.status(200).render("cart", {
    user: req.session.user,
    body: carritoActual,
    total: totalActual,
  });
};

const cartPost = async (req, res) => {
  const user = req.session.user;

  let carritoActual = "";
  let totalActual = 0;

  carritoActual += `<table class="table" style="background-color: black; color: white">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Picture</th>
        <th scope="col">Qty</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody id="productos" style="color: gray">`;

  if (user) {
    const userid = user._id;
    const cart = await carrito.getByUserId(userid);
    carritoActual += await carrito.tablaCarrito(cart);
    totalActual = await carrito.totalCarrito(cart);
  }

  carritoActual += `</tbody>
    </table>
    <p>Total: <strong>${totalActual}</strong></p>`;

  ////////// Nodemailer ///////////

  mailOptions.subject = `nuevo pedido de ${user.name} (${user.address})`;
  mailOptions.html = carritoActual;

  carrito.sendMail(mailOptions);

  ///////// Twilio SMS //////////

  messageOptions.body = `Hemos recibido tu pedido ${user.name}`;
  messageOptions.to = user.phone;

  carrito.sendSms(messageOptions);

  ///////// Twilio Wap //////////

  const wapOptions = {};

  wapOptions.body = `nuevo pedido de ${user.name} (${user.address})`;
  wapOptions.from = `whatsapp:${twilioWaNumber}`;
  wapOptions.to = `whatsapp:${ADMIN_PHONE}`;

  carrito.sendWap(wapOptions);

  ///////////////////////////////

  res.status(200).render("cartsuccess", {
    user: req.session.user,
  });
};

export { cartGet, cartPost };
