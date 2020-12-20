import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//  @desc      Auth user & get token
//  @route     POST  /api/users/login
//  @access    Public

const authUser = asyncHandler(async (req, res) => {
    console.log("Async Handler is called...")
    // console.log(req)
    const { email, password } = req.body
    console.log(email)
    console.log(password)
    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
    // res.send({
    //     email,
    //     password
    // })
})

export { authUser }