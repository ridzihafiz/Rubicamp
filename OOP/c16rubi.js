class Tyre {
    constructor(brand, size){
      this._brand = brand
      this._size = size
    }
    get brand(){
      return this._brand
    }
    set brand(brand){
      this._brand = brand
    }
    get size(){
      return this._size
    }
    set size(size){
      this._size = size
    }
  }
  class Car{
    constructor(tyre, doors, seat, year, warranty, model){
      this.engineNumber = Date.now()
      this.tyre = tyre
      this.doors = doors
      this.seat = seat
      this.year = year
      this.warranty = warranty // tahun
      this.model = model
      this.warrantyExpired = false;
    }
  }
  class Agya extends Car{
    constructor(year){
      super(new Tyre('Bridgestone', '15"'), 4, 5, year, 1, "Agya");
    }
  }
  class Rush extends Car{
    constructor(year){
      super(new Tyre('Dunlop', '17"'), 5, 7, year, 3, "Rush");
    }
  }
  class CarFactory{
    constructor(){
      this.cars = [];
    }
    static randomInt(){
      return Math.floor(Math.random() * (5 - 1)) + 1;
    }
    produce(year){
      // produce agya
      for (var i = 0; i < CarFactory.randomInt(); i++) {
        this.cars.push(new Agya(year));
      }
      // produce rush
      for (var i = 0; i < CarFactory.randomInt(); i++) {
        this.cars.push(new Rush(year));
      }
    }
    simulateWarranty(simulationYear){
      this.cars = this.cars.map(item => {
        if(simulationYear - item.year > item.warranty){
          item.warrantyExpired = true;
        }
        return item
      })
    }
    printProduction(){
      console.log(`hasil produksi saat ini adalah :`);
      this.cars.forEach((item, index) => {
        console.log(`
          ${index + 1}. Nomor Mesin : ${item.engineNumber}
                        Model : ${item.model}
                        Lama Garansi : ${item.warranty}
                        status Garansi : ${item.warrantyExpired ? 'kadaluarsa' : 'aktif'}
                        Tahun Pembuatan : ${item.year}
                        Jumlah Kursi : ${item.seat}
                        Jumlah Pintu : ${item.doors}
                        Spesifikasi Ban : - Merk => ${item.tyre.brand}
                                          - Ukuran => ${item.tyre.size}
        ==================================================================
          `);
      })
    }
  }
  const toyota = new CarFactory();
  toyota.produce(2014);
  toyota.produce(2018);
  toyota.printProduction();
  toyota.simulateWarranty(2019);
  toyota.printProduction();
  