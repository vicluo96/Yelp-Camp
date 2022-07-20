const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/my-yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '62a9a6a01df9f567767a46a4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            description: 'Blah bruh bra',
            price: 66666,
            images: [
                {
                  url: 'https://res.cloudinary.com/dsvtaog4k/image/upload/v1656061517/YelpCamp/xpj0vdziz7cm0kurlgjy.jpg',
                  filename: 'YelpCamp/xpj0vdziz7cm0kurlgjy'
                },
                {
                  url: 'https://res.cloudinary.com/dsvtaog4k/image/upload/v1655894414/YelpCamp/wgsa9jotn2ronhwwl3xt.jpg',
                  filename: 'YelpCamp/wgsa9jotn2ronhwwl3xt'
                }
            ]
        })
        await camp.save();
    }
    
}

seedDB().then(() => {
    db.close();
});