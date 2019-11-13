function pola(str){ 
  var result = [];
  var arr = str.split(' ')
  // console.log(arr);

  var arrNol = arr[0], arrDua = arr[2], arrEmpat = arr[4];
  // console.log(typeof arrNol);

for(var i=0; i < 10; i++){
  var gantiArrNol = arrNol.replace(/#/, i)
  for(var j=0; j < 10; j++){
    var gantiArrEmpat = arrEmpat.replace(/#/, j)
    // console.log(gantiEmpat);
    
    if(Number(gantiArrNol) * Number(arrDua) === Number(gantiArrEmpat)){
      result.push(i, j)
    }
  }
}
 return result
}

console.log(pola('42#3 * 188 = 80#204'));
console.log(pola('8#61 * 895 = 78410#5'));