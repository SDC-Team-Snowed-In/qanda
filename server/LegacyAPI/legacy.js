const axios = require('axios')
const config = require('../config/config.js')

getQuestions = (productId, count = '&count=5', page = '&page=1') => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${productId}${count}${page}`,
    method: 'get',
    headers: {
      Authorization: config.config,
    },
  };
  console.log(options.url)

  axios(options)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}


module.exports = {
  getQuestions
}