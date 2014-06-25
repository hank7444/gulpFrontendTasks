mocha.setup('bdd');

// mocha 結合 chai的bdd測試
var expect = chai.expect; // expect用法
var should = chai.should(); // should用法


describe('This is a test', function() {

    it('simple test', function() {
    	expect(1).to.equal(1);
    });
});

describe('This is a jQuery test', function() {

	// attribute test
    it('body attribue: id is "test"', function() {
        expect($('body')).to.have.attr('id', 'test');
    });

    // event trigger test
    it('after click button, word has 1234', function() {
    	$('#button').click();
    	expect($('#word')).to.have.html('1234');
    });

    // ajax test
    it('ajax test', function(done) {
    	var callback = function(data) {
            //expect(data.db_name).to.equal('registry'); // expect寫法
            data.db_name.should.equal('registry'); // should寫法
            done();
        };
        ajaxTest(callback);
    });

});
mocha.run();