import React from 'react';
import { PageLayout } from "components/PageLayout";
import profile from "data/profile";
import metrics from "data/metrics";
import { RotatingText } from "views/examples/RotatingText";


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

                                        <div  className="art-banner-title">

                                            <h1  className="mb-15">{profile.name}</h1>
                                            <h2  className="mb-5">{profile.title}</h2>
                                            <p className="mb-15">{profile.location}</p>

                                            <RotatingText />
                                            <div  className="art-buttons-frame">

                                                <a href="/projects"  className="art-btn art-btn-md"><span>Explore now</span></a>
                                                <a href={profile.resumeUrl} download className="art-btn art-btn-md"><span>Download resume</span></a>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="container-fluid">
                        <div className="row p-30-0">
                            <div className="col-lg-12">
                                <h2 className="mb-15">Summary</h2>
                                <p>{profile.summary}</p>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <h2 className="mb-15">Key metrics</h2>
                        <ul className="row p-30-0 art-kpi-list" style={{ listStyle: "none", paddingLeft: 0 }}>
                            {metrics.map(({ value, label }) => (
                                <li className="col-md-4 col-6" key={label}>
                                    <div className="art-counter-frame">
                                        <div className="art-counter-box">
                                            <span className="art-counter">{value}</span>
                                        </div>
                                        <h6>{label}</h6>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

        </PageLayout>
    );
}

export default PortfolioPage;
