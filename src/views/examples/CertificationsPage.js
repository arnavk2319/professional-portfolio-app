import React from 'react';
import { PageLayout } from "components/PageLayout";
import CredlyBadges from './CredlyBadges';

function CertificationsPage(){


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
        <PageLayout title="Certifications | Arnav Kaushal" currentHref="/certifications" currentLabel="Certifications">
                    {/*Container fluid section -- 1*/}
                    <div className="container-fluid-projects">

                        <div className="row p-60-0 p-lg-30-0 p-md-15-0">

                            <div className="col-lg-12">

                                <div className="art-filter mb-30" style={{padding: '20px'}}>

                                     <a id={'linkAll'} href="#." data-filter="*" className="art-link art-current">My Credentials</a>

                                </div>

                            </div>

                            {/*Container fluid section -- 4*/}
                            <div className="container-fluid mt-5">

                                <div className="row px-3">
                                    <CredlyBadges badges={credlyBadges} />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/*Container fluid section -- 2*/}

        </PageLayout>
    );
}

export default CertificationsPage;
