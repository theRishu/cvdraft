import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    userId: string;
    email: string;
    resumeCount: number;
    isPro: boolean;
    stripeCustomerId?: string;
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
    ccavenueOrderId?: string;
    aiKeys?: {
        gemini?: string;
        openai?: string;
    };
    preferredProvider?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    userId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    resumeCount: { type: Number, default: 0 },
    isPro: { type: Boolean, default: false },
    stripeCustomerId: { type: String },
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    ccavenueOrderId: { type: String },
    aiKeys: {
        gemini: { type: String },
        openai: { type: String },
    },
    preferredProvider: { type: String, enum: ['gemini', 'openai'] },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
