mocha.setup('bdd');

// mocha 結合 chai的bdd測試
var expect = chai.expect; // expect用法
var should = chai.should(); // should用法


describe('This is a test', function() {

    it('simple test', function() {
    	expect(1).to.equal(1);
    });
});

describe('This is a jQuery test 1234', function() {

    it('body attribue: id is "test"', function() {
        expect($('body')).to.have.attr('id', 'test');
    });
});

mocha.run();
