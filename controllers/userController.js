const User = require('../models/user');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
