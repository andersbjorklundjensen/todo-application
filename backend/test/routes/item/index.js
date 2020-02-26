/* globals describe */


module.exports = function() {

  describe('[GET] /item/all - Get all items', require('./get-all'));
  describe('[GET] /item/:id - Get one item', require('./get'));
  describe('[POST] /item/ - Add one item', require('./add'));
  describe('[PUT] /item/:id - ', require('./edit'));
  describe('[DELETE] /item/:id - ', require('./delete'));

};

