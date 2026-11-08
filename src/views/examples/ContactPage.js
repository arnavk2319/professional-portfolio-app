import React from 'react';
import { PageLayout } from "components/PageLayout";
import DetailsCard from './DetailsCard';

// Stricter than the browser's built-in type="email" check, which accepts "a@b".
// Needs a local part, an "@", and a domain with at least one dot and a 2+ letter ending.
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export const validateEmail = (value) => {
    const v = value.trim();
    if (!v) return "Please enter your email address.";
    if (!EMAIL_RE.test(v) || v.includes("..")) return "Please enter a valid email address, like name@example.com.";
    return "";
};

function ContactPage(){

    const [errors, setErrors] = React.useState({});
    const setError = (field, message) => setErrors((prev) => ({ ...prev, [field]: message }));

    const validators = {
        name: (v) => (v.trim() ? "" : "Please enter your name."),
        email: validateEmail,
        message: (v) => (v.trim() ? "" : "Please enter a message."),
    };

    // Block the submit and show inline messages if anything is invalid; otherwise the form posts as before.
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        const next = {};
        Object.keys(validators).forEach((f) => {
            next[f] = validators[f](form.elements[f].value);
        });
        setErrors(next);
        if (Object.values(next).some(Boolean)) {
            e.preventDefault();
            const first = Object.keys(next).find((f) => next[f]);
            form.elements[first].focus();
        }
    };

    // The button stays disabled while any field is showing an error.
    const hasErrors = Object.values(errors).some(Boolean);

    const fieldProps = (f) => ({
        onBlur: (e) => setError(f, validators[f](e.target.value)),
        onChange: (e) => errors[f] && setError(f, validators[f](e.target.value)),
        "aria-invalid": errors[f] ? "true" : "false",
        "aria-describedby": errors[f] ? f + "-error" : undefined,
        className: errors[f] ? "art-input art-input-invalid" : "art-input",
    });

    const FieldError = ({ field }) =>
        errors[field] ? <div id={field + "-error"} className="art-field-error" role="alert">{errors[field]}</div> : null;


    const contactDetails = [
      { label: "Email", value: "arnav.kaushal800@gmail.com", link: "mailto:arnav.kaushal800@gmail.com" },
      { label: "Personal", value: "+1 8732883330", link: "tel:+18732883330" },
      { label: "Skype", value: "live:arnavkaushal", link: "skype:live:arnavkaushal?chat" }
    ];

    const locationDetails = [
      { label: "Country", value: "Canada" },
      { label: "City", value: " Toronto" },
      { label: "Province", value: "Ontario" }
    ];

    return(
        <PageLayout title="Contact | Arnav Kaushal" currentHref="/contact-me" currentLabel="Contact">
                    {/*Container fluid section -- 1*/}
                    <div className="container-fluid">

                        <div className="row p-60-0 p-lg-30-0 p-md-15-0">

                            <div className="col-lg-12">

                                <div className="art-section-title">

                                    <div className="art-title-frame">

                                        <h4>Contact information</h4>

                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-6 mb-4 mb-md-0">

                               <DetailsCard details={contactDetails} />

                            </div>

                            <div className="col-lg-6 mt-3 mt-md-0">
                                <DetailsCard details={locationDetails} />

                            </div>

                            <div className="col-lg-12 mt-4">

                                <div className="art-section-title">

                                    <div className="art-title-frame">

                                        <h4>Get In Touch</h4>
                                    </div>

                                </div>

                                <div className="art-a art-card">

                                    <form id="form" className="art-contact-form" action="https://formspree.io/f/mwpqaojj" method="POST" noValidate onSubmit={handleSubmit}>

                                        <div className="art-form-field">

                                            <input id="name" name="name" type="text" placeholder="Name" required {...fieldProps("name")}></input>

                                            <label htmlFor="name"><i className="fas fa-user"></i></label>

                                            <FieldError field="name" />

                                        </div>

                                        <div className="art-form-field">

                                            <input id="email" name="email" type="email" placeholder="Email" required autoComplete="email" {...fieldProps("email")}></input>

                                            <label htmlFor="email"><i className="fas fa-at"></i></label>

                                            <FieldError field="email" />

                                        </div>

                                        <div className="art-form-field">

                                            <textarea id="message" name="message" placeholder="Message" required {...fieldProps("message")}></textarea>

                                            <label htmlFor="message"><i className="far fa-envelope"></i></label>

                                            <FieldError field="message" />

                                        </div>

                                        <div className="art-submit-frame">

                                            <button className="art-btn art-btn-md art-submit" type="submit" disabled={hasErrors} aria-disabled={hasErrors}><span>Send message</span></button>

                                        </div>
                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/*Container fluid section -- 2*/}

        </PageLayout>
    );
}

export default ContactPage;
