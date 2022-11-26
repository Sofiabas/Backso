import admin from "firebase-admin";

class ContenedorFirebase {
  constructor(connection, collection) {
    this.connection = connection;
    this.collection = collection;
  }
  async saveProduct(Object) {
    try {
      await this.connection();

      const query = admin.firestore().collection(this.collection);
      const querySnapshot = await query.get();
      let productos = querySnapshot.docs.map((doc) => {
        let objeto = doc.data();
        objeto.id = parseInt(doc.id);
        return objeto;
      });

      const ids = productos.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      Object.id = nuevoId;
      Object.timestamp = Date.now();

      let doc = query.doc(`${nuevoId}`);
      await doc.create(Object);

      console.log(`Registro agregado con id ${nuevoId}`);

      admin.app().delete();

      return Object;
    } catch (error) {
      console.log(error);
      admin.app().delete();
    }
  }
  async saveCart(Array) {
    try {
      await this.connection();

      const query = admin.firestore().collection(this.collection);
      const querySnapshot = await query.get();
      let carritos = querySnapshot.docs.map((doc) => {
        let objeto = doc.data();
        objeto.id = parseInt(doc.id);
        return objeto;
      });

      const ids = carritos.map((object) => {
        return object.id;
      });

      let nuevoId = 1;

      if (ids.length > 0) nuevoId = Math.max(...ids) + 1;

      const nuevoCarrito = {
        timestamp: Date.now(),
        productos: Array,
      };

      let doc = query.doc(`${nuevoId}`);
      await doc.create(nuevoCarrito);

      console.log(`Registro agregado con id ${nuevoId}`);

      admin.app().delete();

      return nuevoId;
    } catch (error) {
      console.log(error);
      admin.app().delete();
    }
  }
  async editById(id, Object) {
    try {
      await this.connection();

      const query = admin.firestore().collection(this.collection);
      const querySnapshot = await query.get();
      let productos = querySnapshot.docs.map((doc) => {
        let objeto = doc.data();
        objeto.id = parseInt(doc.id);
        return objeto;
      });

      let producto = productos.find((producto) => producto.id === parseInt(id));

      if (!producto) {
        return { error: "registro no encontrado" };
      } else {
        const { nombre, descripcion, codigo, precio, stock, timestamp, foto } =
          Object;

        nombre && (await query.doc(`${id}`).update({ nombre: nombre }));
        descripcion &&
          (await query.doc(`${id}`).update({ descripcion: descripcion }));
        codigo && (await query.doc(`${id}`).update({ codigo: codigo }));
        precio && (await query.doc(`${id}`).update({ precio: precio }));
        stock && (await query.doc(`${id}`).update({ stock: stock }));
        timestamp &&
          (await query.doc(`${id}`).update({ timestamp: timestamp }));
        foto && (await query.doc(`${id}`).update({ foto: foto }));

        console.log(`Registro editado con id ${id}`);

        let doc = query.doc(`${id}`);
        const item = await doc.get();
        const resultado = item.data();

        admin.app().delete();

        return resultado;
      }
    } catch (error) {
      console.log(error);
      admin.app().delete();
    }
  }
  async saveById(id, Object) {
    try {
      await this.connection();

      const query = admin.firestore().collection(this.collection);
      const querySnapshot = await query.get();
      let carritos = querySnapshot.docs.map((doc) => {
        let objeto = doc.data();
        objeto.id = parseInt(doc.id);
        return objeto;
      });

      let carrito = carritos.find((carrito) => carrito.id === parseInt(id));

      if (!carrito) {
        return { error: "registro no encontrado" };
      }

      carrito.productos.push(Object);

      await query.doc(`${id}`).update({ productos: carrito.productos });

      console.log(`Registro con id ${id} editado.`);

      admin.app().delete();

      return carrito;
    } catch (error) {
      console.log(error);
      admin.app().delete();
    }
  }
  async getById(Number) {
    try {
      await this.connection();

      const query = admin.firestore().collection(this.collection);
      const querySnapshot = await query.get();
      let resultados = querySnapshot.docs.map((doc) => {
        let objeto = doc.data();
        objeto.id = parseInt(doc.id);
        return objeto;
      });

      let resultado = resultados.find((elem) => elem.id == Number);

      if (!resultado) return (resultado = { error: "registro no encontrado" });

      resultado.productos && (resultado = resultado.productos);

      admin.app().delete();

      return resultado;
    } catch (error) {
      console.log(error);
      admin.app().delete();
    }
  }
  async getAll() {
    try {
      await this.connection();

      const query = admin.firestore().collection(this.collection);
      const querySnapshot = await query.get();
      let resultados = querySnapshot.docs.map((doc) => {
        let objeto = doc.data();
        objeto.id = parseInt(doc.id);
        return objeto;
      });

      admin.app().delete();

      return resultados;
    } catch (error) {
      console.log(error);
      admin.app().delete();
    }
  }
  async deleteById(Number) {
    try {
      await this.connection();

      const query = admin.firestore().collection(this.collection);
      const querySnapshot = await query.get();
      let resultados = querySnapshot.docs.map((doc) => {
        let objeto = doc.data();
        objeto.id = parseInt(doc.id);
        return objeto;
      });

      const resultado = resultados.find((elem) => elem.id == Number);

      if (!resultado) {
        console.log("El registro no existe.");
        return { error: "registro no encontrado" };
      }

      await query.doc(`${Number}`).delete();

      console.log(`Registro con ID ${Number} eliminado.`);

      admin.app().delete();

      return resultado;
    } catch (error) {
      console.log(error);
      admin.app().delete();
    }
  }
  async deleteByProduct(id, id_prod) {
    try {
      await this.connection();

      const query = admin.firestore().collection(this.collection);
      const querySnapshot = await query.get();
      let carritos = querySnapshot.docs.map((doc) => {
        let objeto = doc.data();
        objeto.id = parseInt(doc.id);
        return objeto;
      });

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

      await query.doc(`${id}`).update({ productos: nuevosProductos });

      console.log(`Registro con id ${id} editado.`);

      admin.app().delete();

      return carrito;
    } catch (error) {
      console.log(error);
      admin.app().delete();
    }
  }
}

export { ContenedorFirebase };
