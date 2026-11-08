import React from 'react';
import { PageLayout } from "components/PageLayout";
import certifications from "data/certifications";

function HistoryPage(){


    return(
        <PageLayout title="History | Arnav Kaushal" currentHref="/history" currentLabel="History">
                    {/*Container fluid section -- 1*/}
                    <div className="container-fluid">

                        <div className="row p-60-0 p-lg-30-0 p-md-15-0">

                            <div className="col-lg-6">

                                <div className="art-section-title">

                                    <div className="art-title-frame">

                                        <h4>Education</h4>

                                    </div>

                                </div>

                                <div className="art-timeline art-gallery">

                                    <div className="art-timeline-item">
                                        <div className="art-timeline-mark-light"></div>
                                        <div className="art-timeline-mark"></div>

                                        <div className="art-a art-timeline-content">
                                            <div className="art-card-header">
                                                <div className="art-left-side">
                                                    <h5>Carleton University</h5>
                                                    <div className="art-el-suptitle mb-15">Master of Engineering (M. Eng)</div>
                                                </div>
                                                <div className="art-right-side">
                                                    <span className="art-date">Sept 2018 - Jan 2020</span>
                                                    {/* <span className="art-date">Sept 2018 - Jan 2020</span> */}
                                                </div>
                                            </div>

                                            <p style={{color: 'var(--ink)', fontSize: '12px'}}>Ottawa, Canada</p>

                                            <p>Master of Engineering in Systems and Computer Engineering (SYSC). CGPA: 3.90/4.00.</p>
                                        </div>
                                    </div>

                                    <div className="art-timeline-item">
                                        <div className="art-timeline-mark-light"></div>
                                        <div className="art-timeline-mark"></div>

                                        <div className="art-a art-timeline-content">
                                            <div className="art-card-header">
                                                <div className="art-left-side">
                                                    <h5>SRM IST</h5>
                                                    <div className="art-el-suptitle mb-15">Bachelor of Technology (B. Tech)</div>
                                                </div>
                                                <div className="art-right-side">
                                                    <span className="art-date">Sept 2014 - May 2018</span>
                                                </div>
                                            </div>

                                            <p style={{color: 'var(--ink)', fontSize: '12px'}}>Chennai, India</p>

                                            <p>Bachelor of Technology in Computer Science and Engineering (CSE). CGPA: 8.45/10.00.</p>
                                        </div>
                                    </div>

                                </div>

                                {certifications.length > 0 && (
                                    <>
                                        <div className="art-section-title">

                                            <div className="art-title-frame">

                                                <h4>Certifications</h4>

                                            </div>

                                        </div>

                                        <div className="art-timeline art-gallery">

                                            {certifications.map(({ title, issuer, link, date }) => (
                                                <div className="art-timeline-item" key={title}>
                                                    <div className="art-timeline-mark-light"></div>
                                                    <div className="art-timeline-mark"></div>

                                                    <a href={link} target="_blank" rel="noopener noreferrer" className="art-a art-timeline-content art-cert-tile">
                                                        <div className="art-card-header">
                                                            <div className="art-left-side">
                                                                <h5>{title}</h5>
                                                                <div className="art-el-suptitle mb-15">{issuer}</div>
                                                            </div>
                                                            {date && (
                                                                <div className="art-right-side">
                                                                    <span className="art-date">{date}</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <p className="art-cert-link">View credential <i className="fas fa-external-link-alt"></i></p>
                                                    </a>
                                                </div>
                                            ))}

                                        </div>
                                    </>
                                )}

                            </div>

                            <div className="col-lg-6">

                                <div className="art-section-title">

                                    <div className="art-title-frame">

                                        <h4>Work History</h4>

                                    </div>

                                </div>

                                <div className="art-timeline">

                                    <div className="art-timeline-item">

                                        <div className="art-timeline-mark-light"></div>
                                        <div className="art-timeline-mark"></div>

                                        <div className="art-a art-timeline-content">
                                            <div className="art-card-header">
                                                <div className="art-left-side">
                                                    <h5>SS&C Technologies</h5>
                                                    <div className="art-el-suptitle mb-15">Software Engineer</div>
                                                </div>
                                                <div className="art-right-side">
                                                    <span className="art-date">May 2022 - Present</span>
                                                </div>
                                            </div>

                                            <p style={{color: 'var(--ink)', fontSize: '12px'}}>Toronto, Canada</p>

                                            <p>Developed and maintained responsive, enterprise-grade web applications using Angular 18+, TypeScript, HTML5, SCSS, and Vue 2/Nuxt, Python enhancing user interaction and reducing page load time by ~35%. </p>

                                            <p>Engineered 5+ critical business modules (e.g., Payroll, Loans and Withdrawals, Statements and Transactions, Client Reporting, Tenant
                                            Management) within a multi-tenant SaaS fintech platform, contributing to its adoption by major clients and over $100M+ in processed transactions.</p>

                                            <p>Implemented and consumed RESTful APIs using Spring MVC, Spring Boot (Reactive), Java, Postman, CURL, and handled complex SQL operations to optimize data flow and backend performance</p>
                                        </div>

                                    </div>

                                    <div className="art-timeline-item">

                                        <div className="art-timeline-mark-light"></div>
                                        <div className="art-timeline-mark"></div>

                                        <div className="art-a art-timeline-content">
                                            <div className="art-card-header">
                                                <div className="art-left-side">
                                                    <h5>The AppLabb</h5>
                                                    <div className="art-el-suptitle mb-15">Front-end Developer (Mobile and Web)</div>
                                                </div>
                                                <div className="art-right-side">
                                                    <span className="art-date">Jan 2020 - May 2022</span>
                                                </div>
                                            </div>

                                            <p style={{color: 'var(--ink)', fontSize: '12px'}}>Toronto, Canada</p>

                                            <p>Responsible for analysis, creation, implementation, maintenance and updating websites, mobile applications,
                                                landing pages using native technologies like Android, Native Web (JavaScript, jQuery, AJAX, HTML, CSS) and hybrid
                                                technologies like Flutter, AngularJS, implementing CRUD operations with integration of RESTful Web services.</p>
                                        </div>

                                    </div>

                                    <div className="art-timeline-item">

                                        <div className="art-timeline-mark-light"></div>
                                        <div className="art-timeline-mark"></div>

                                        <div className="art-a art-timeline-content">
                                            <div className="art-card-header">
                                                <div className="art-left-side">
                                                    <h5>The AppLabb</h5>
                                                    <div className="art-el-suptitle mb-15">Developer Intern (Mobile & Web)</div>
                                                </div>
                                                <div className="art-right-side">
                                                    <span className="art-date">May 2019 - August 2019</span>
                                                </div>
                                            </div>

                                            <p style={{color: 'var(--ink)', fontSize: '12px'}}>Toronto, Canada</p>

                                            <p>Contribute to group meetings and provide status update on development tasks. Coordinating with the project management team.
                                                Doing usability testing and fixing bugs in existing websites, mobile applications. Exploring the documentation of new platforms, tools, SDKs for integration with mobile and web applications.</p>
                                        </div>

                                    </div>

                                    <div className="art-timeline-item">

                                        <div className="art-timeline-mark-light"></div>
                                        <div className="art-timeline-mark"></div>

                                        <div className="art-a art-timeline-content">
                                            <div className="art-card-header">
                                                <div className="art-left-side">
                                                    <h5>Velmenni</h5>
                                                    <div className="art-el-suptitle mb-15">Mobile Developer Intern</div>
                                                </div>
                                                <div className="art-right-side">
                                                    <span className="art-date">June 2017 - July 2017</span>
                                                </div>
                                            </div>

                                            <p style={{color: 'var(--ink)', fontSize: '12px'}}>New Delhi, India</p>

                                            <p>Created a native Android Application, GraphView custom view and Camera API.
                                            Performed debug and performance analysis of code and systems.
                                                Testing the application under various configurations.</p>
                                        </div>

                                    </div>

                                    <div className="art-timeline-item">

                                        <div className="art-timeline-mark-light"></div>
                                        <div className="art-timeline-mark"></div>

                                        <div className="art-a art-timeline-content">
                                            <div className="art-card-header">
                                                <div className="art-left-side">
                                                    <h5>Flex</h5>
                                                    <div className="art-el-suptitle mb-15">Intern</div>
                                                </div>
                                                <div className="art-right-side">
                                                    <span className="art-date">Dec 2016 - Jan 2017</span>
                                                </div>
                                            </div>

                                            <p style={{color: 'var(--ink)', fontSize: '12px'}}>Chennai, India</p>

                                            <p>Implementing SQL queries on SQL Server Management Studio for data manipulation and optimization.
                                                Using the results of the queries to visualize the data using Tableau and integrating data visualization techniques to render live data.</p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/*Container fluid section -- 2*/}

        </PageLayout>
    );
}

export default HistoryPage;
