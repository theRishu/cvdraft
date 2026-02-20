import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    userId: string; // Clerk ID
    email: string;
    resumeCount: number;
    isPro: boolean;
    stripeCustomerId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    userId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    resumeCount: { type: Number, default: 0 },
    isPro: { type: Boolean, default: false },
    stripeCustomerId: { type: String },
}, { timestamps: true });

// Prevent model recompilation error in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
