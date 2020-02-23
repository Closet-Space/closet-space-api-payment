'use strict';
require('dotenv').config();

const stripe = require('stripe')(process.env.TEST_SECRET_KEY);
// const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const {customer} = event.body;
    let statusCode = 0;
    let responseBody = "";

    if (customer.isTest)
    {
        statusCode = 200;
        responseBody = "you're a tester, Harry";
    }
    else
    {
        stripe.customers.create({
            email: customer.email,
        })
        .then((customer) => {
            console.log(customer.id);
            statusCode = 201;
            responseBody = customer.id;
        })
        .catch((error) => {
            console.error(error);
            statusCode = 500;
            responseBody = error;
        });
    }
    const response = {
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: statusCode,
        body: responseBody,
    }
    return response;
}