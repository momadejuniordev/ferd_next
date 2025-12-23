"use client";

import React, { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        message,
      },
    ]);

    if (error) {
      setError("Sorry there was an error sending your form.");
    } else {
      setSuccess(true);
      formRef.current?.reset();
    }

    setLoading(false);
  };

  return (
    <div id="content" className="no-bottom no-top">
      <div id="top"></div>

      <section className="no-top">
        <div className="text-fit-wrapper"></div>
      </section>

      <section className="no-top">
        <div className="container">
          <div className="row g-4 gx-5">
            <div
              className="col-lg-8 offset-lg-2 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <p>
                Whether you have a question, a suggestion, or just want to say
                hello, this is the place to do it. Please fill out the form below
                with your details and message, and we'll get back to you as soon
                as possible.
              </p>

              <form
                ref={formRef}
                id="contact_form"
                className="position-relative z1000"
                onSubmit={handleSubmit}
              >
                <div className="row gx-4">
                  <div className="col-lg-6 col-md-6 mb10">
                    <div className="field-set">
                      <span className="d-label fw-bold">Name</span>
                      <input
                        type="text"
                        name="name"
                        className="form-control no-border"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="field-set">
                      <span className="d-label fw-bold">Email</span>
                      <input
                        type="email"
                        name="email"
                        className="form-control no-border"
                        placeholder="Your Email"
                        required
                      />
                    </div>

                    <div className="field-set">
                      <span className="d-label fw-bold">Phone</span>
                      <input
                        type="text"
                        name="phone"
                        className="form-control no-border"
                        placeholder="Your Phone"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="field-set mb20">
                      <span className="d-label fw-bold">Message</span>
                      <textarea
                        name="message"
                        className="form-control no-border"
                        placeholder="Your Message"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div id="submit" className="mt20">
                  <button
                    type="submit"
                    className="btn-main btn-line"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>

                {success && (
                  <div className="success mt20">
                    Your message has been sent successfully.
                  </div>
                )}

                {error && (
                  <div className="error mt20">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
