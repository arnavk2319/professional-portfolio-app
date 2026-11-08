// Contact and summary content, verbatim from the resume.
// The resume's own link behind the word LinkedIn.
export const LINKEDIN_URL = "https://www.linkedin.com/in/sakshi-sakshi-32b510215/";

const profile = {
    name: "Sakshi",
    title: "Data Analyst",
    location: "Toronto, ON",
    email: "sakshi1999lohia@gmail.com",
    phone: "+1 (437) 673-8835",
    linkedin: LINKEDIN_URL,
    // Verbatim phrase from the summary below; headlineAccent is the word shown in italics.
    headline: "turning raw data into stories that drive decisions",
    headlineAccent: "stories",
    summary:
        "Data Analyst with 3 years of experience turning raw data into stories that drive decisions across multi-location franchise operations, financial services, and manufacturing. Skilled at turning abstract business questions into a series of SQL queries against relational data warehouses (Amazon Redshift), then presenting actionable insights through Tableau, Power BI, and Excel. Experienced in building and optimizing database views, leading independent root-cause analyses, and pairing quantitative data with qualitative user insights. Communicates comfortably with engineers and with non-technical stakeholders, and has supported 58 franchise partners with as-needed data requests.",
    resumeUrl: (process.env.PUBLIC_URL || "") + "/Sakshi_Data_Analyst_Resume.pdf",
};

export default profile;
