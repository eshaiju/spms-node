let JSONAPISerializer = require('jsonapi-serializer').Serializer;

let ProjectSerializer = new JSONAPISerializer('users', {
    attributes: ['name']
});

exports.ProjectSerializer = ProjectSerializer;
