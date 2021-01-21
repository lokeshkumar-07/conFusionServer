const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promoSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    label:{
        type: String,
        required: true
    },
    price:{
        type: Currency,
        min: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        default: false
    }
},{
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promoSchema);

module.exports = Promotions

