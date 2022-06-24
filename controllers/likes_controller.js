const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function (req, res) {
    try {
        //type of query would be /likes/toggle/?id=abcdefgh&type=Post
        let likeable;
        let deleted = false;
        if (req.query.type == 'Post') {
            console.log('In first if consdition');
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else {
            console.log('In else condition')l
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        //check if a like already exists
        if (existingLike) {
            likeable.likes.pull(existingLike._id); //pulling out of the array
            likeable.save(); //saving into the DB
            existingLike.remove();
            deleted = true;
        }
        else {
            //make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,{
            message: "Request successful!!",
            data:{
                deleted:deleted
            }
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Internal server error");
    }
}