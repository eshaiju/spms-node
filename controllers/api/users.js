const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');

const { UserSerializer } = require('../../serializers/user_serializer');
const {User, validate} = require('../../models/user');
const auth = require('../../middleware/auth');
const fileUpload = require('../../middleware/fileUpload');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).populate('projects', 'name').select('-password');
    debugger;
    res.json(UserSerializer.serialize(user));
});

router.post('/', fileUpload.single('image'), async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'emp_id', 'designation', 'password']));
    if(req.file) user.image = req.file.path

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    // res.header('x-auth-token', token).json(UserSerializer.serialize(user));
    res.json({ user: UserSerializer.serialize(user), token });
});

module.exports = router;
