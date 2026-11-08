import React from 'react';
import { PageLayout } from "components/PageLayout";
import { ContactGrid } from "views/examples/ContactGrid";
import { RotatingText } from "views/examples/RotatingText";
import { BadgeCarousel } from 'views/examples/BadgeCarousel';


// Decorative "neural network" for the hero: nodes per layer, fully connected between layers.
const NET_LAYERS = [[60, 130, 200], [30, 95, 165, 230], [45, 110, 175, 240], [90, 160]];
const NET_X = [20, 105, 190, 275];
const HeroNetwork = () => (
    <svg className="art-hero-net" viewBox="0 0 300 270" aria-hidden="true">
        {NET_LAYERS.slice(0, -1).map((layer, li) =>
            layer.map((y1, a) =>
                NET_LAYERS[li + 1].map((y2, b) => (
                    <line key={`${li}-${a}-${b}`} className="art-net-edge" x1={NET_X[li]} y1={y1} x2={NET_X[li + 1]} y2={y2} />
                ))
            )
        )}
        {NET_LAYERS.map((layer, li) =>
            layer.map((y, n) => (
                <circle key={`n${li}-${n}`} className="art-net-node" cx={NET_X[li]} cy={y} r="5" style={{ animationDelay: `${(li * 4 + n) * 0.35}s` }} />
            ))
        )}
    </svg>
);

const HERO_CHIPS = ["RAG", "Agents", "Evals", "LLM", "Embeddings", "</>"];

