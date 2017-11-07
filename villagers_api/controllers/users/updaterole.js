'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'update user',
    tags: ['api', 'auth'],
    validate: {
        payload: {
            role: Joi.any().valid("mod","user","admin")
        }
    },
    
    handler: async function (request, reply) {
        const credentials = request.auth.credentials; 
       // Schema.role= request.payload;

        if(credentials.role=="admin") {

        }
        else if(credentials.role=="mod") {

        }
        else{
            throw Boom.unauthorized();
        }
        let foundUser = await this.db.users.findOne({username: request.params.username});

        await this.db.users.updateOne({id: foundUser.id} , request.payload);
        foundUser = await this.db.users.findOne({username: request.params.username});
        return reply({ data: foundUser });
    }

  };