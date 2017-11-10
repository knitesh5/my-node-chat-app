var expect = require('expect');

var {generateMessgae} = require('./message');

describe('generateMessgae',()=>{
	it('should generate correct message object',()=>{
		var from = 'nitesh';
		var text = 'Some message';
		var message = generateMessgae(from,text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	});
});