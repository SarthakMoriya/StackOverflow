import Users from '../models/authSchema.js'
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find();
        const allUsersDetails = [];

        allUsers.forEach(user => {
            allUsersDetails.push({
                _id: user._id,
                name: user.name,
                about: user.about,
                tags: user.tags,
                joinedOn: user.joinedOn

            })
        })
        console.log(allUsersDetails);
        res.status(200).json(allUsersDetails);
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: e.message })
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
    // console.log(name,about,tags);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        const updatedProfile = await Users.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true })
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}

export const updateAddFriends = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const user = await Users.findById(userId);
        console.log(user.friends, userId, friendId);

        // // user.user.friends = friends.filter(id => id !== friendId);
        user.friends.push(friendId);
        // user.friends=friends;
        console.log(user.friends)

        await Users.findByIdAndUpdate(userId, user)
        res.status(200).json({ data: "nill" })
    } catch (error) { console.log(error) }
}


export const updateDeleteFriends = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const user = await Users.findById(userId);
        console.log(user)
        user.friends = user.friends.filter(id => id !== friendId);

        await Users.findByIdAndUpdate(userId, user)
        res.status(200).json({ data: user })
    } catch (error) { console.log(error) }
}

export const getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await Users.findById(userId);
        console.log(user)
        res.status(200).json({ data: user })
    } catch (error) { console.log(error) }
}

export const setUserSubscription = async (req, res) => {
    try{
        const {userId,type}=req.body;
        const user = await Users.findById(userId);
        user.subscription=type;
        
        let noOfQuestions=1;
        if(type==="1"){noOfQuestions=2}
        if(type==="2"){noOfQuestions=5}
    
        user.noOfQuestions=noOfQuestions;
        await Users.findByIdAndUpdate(userId, user)
        res.status(200).json({data: user})
    }catch(err){
        res.status(500).json({data: null})
        
    }
}