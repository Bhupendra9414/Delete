const mongoose = require("mongoose");
const validator = require("validator");

// Connection Creation and creating a new DB

mongoose.connect("mongodb://localhost:27017/LearningWithNode", { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log("Connection Successfull....")
    })
    .catch((err) => {
        console.log(err)
    });



const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        // uppercase: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    ctype: String,
    videos: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Value should not be less than 0");
            }
        }
    },
    author: {
        type: String,
        enum: ["Bhupendra", "bhupendra", "loginradius", "Loginradius"],
        // lowercase: true
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

// collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema)

// create and insert Document
const createDocument = async () => {
    try {
        // const reactPlaylist = new Playlist({
        //     name: "Bhupendra Singh",
        //     ctype: "Backend end",
        //     videos: 10,
        //     author: "Loginradius",
        //     active: true,
        // })
        // const ExpressPlaylist = new Playlist({
        //     name: "Express Singh",
        //     ctype: "Backend end",
        //     videos: 100,
        //     author: "Loginradius",
        //     active: true,
        // })
        const MongoPlaylist = new Playlist({
            name: "Bhagwan Sahay jangid",
            ctype: "Mongo",
            videos: 2,
            author: "bhupendra",
            email:"bhupednra@fa.co",
            active: true

        })
        //  FOR ONE DOCUMENT
        // const result = await reactPlaylist.save()  

        //FOR MULTIPLE Document
        // const result = await Playlist.insertMany([reactPlaylist,MongoPlaylist,ExpressPlaylist])

        const result = await Playlist.insertMany([MongoPlaylist])
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}
createDocument()

const readDocument = async () => {
    // const result = await Playlist.find({ videos: { $gte: 10 } })
    // .select({ name: 1 })
    // .limit(3)
    // const result = await Playlist.find({ videos: 0})
    // .select({ name: 1 })
    // .limit(3)
    // const result = await Playlist.find({ videos: { $nin: [10, 100] } })
    // .select({ name: 1 })
    // .limit(3)
    // const result = await Playlist.find({ videos: { $in: [10, 100] } })

    // Logical Opeartors 
    // const result = await Playlist.find({ $and: [{ name: "Bhupendra Singh" }, { videos: 1 }] })
    // console.log(result)
    // const result = await Playlist.find({ $or: [{ name: "Bhupendra Singh" }, { videos: 1 }] })
    // console.log(result)
    //const result = await Playlist.find({ name: { $not:{$eq:"Bhupendra Singh"}} })
    // console.log(result)
    // const result = await Playlist.find({ $nor: [{ name: "Bhupendra Singh" }, { name: "Express Singh" }] })
    try {
        const result = await Playlist.find()
        // .countDocuments()
        // .select({ name: 1 })
        // .sort({ name: -1 })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}
// readDocument()


// const updateDocument = async (author) => {
//     try {
//         const result = await Playlist.updateMany({ author: author }, {
//             $set: {
//                 author: "Loginradius"
//             }
//         })
//         console.log(result)
//     } catch (err) {
//         console.log(err)
//     }
// }


const updateDocument = async (_id) => {
    try {
        const result = await Playlist.findByIdAndUpdate({ _id }, {
            $set: {
                videos: 65
            }
        }, { new: true })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

// updateDocument("6444c555fce2345b2671e5fc")


// const deleteDocument = async (_id) => {
//     try {
//         const result = await Playlist.deleteOne({ _id })
//         console.log(result)
//     } catch (err) {
//         console.log(err)
//     }
// }
const deleteDocument = async (_id) => {
    try {
        const result = await Playlist.findByIdAndDelete({ _id })
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

// deleteDocument("6444ddb1fc5eb9c9c069f8f2")