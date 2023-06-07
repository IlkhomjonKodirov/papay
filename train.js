/*
 F-Task: Shunday function tuzing, unga string argument pass bolsin. 
 Function ushbu agrumentdagi faqat digitlarni yangi stringda return qilsin!
  Masalan: findDigits('ad5we34jkf89') return qilishi kerak bolgan qiymat '53489'
 */

  function findDigits(str) {
    let str_arr = str.split('');
    let num_arr = [];
    for(let i = 0; i < str_arr.length; i++) {
      if(parseInt(str_arr[i]) / 2){
        num_arr.push(str_arr[i]);
      }
    }
    return num_arr.join('');
  }

console.log(findDigits("ad5we34jkf89"));
