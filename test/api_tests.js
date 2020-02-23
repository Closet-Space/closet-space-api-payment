'use strict';
var assert = require('assert');
const expect = require('chai').expect;

const myHandler = require('../index').handler;

describe('handler', function() {
	it('test success', async function() {
        let event = {
            body: {
                customer: {
                    email: "mnakhaleh@gmail.com",
                    isTest: true
                }
            }
        };
        const result = await myHandler(event, null);
        expect(result).to.have.property('body');
	});
});