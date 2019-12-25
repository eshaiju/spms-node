let JSONAPISerializer = require('jsonapi-serializer').Serializer;

let UserSerializer = new JSONAPISerializer('users', {
    attributes: ['name', 'email', 'emp_id', 'designation'],
    projects: {
        valueForRelationship: function (project) {
            return {
                id: projects.id
            };
        }
    }
});

exports.UserSerializer = UserSerializer;