function PortfolioPage(){


    const credlyBadges = [
        {
        title: 'Vue.js Essentials',
        image: require('assets/img/badges/962c8074.webp'),
        link: 'https://www.credly.com/badges/962c8074-f478-4be3-992a-7fab0c4e6f2a'
      }, {
        title: 'Angular 18+',
        image: require('assets/img/badges/e7edf591.webp'),
        link: 'https://www.credly.com/badges/e7edf591-2e45-4c73-919a-17f9848b8b95'
      },
        {
        title: 'TypeScript Essentials',
        image: require('assets/img/badges/12fb6411.webp'),
        link: 'https://www.credly.com/badges/12fb6411-f471-4770-a74e-be6f149e09ec'
      },
      {
        title: 'FastAPI REST Mastery',
        image: require('assets/img/badges/9af29f22.webp'),
        link: 'https://www.credly.com/badges/9af29f22-c8bf-468e-85c1-238b1a616e2b'
      },
       {
        title: 'Reactive Spring',
        image: require('assets/img/badges/be50a73d.webp'),
        link: 'https://www.credly.com/badges/be50a73d-94a0-4bd0-b0c8-412a529688ed'
      },  {
        title: 'NodeJS - The Complete Guide',
        image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-ab5835fa-3591-4ef7-83e8-73688e5bb928.jpg?v=1642507259000',
        link: 'https://www.udemy.com/certificate/UC-ab5835fa-3591-4ef7-83e8-73688e5bb928/'
      },
      {
        title: 'Spring & Spring Boot Fund.',
        image: require('assets/img/badges/a846d16f.webp'),
        link: 'https://www.credly.com/badges/a846d16f-6b85-4446-9d02-e40507cd6737'
      },
      {
        title: 'IBM Introduction to Machine Learning - Specialization',
        image: require('assets/img/badges/18366399.webp'),
        link: 'https://www.credly.com/badges/18366399-4003-414d-a647-3b5e4ccd3f23'
      }, {
        title: 'Unsupervised Machine Learning',
        image: require('assets/img/badges/05cfb12c.webp'),
        link: 'https://www.credly.com/badges/05cfb12c-8251-46ac-9c0f-bedf7428b20c'
      },
     {
        title: 'Supervised Machine Learning: Classification',
        image: require('assets/img/badges/2e6ed830.webp'),
        link: 'https://www.credly.com/badges/2e6ed830-46c4-419a-a2f6-1b5a64095a63'
      },
      {
        title: 'Supervised Machine Learning: Regression',
        image: require('assets/img/badges/c5af26e2.webp'),
        link: 'https://www.credly.com/badges/c5af26e2-864f-4bd1-bb6a-332b0d62b2d5'
      }, {
        title: 'Databases and SQL for Data Science',
        image: require('assets/img/badges/8d43351f.webp'),
        link: 'https://www.credly.com/badges/8d43351f-9e1a-406b-9e9f-f37530b4aff9'
      },
      {
        title: 'Machine Learning Foundations',
        image: require('assets/img/badges/5ce779de.webp'),
        link: 'https://www.credly.com/badges/5ce779de-10e9-47c4-bfc5-3b0f6b7b9cc3'
      }
    ];

    return(
        <PageLayout title="Home | Arnav Kaushal" currentHref="/portfolio" currentLabel="Home">
                    {/*Container fluid section -- 1*/}
                    <div  className="container-fluid">

                        <div  className="row p-60-0 p-lg-30-0 p-md-15-0">

                            <div  className="col-lg-12">

                                <div  className="art-a art-banner" style={{backgroundImage: "url(" + require("assets/img/bg11.webp") + ")"}}>

                                    <div  className="art-banner-back"></div>

                                    <div  className="art-banner-dec"></div>

                                    <div  className="art-banner-overlay">

                                    <div className="art-hero-shapes" aria-hidden="true">
                                        <span className="art-shape art-shape-ring"></span>
                                        <span className="art-shape art-shape-blob"></span>
                                        <span className="art-shape art-shape-diamond"></span>
                                        <HeroNetwork />
                                        {HERO_CHIPS.map((chip, i) => (
                                            <span key={chip} className={"art-chip art-chip-" + (i + 1)}>{chip}</span>
                                        ))}
                                    </div>

                                        <div  className="art-banner-title">

                                            <h1  className="mb-15">From Concept to Deployment</h1>
                                            <h3  className="mb-5">I Make It Happen!</h3>

                                            <RotatingText />
                                            <div  className="art-buttons-frame">

                                                <a href="/projects"  className="art-btn art-btn-md"><span>Explore now</span></a>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/*Container fluid section -- 2*/}
                    <div className="container-fluid">

                        <div className="row p-30-0">

                            <div className="col-md-3 col-6">

                                <div className="art-counter-frame">

                                    <div className="art-counter-box">

                                        <span className="art-counter">7</span><span className="art-counter-plus">+</span>

                                    </div>

                                    <h6>Years Experience</h6>
                                </div>

                            </div>

                            <div className="col-md-3 col-6">

                                <div className="art-counter-frame">

                                    <div className="art-counter-box">

                                        <span className="art-counter">20</span><span className="art-counter-plus">+</span>

                                    </div>

                                    <h6>Completed Projects</h6>
                                </div>

                            </div>

                            <div className="col-md-3 col-6">

                                <div className="art-counter-frame">

                                    <div className="art-counter-box">

                                        <span className="art-counter">30</span><span className="art-counter-plus">+</span>

                                    </div>

                                    <h6>Languages, Tools & Frameworks</h6>
                                </div>

                            </div>

                            <div className="col-md-3 col-6">

                                <div className="art-counter-frame">

                                    <div className="art-counter-box">

                                        <span className="art-counter">50</span><span className="art-counter-plus">+</span>

                                    </div>

                                    <h6>Widgets Built</h6>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/*Container fluid section -- 3*/}
                    <div className="container-fluid">

                        <div className="row justify-content-center">
                            <ContactGrid />
                        </div>

                    </div>

                    {/*Container fluid section -- 4*/}
                    <div className="container-fluid mt-1">

                        <div className="row">

                            <div className="col-lg-12">

                                <div className="art-section-title mt-1">

                                    <div className="art-title-frame">

                                        <h4>My Services</h4>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">Responsive Web Development</h5>

                                        <div className="mb-15">Building flexible, user-friendly websites that adapt seamlessly across all devices and screen sizes</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">ML & Data Science Models</h5>

                                        <div className="mb-15">Designing intelligent models to extract insights and automate decisions from complex data</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">APIs & SDKs</h5>

                                        <div className="mb-15">Creating robust interfaces and tools to enable seamless integration and expand functionality</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">Cloud Computing & Databases</h5>

                                        <div className="mb-15">Leveraging cloud platforms and scalable databases for reliable, high-performance applications</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">Automation Tools</h5>

                                        <div className="mb-15">Developing scripts and workflows to streamline tasks and boost productivity efficiently</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">Agentic AI &amp; SDLC</h5>

                                        <div className="mb-15">Designing agent workflows that plan, code, test and review, bringing AI into every stage of the software lifecycle</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">RAG &amp; Agentic RAG</h5>

                                        <div className="mb-15">Building retrieval-augmented systems, from vector search and chunking to agents that decide when and what to retrieve</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">Automated AI Pipelines</h5>

                                        <div className="mb-15">Orchestrating data, model and deployment pipelines that run reliably and repeat without manual steps</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4 col-md-6">

                                <div className="art-a art-service-icon-box">

                                    <div className="art-service-ib-content">

                                        <h5 className="mb-15">Evals &amp; Performance Metrics</h5>

                                        <div className="mb-15">Measuring quality, cost and latency with evaluation suites so AI features can be trusted and improved</div>

                                        <div className="art-buttons-frame"><a href="/projects" className="art-link art-color-link art-w-chevron">Order now</a></div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="container-fluid mt-5">
                        <div className="col-lg-12">

                            <div className="art-section-title mb-n4">

                                <div className="art-title-frame">

                                    <h4>My Credentials</h4>
                                </div>

                            </div>

                        </div>
                        <BadgeCarousel items={credlyBadges} className="mt-3"/>

                    </div>

                    {/*Container fluid section -- 5*/}

        </PageLayout>
    );
}

export default PortfolioPage;
