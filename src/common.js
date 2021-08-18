export default{
  fnc: (fncName, param) => {
    let rtnVal;
    switch(fncName){
      case 'numberWithComma':
          rtnVal =  param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      break;
    }

    return rtnVal;
  }
}