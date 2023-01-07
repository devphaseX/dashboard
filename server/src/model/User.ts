import mongoose, { SchemaDefinition } from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, minlength: 5 },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
    },
  } satisfies SchemaDefinition,
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export { User };
