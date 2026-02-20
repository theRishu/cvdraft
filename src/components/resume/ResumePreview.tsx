import { IResume } from "@/models/Resume";
import React, { useState, useEffect, useRef } from "react";
import AtsTemplate from "./templates/AtsTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import TechTemplate from "./templates/TechTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import AcademicTemplate from "./templates/AcademicTemplate";
import StartupTemplate from "./templates/StartupTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import DesignTemplate from "./templates/DesignTemplate";
import DevTemplate from "./templates/DevTemplate";
import ManagementTemplate from "./templates/ManagementTemplate";
import SalesTemplate from "./templates/SalesTemplate";
import MarketingTemplate from "./templates/MarketingTemplate";
import FinanceTemplate from "./templates/FinanceTemplate";
import MedicalTemplate from "./templates/MedicalTemplate";
import LegalTemplate from "./templates/LegalTemplate";
import StudentTemplate from "./templates/StudentTemplate";

export default function ResumePreview({
    data,
    contentRef
}: {
    data: any;
    contentRef?: React.RefObject<HTMLDivElement | null>;
}) {
    const renderTemplate = () => {
        switch (data.templateId) {
            case 'modern':
                return <ModernTemplate data={data} />;
            case 'professional':
                return <ProfessionalTemplate data={data} />;
            case 'creative':
                return <CreativeTemplate data={data} />;
            case 'elegant':
                return <ElegantTemplate data={data} />;
            case 'minimalist':
                return <MinimalistTemplate data={data} />;
            case 'tech':
                return <TechTemplate data={data} />;
            case 'corporate':
                return <CorporateTemplate data={data} />;
            case 'academic':
                return <AcademicTemplate data={data} />;
            case 'startup':
                return <StartupTemplate data={data} />;
            case 'classic':
                return <ClassicTemplate data={data} />;
            case 'executive':
                return <ExecutiveTemplate data={data} />;
            case 'design':
                return <DesignTemplate data={data} />;
            case 'dev':
                return <DevTemplate data={data} />;
            case 'management':
                return <ManagementTemplate data={data} />;
            case 'sales':
                return <SalesTemplate data={data} />;
            case 'marketing':
                return <MarketingTemplate data={data} />;
            case 'finance':
                return <FinanceTemplate data={data} />;
            case 'medical':
                return <MedicalTemplate data={data} />;
            case 'legal':
                return <LegalTemplate data={data} />;
            case 'student':
                return <StudentTemplate data={data} />;
            case 'ats':
                return <AtsTemplate data={data} />;
            default:
                return <AtsTemplate data={data} />; // Make ATS the default fallback too
        }
    };

    // Match the CSS background-size (297mm + 20mm gap)
    const pageLabels = [1, 2, 3, 4, 5];


    return (
        <div
            ref={contentRef}
            className="resume-content-wrapper bg-white shadow-2xl relative w-[210mm] min-h-[297mm] print:shadow-none mx-auto print:mx-0 overflow-hidden"
        >
            {renderTemplate()}
        </div>
    );
}