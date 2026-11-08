import React from 'react';
import { PageLayout } from "components/PageLayout";
import { ContactGrid } from "views/examples/ContactGrid";
import { RotatingText } from "views/examples/RotatingText";


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


    return(
        <PageLayout title="Home | Sakshi" currentHref="/portfolio" currentLabel="Home">
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

                    {/*Container fluid section -- 5*/}

        </PageLayout>
    );
}

export default PortfolioPage;
