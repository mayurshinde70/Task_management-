const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/me', auth, userController.getProfile);
router.put('/me', auth, userController.updateProfile);
router.get('/new-joining', async(req, res) => {
    try {
        // 24 तासांपूर्वीचा वेळ मिळवा
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // जर specific department अथवा designation filter करायची असेल तर criteria मध्ये घाला (उदाहरणार्थ − department: "sicma")
        const criteria = {
            joiningDate: { $gte: twentyFourHoursAgo }
            // department: "sicma" // जर पाहिजे असेल तर uncomment करा
        };

        const newUsers = await User.find(criteria);
        res.json(newUsers);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});




module.exports = router;