import mongoose, { Schema, Document, Model } from 'mongoose';

// Define complex types for resume data structure
// (Simplified for initial setup, can be expanded later)

const PersonalInfoSchema = new Schema({
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    summary: { type: String, default: '' },
    photoUrl: { type: String },
    title: { type: String }, // Job Title
}, { _id: false });

const ExperienceSchema = new Schema({
    id: { type: String, required: true },
    jobTitle: { type: String },
    companyName: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    isCurrent: { type: Boolean, default: false },
    description: { type: String },
}, { _id: false });

const EducationSchema = new Schema({
    id: { type: String, required: true },
    degree: { type: String },
    schoolName: { type: String },
    startDate: { type: String },
    endDate: { type: String },
}, { _id: false });

const SkillSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String },
    level: { type: String }, // 'Beginner', 'Intermediate', etc.
}, { _id: false });

const SocialSchema = new Schema({
    id: { type: String, required: true },
    platform: { type: String },
    url: { type: String },
}, { _id: false });

const CertificationSchema = new Schema({
    name: { type: String },
    issuer: { type: String },
    date: { type: String },
}, { _id: false });

const LanguageSchema = new Schema({
    name: { type: String },
    level: { type: String },
}, { _id: false });

interface IPersonalInfo {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    summary?: string;
    photoUrl?: string;
    title?: string;
}

interface IExperience {
    id: string;
    jobTitle?: string;
    companyName?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string;
}

interface IEducation {
    id: string;
    degree?: string;
    schoolName?: string;
    startDate?: string;
    endDate?: string;
}

interface ISkill {
    id: string;
    name?: string;
    level?: string;
}

interface ISocialLink {
    id: string;
    platform?: string;
    url?: string;
}

interface ICertification {
    name?: string;
    issuer?: string;
    date?: string;
}

interface ILanguage {
    name?: string;
    level?: string;
}

const ProjectSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    link: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    technologies: { type: [String] },
}, { _id: false });

const CustomSectionSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, default: 'Custom Section' },
    items: [{
        id: { type: String },
        name: { type: String },
        description: { type: String },
        startDate: { type: String },
        endDate: { type: String },
    }]
}, { _id: false });

interface IProject {
    id: string;
    title: string;
    description: string;
    link?: string;
    startDate?: string;
    endDate?: string;
    technologies?: string[];
}

interface ICustomSection {
    id: string;
    title: string;
    items: {
        id: string;
        name: string;
        description: string;
        startDate?: string;
        endDate?: string;
    }[];
}

export interface IResume {
    _id?: string;
    userId: string;
    title: string;
    templateId: string;
    themeColor?: string;
    fontSize?: string;
    personalInfo: {
        fullName?: string;
        email?: string;
        phone?: string;
        address?: string;
        title?: string;
        summary?: string;
        photoUrl?: string;
    };
    experience: IExperience[];
    education: IEducation[];
    skills: ISkill[];
    socialLinks: ISocialLink[];
    languages: ILanguage[];
    certifications: ICertification[];
    projects: IProject[];
    customSection: ICustomSection;
    sectionOrder: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const ResumeSchema = new Schema<IResume>({
    userId: { type: String, required: true, index: true },
    title: { type: String, default: 'Untitled Resume' },
    templateId: { type: String, default: 'modern' },
    themeColor: { type: String, default: '#0f172a' },
    fontSize: { type: String, default: 'medium' },
    personalInfo: { type: PersonalInfoSchema, default: {} },
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillSchema],
    certifications: [CertificationSchema],
    languages: [LanguageSchema],
    socialLinks: [SocialSchema],
    projects: [ProjectSchema],
    customSection: { type: CustomSectionSchema, default: { id: "custom", title: "Activities", items: [] } },
    sectionOrder: { type: [String], default: ["personal", "experience", "education", "skills", "projects", "certifications", "languages", "social", "custom"] },
}, { timestamps: true });

const Resume: Model<IResume> = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);

export default Resume;
