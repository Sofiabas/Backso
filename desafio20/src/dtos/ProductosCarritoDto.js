class ProductosCarritoDto {
  constructor(producto, qty) {
    for (const [key, value] of Object.entries(producto)) {
      this[key] = value;
    }
    this._doc.qty = qty;
  }
}

export default ProductosCarritoDto;
