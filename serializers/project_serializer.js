let JSONAPISerializer = require('jsonapi-serializer').Serializer;

let ProjectSerializer = new JSONAPISerializer('project', {
    attributes: ['name']
});

exports.ProjectSerializer = ProjectSerializer;
