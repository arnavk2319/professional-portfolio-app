import React from 'react';
import { PageLayout } from "components/PageLayout";
import ContactGrid from './ContactGrid';
import profile from "data/profile";

function ContactPage(){
    return(
        <PageLayout title="Contact | Sakshi" currentHref="/contact-me" currentLabel="Contact">
            <div className="container-fluid">
                <div className="row p-60-0 p-lg-30-0 p-md-15-0">
                    <div className="col-lg-12">
                        <section aria-labelledby="contact-heading">
                            <div className="art-section-title">
                                <div className="art-title-frame">
                                    <h1 id="contact-heading" className="h4">Contact information</h1>
                                </div>
                            </div>
                            <ContactGrid profile={profile} />
                            <a href={profile.resumeUrl} download className="art-btn art-btn-md"><span>Download resume</span></a>
                        </section>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default ContactPage;
