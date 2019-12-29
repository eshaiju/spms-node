let JSONAPISerializer = require('jsonapi-serializer').Serializer;

let UserSerializer = new JSONAPISerializer('user', {
    attributes: ['name', 'email', 'emp_id', 'designation', 'projects']
});


exports.UserSerializer = UserSerializer;
