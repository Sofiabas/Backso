import { loggerConsole, loggerFile } from "../utils/loggers.js";
import { transporter } from "../middlewares/nodemailer.js";
import { client } from "../middlewares/twilio.js";
import repoCarritos from "../repos/repoCarritos.js";

class ServiciosCarritos {
  constructor() {
    this.repoCarritos = new repoCarritos();
  }
  async getAll() {
    try {
      return await this.repoCarritos.getAll();
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async saveCart(Array, userid) {
    try {
      let carritos = await this.repoCarritos.getAll();

      const ids = carritos.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      const nuevoCarrito = {
        id: nuevoId,
        timestamp: Date.now(),
        productos: Array,
        userid: userid,
      };

      await this.repoCarritos.save(nuevoCarrito);

      return nuevoId;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async deleteById(Number) {
    try {
      return await this.repoCarritos.deleteById(Number);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getById(Number) {
    try {
      let carrito = await this.repoCarritos.getById(Number);
      if (!carrito) return (carrito = { error: "registro no encontrado" });
      return carrito;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async saveById(id, Object) {
    try {
      let carritos = await this.repoCarritos.getAll();

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "registro no encontrado" };
      }

      carrito.productos.push(Object);

      const objeto = {};
      objeto.productos = carrito.productos;

      return await this.repoCarritos.editById(id, objeto);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async deleteByProduct(id, id_prod) {
    try {
      let carritos = await this.repoCarritos.getAll();

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "registro no encontrado" };
      }

      let producto = carrito.productos.find(
        (producto) => producto.id === parseInt(id_prod)
      );

      if (!producto) {
        return { error: "registro no encontrado" };
      }

      let nuevosProductos = carrito.productos.filter(
        (producto) => producto.id !== parseInt(id_prod)
      );

      carrito.productos = nuevosProductos;

      const objeto = {};
      objeto.productos = nuevosProductos;

      return await this.repoCarritos.editById(id, objeto);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async getByUserId(ID) {
    try {
      let carrito = await this.repoCarritos.getByUserId(ID);
      if (!carrito) return (carrito = { error: "registro no encontrado" });
      return carrito;
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async tablaCarrito(data) {
    return data
      .map((elem, index) => {
        return `<tr>
                    <td style="color: white;">${elem.nombre}</td>
                    <td><img src="${elem.foto}" /></td>
                    <td style="color: white;">${elem.qty}</td>
                    <td style="color: white;">${elem.precio}</td>
                  </tr>`;
      })
      .join(" ");
  }
  async totalCarrito(data) {
    let total = 0;
    data.forEach((elem) => {
      total += elem.precio * elem.qty;
    });

    return total;
  }
  async sendMail(mailOptions) {
    try {
      const info = await transporter.sendMail(mailOptions);
      loggerConsole.info(info);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async sendSms(messageOptions) {
    try {
      const message = await client.messages.create(messageOptions);
      loggerConsole.info(message);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
  async sendWap(wapOptions) {
    try {
      const message = await client.messages.create(wapOptions);
      loggerConsole.info(message);
    } catch (error) {
      loggerConsole.error(error.stack);
      loggerFile.error(error.stack);
    }
  }
}

export default ServiciosCarritos;
