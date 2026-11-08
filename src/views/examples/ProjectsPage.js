import React from "react";
import { PageLayout } from "components/PageLayout";
import projects from "data/projects";

function ProjectsPage() {
    return (
        <PageLayout title="Projects | Sakshi" currentHref="/projects" currentLabel="Projects">
            <div className="container-fluid">
                <div className="row p-60-0 p-lg-30-0 p-md-15-0">
                    <div className="col-lg-12">
                        <h2 className="art-projects-title">Projects</h2>
                    </div>

                    <div className="art-grid art-grid-2-col art-gallery">
                        {projects.map((p) => (
                            <div className="art-grid-item" key={p.name}>
                                <article className="art-item-description">
                                    <h3 className="h5 mb-15">{p.name}</h3>
                                    <div className="art-el-suptitle mb-15">{p.role}</div>
                                    <ul>
                                        {p.bullets.map((b) => (
                                            <li key={b}>{b}</li>
                                        ))}
                                    </ul>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default ProjectsPage;
