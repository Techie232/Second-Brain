function random(len) {

   let randomStr = "";
   const options = "qwertyuipoasdfhljlkzcvnm238494";
   const optLen = options.length;

   for (let i = 0; i < len; ++i) {
      randomStr += options[Math.floor(Math.random() * optLen)];
   }

   return randomStr;
}

module.exports = random;