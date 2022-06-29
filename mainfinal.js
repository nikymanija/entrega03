const fs = require("fs");

class Contenedor {
  constructor(filename) {
    this.filename = filename;
    this.products = [];
    this.nextId = 1;
  }

  init = async () => {
    try {
      const data = await this.readFile();
      if (data.length > 0) {
        this.products = data;
        this.nextId = this.products[data.length - 1].id + 1;
        console.log("Data cargada");
      }
    } catch (e) {
      console.log("no se puede leer la data");
    }
  };

  save = async (obj) => {
    obj.id = this.nextId;
    this.products.push(obj);
    this.nextId++;

    try {
      await this.saveFile();
    } catch (e) {
      console.log(e);
    }
  };

  eliminar = async (obj) => {
    this.products(obj);

    try {
      await this.deleteAll();
    } catch (e) {
      console.log(e);
    }
  };

  getAll = () => this.products;

  saveFile = () =>
    fs.promises.writeFile(this.filename, JSON.stringify(this.products));

  getById = (id) => {
    const data = this.products.find((p) => p.id == id);
    return data ? data : null;
  };

  deleteById = async (id) => {
    const idx = this.products.findIndex((p) => p.id == id);
    this.products.splice(idx, 1);
    try {
      await this.saveFile();
    } catch (e) {
      console.log(e);
    }
  };

  deleteAll = () =>
    fs.promises.unlink(this.filename, JSON.stringify(this.products));

  readFile = () =>
    fs.promises
      .readFile(this.filename, "utf-8")
      .then((data) => JSON.parse(data));
}

module.exports = Contenedor;
