const AdminBro = require('admin-bro');
const bcrypt = require('bcrypt');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');

const {User} = require('../models/user');

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
    resources: [{
        resource: User,
        options: {
            properties: {
                password: {
                    type: 'string',
                    isVisible: {
                        list: false, edit: true, filter: false, show: false,
                    },
                },
            }
        }
    }],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await User.findOne({email});
        if (user) {
            const matched = await bcrypt.compare(password, user.password);

            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
})

module.exports = adminRouter = router