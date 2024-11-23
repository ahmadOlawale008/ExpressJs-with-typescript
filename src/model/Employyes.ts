import mongoose, { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
}, {
    virtuals: {
        fullName: {
            get() {
                return `${this.firstname} ${this.lastname}`;
            }
        }
    }
});
export default mongoose.model('Employee', employeeSchema)