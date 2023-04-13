const userModel = require('../models/userModel');
const { isEmpty, isValidName, isValidEmail, isValidPassword } = require('../validation/validation')

const registerController = async (req, res) => {
    try {
        let userDetails = req.body;
        let { name, email, password } = userDetails;
        
        if (Object.keys(userDetails).length == 0) {
            return res.status(400).send({ status: false, msg: "All fields are mandatory." });
        }
        if(!isEmpty(name)) {
            return res.status(400).send({ status: false, msg: "Name must be present"});
        }
        if(!isEmpty(email)) {
            return res.status(400).send({ status: false, msg: "Email must be present"});
        }
        if(!isEmpty(password)) {
            return res.status(400).send({ status: false, msg: "Password must be present"});
        }
        
        let emailCheck = await userModel.findOne({ email: email}); 
        if(emailCheck) {
            return res.status(400).send({ status:false, msg: "Email id is already exist"});
        }   
        email = email.toLowerCase();
        
        let newUser = await userModel.create(userDetails);
        return res.status(201).send({ status: true, message: "User registered in successfully", data: newUser });
    } catch (error) {
        return res.status(400).json({success: false, error});
    };
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password});

        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        };

        return res.status(200).json({success: true, message: 'User logged in successfully', user});
    } catch (error) {
        res.status(400).json({success: false, error})
    };
};


module.exports = { loginController, registerController };