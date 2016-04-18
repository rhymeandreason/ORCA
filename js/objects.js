'use strict';

class Style  {
  constructor(name, code, garment, image) {
    this.name = name;
    this.code = code;
    this.garment = garment;
    this.image = image;

    this.seasons = [];
    this.variants = [];
    this.total = 0;
    this.status = {
      fabric: 0,
      graded: 0,
      cut: 0,
      ready: 0
    }
  }

  addSeason(season){
    this.seasons.push(season);
  }
  setStatus(item, val) {
    this.status[item] = val;
  }
  toggleStatus(item) {
    var bool = this.status[item];
    console.log(item);
    if (bool === 0) {
      this.status[item] = 1;
    } else {
      this.status[item] = 0;
    }

  }
  calculateTotal(){
    var total = 0;
    for (var i=0; i<this.variants.length; i++) {
      var num = this.variants[i].quantity;
      total +=num;
    }
    this.total = total;
    return this.total;
  }
  addVariant(imgurl, quantity) {
    var v = newVariant(imgurl, quantity);
    this.variants.push(v);
    this.calculateTotal();
  }
  toJSON(){
    return {
      name: this.name,
      code: this.code,
      garment: this.garment,
      image: this.image,
      seasons: this.seasons,
      variants: this.variants,
      total: this.total,
      status: this.status
    }
  }
}

function newSeason(title, color) {
  return { title: title, color: color};
}

function newVariant(imgurl, quantity) {
  return { image: imgurl, quantity: quantity};
}
