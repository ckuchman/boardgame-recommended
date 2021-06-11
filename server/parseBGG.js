const cheerio = require('cheerio');
const axios = require('axios').default;

// Function returns a list of boardgame IDs in descending rank from BGG. The passed in
// number is the total IDs returned
const getBgIds = async (number) => {
  bgList = [];
  page = 1
  
  try {
      while (bgList.length < number) {
        // Get http from BGG
        const resp = await axios.get(`https://boardgamegeek.com/browse/boardgame/page/${page}`);
        const $ = cheerio.load(resp.data);
        page += 1

        $('.collection_thumbnail').each(function (i, elem) {
          var bgPath = $(this).children()[0].attribs.href
          
          if (bgPath) {
            var bgID = bgPath.match(/\d+/)[0];
            bgList.push(bgID);
          }

          //Check if collected enough
          if (bgList.length >= number) {
            return false;
          }
        });
      }

  } catch (err) {
      // Handle Error Here
      console.error(err);
  }

  return bgList
};

const getBgData = async (id) => {

};