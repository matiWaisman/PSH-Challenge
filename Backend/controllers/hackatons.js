const Hackaton = require("../models/hackaton");

const getHackatons = async (req, res) => {
  const { sort } = req.query;
  console.log(req.query);
  let result = Hackaton.find().lean();
  const hackatons = await result;
  if (sort === "true") {
    hackatons.forEach((element) => {
      element.developers.sort(
        (a, b) => parseFloat(b.score) - parseFloat(a.score)
      );
    });
  }
  res.status(200).json({ hackatons });
};

module.exports = {
  getHackatons,
};
