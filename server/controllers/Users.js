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
    console.log(name,about,tags);

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try {
        const updatedProfile = await Users.findByIdAndUpdate( _id, { $set: { 'name': name, 'about': about, 'tags': tags }}, { new: true } )
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}