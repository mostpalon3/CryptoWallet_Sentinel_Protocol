const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name']
    },
    email:{
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, 'Please provide a password with min length of 6'],
        minlength: 6,
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el){
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },
    address: String,
    private_key: String,
    mnemonic: String,
      
});

userSchema.pre("save", async function (next) {
    // Only run this function if the password was actually modified
    if (!this.isModified("password")) return next();

    try {
        // Hash the password with a cost of 12
        this.password = await bcrypt.hash(this.password, 12);

        // Delete the passwordConfirm field (if it exists in the schema)
        if (this.passwordConfirm !== undefined) {
            this.passwordConfirm = undefined;
        }

        next();
    } catch (err) {
        // Handle any errors that occur during hashing
        next(err);
    }
});

userSchema.pre("save", function (next){
    if(!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function(next){ 
    //this points to the current query
    this.find({active: {$ne: false}});
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}; 

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    //False means not changed
    return false;
};


const User = mongoose.model('User', userSchema);

module.exports = User;