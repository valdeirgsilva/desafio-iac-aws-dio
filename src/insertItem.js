"use strict";

const {v4} = require("uuid");
const AWS = require("aws-sdk");

const insertItem = async (event) => {
    
    const item = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4();
    
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const newItem = {
        id,
        item,
        createdAt,
        intemStatus: false
    };

    await dynamoDB.put(
        {
            TableName: "ItemTableNew",
            Item: newItem
        }
    );

    return {
        statuCode: 200,
        body: JSON.stringify(newItem)
    };
};

module.exports = {
    handler: insertItem
};
