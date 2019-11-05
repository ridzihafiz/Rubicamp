class CarFactory {
    constructor() {
        this.banyakMobil = [Math.floor(Math.random() * 4)];
        console.log(this.banyakMobil);
    }
    
    startAssemble(){
        let carCurrentMonth = [];
        let startHino = new Hino(2,3);
        let startAlphard = new Alphard(5,7);
        let startSkyline = new Skyline(2, 1);
        let startAstonMartin = new AstonMartin (2, 2);
        for(let i =0; i<this.banyakMobil; i++){
            carCurrentMonth.push(startHino.buildHino());
            carCurrentMonth.push(startAlphard.buildAlphard());
            carCurrentMonth.push(startSkyline.buildSkyline());
            carCurrentMonth.push(startAstonMartin.buildAstonMartin());
        }

        console.log(carCurrentMonth);
    }
}

class Car{
    constructor(banyakPintu, banyakKursi){
        this.ban = new Tyre();
        this.banyakPintu = banyakPintu;
        this.banyakKursi = banyakKursi;
        this.TahunHardcode = 3199;
    }
    batasGaransi(){
        let Year = new Date();
        return (Year.getFullYear() + (Math.floor(Math.random() * 4)+ 3));
    }
}

class Tyre{
    constructor(){
        let arrBan = ["Toyo Tires", "BridgeStone", "Falken", "Pirelli", "Continental"];
        this.merekBan = arrBan[Math.floor(Math.random() * 4)];
    }
    getMerek(){
        console.log("Ban bermerek: " + this.merekBan);
    }
    getAvgDuration(){
        let x = Math.floor(Math.random() * 4) +1;
        console.log("Ban ini tahan hingga "+x+"tahun");
    }
}


class Hino extends Car{
    buildHino(){
        let objBuild = {
            MerekMobil : "Mitsubishi Hino",
            banyakPintu: `${this.banyakPintu}`,
            banyakKursi: `${this.banyakKursi}`,
            Ban:`${this.ban.merekBan}`,
            statusGaransi:`${(this.batasGaransi() - this.TahunHardcode >=0) ? "Active" : "Out of Warranty"}`
        }
        return objBuild;
    }
}

class Alphard extends Car{
    buildAlphard(){
        let objBuild = {
            MerekMobil : "Toyota Alphard",
            banyakPintu: `${this.banyakPintu}`,
            banyakKursi: `${this.banyakKursi}`,
            Ban:`${this.ban.merekBan}`,
            statusGaransi:`${(this.batasGaransi() - this.TahunHardcode >=0) ? "Active" : "Out of Warranty"}`
        }
        return objBuild;
    }
}
 
class Skyline extends Car{
    buildSkyline(){
        let objBuild = {
            MerekMobil : "Nissan Skyline",
            banyakPintu: `${this.banyakPintu}`,
            banyakKursi: `${this.banyakKursi}`,
            Ban:`${this.ban.merekBan}`,
            statusGaransi:`${(this.batasGaransi() - this.TahunHardcode >=0) ? "Active" : "Out of Warranty"}`
        }
        return objBuild;
    }
}

class AstonMartin extends Car{
    buildAstonMartin(){
        let objBuild = {
            MerekMobil : "Aston Martion",
            banyakPintu: `${this.banyakPintu}`,
            banyakKursi: `${this.banyakKursi}`,
            Ban:`${this.ban.merekBan}`,
            statusGaransi:`${(this.batasGaransi() - this.TahunHardcode >=0) ? "Active" : "Out of Warranty"}`
        }
        return objBuild;
    }
}

let pabrik = new CarFactory();
pabrik.startAssemble();