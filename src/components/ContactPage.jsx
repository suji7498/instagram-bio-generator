import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../ThemeContext';
import { Header, Footer } from '../App';

export default function ContactPage() {
  const { isDarkTheme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [captchaNum1, setCaptchaNum1] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaNum2, setCaptchaNum2] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!subject) {
      newErrors.subject = "Please select a subject";
    }
    
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }
    
    const correctAnswer = captchaNum1 + captchaNum2;
    if (!captchaAnswer.trim()) {
      newErrors.captcha = "Please solve the captcha";
    } else if (parseInt(captchaAnswer) !== correctAnswer) {
      newErrors.captcha = "Captcha answer is incorrect";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for FormSubmit
      const formData = new FormData();
      formData.append("_subject", `IG Fonts & Instagram Bio Contact: ${subject}`);
      formData.append("_captcha", "false"); // We're handling captcha ourselves
      formData.append("_template", "table");
      formData.append("Name", name);
      formData.append("Email", email);
      formData.append("Subject", subject);
      formData.append("Message", message);
      
      // Submit to FormSubmit
      const response = await fetch("https://formsubmit.co/ajax/e2a67635ca58429567e7df059579be71", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });
      
      if (response.ok) {
        setShowSuccess(true);
        // Reset form
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        // Generate new captcha
        setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
        setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
        setCaptchaAnswer("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Added title and paragraph without hero section */}
          <div style={{ 
            textAlign: 'center',
            padding: '40px 20px 20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 style={{ 
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '20px',
              color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)'
            }}>
              Contact Us
            </h1>
            <p style={{ 
              fontSize: '18px',
              lineHeight: '1.6',
              color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text-secondary)'
            }}>
              Have questions about our Instagram fonts or bios? Need help with your Instagram profile? Reach out to us using the form below and our team will get back to you as soon as possible.
            </p>
          </div>
          
          <div className="content-section" style={{ padding: '20px 0' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '40px',
              marginBottom: '50px'
            }}>
              {/* Contact Form - Simplified container structure */}
              <div style={{
                flex: '1',
                minWidth: '300px'
              }}>
                <div style={{
                  backgroundColor: isDarkTheme ? 'var(--color-charcoal-800)' : 'var(--color-white)',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  border: `1px solid ${isDarkTheme ? 'var(--color-border)' : 'var(--color-gray-200)'}`
                }}>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '25px',
                    textAlign: 'center',
                    color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)'
                  }}>
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="name" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text)'
                      }}>
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        style={{
                          width: '100%',
                          padding: '14px',
                          borderRadius: '8px',
                          border: errors.name ? '1px solid var(--color-red-500)' : `1px solid ${isDarkTheme ? 'var(--color-border)' : '#ddd'}`,
                          backgroundColor: isDarkTheme ? 'var(--color-charcoal-700)' : '#f9f9f9',
                          color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)',
                          fontSize: '16px',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s ease'
                        }}
                      />
                      {errors.name && <p style={{
                        color: 'var(--color-red-500)',
                        fontSize: '14px',
                        marginTop: '6px'
                      }}>{errors.name}</p>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="email" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text)'
                      }}>
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        style={{
                          width: '100%',
                          padding: '14px',
                          borderRadius: '8px',
                          border: errors.email ? '1px solid var(--color-red-500)' : `1px solid ${isDarkTheme ? 'var(--color-border)' : '#ddd'}`,
                          backgroundColor: isDarkTheme ? 'var(--color-charcoal-700)' : '#f9f9f9',
                          color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)',
                          fontSize: '16px',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s ease'
                        }}
                      />
                      {errors.email && <p style={{
                        color: 'var(--color-red-500)',
                        fontSize: '14px',
                        marginTop: '6px'
                      }}>{errors.email}</p>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="subject" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text)'
                      }}>
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px',
                          borderRadius: '8px',
                          border: errors.subject ? '1px solid var(--color-red-500)' : `1px solid ${isDarkTheme ? 'var(--color-border)' : '#ddd'}`,
                          backgroundColor: isDarkTheme ? 'var(--color-charcoal-700)' : '#f9f9f9',
                          color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)',
                          fontSize: '16px',
                          boxSizing: 'border-box',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${isDarkTheme ? '%23ffffff' : '%23000000'}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 16px center',
                          backgroundSize: '16px'
                        }}
                      >
                        <option value="">Select a subject</option>
                        <option value="Instagram Fonts Help">Instagram Fonts Help</option>
                        <option value="Instagram Bio Suggestions">Instagram Bio Suggestions</option>
                        <option value="Font Generator Issue">Font Generator Issue</option>
                        <option value="Bio Search Problem">Bio Search Problem</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Business Collaboration">Business Collaboration</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                      {errors.subject && <p style={{
                        color: 'var(--color-red-500)',
                        fontSize: '14px',
                        marginTop: '6px'
                      }}>{errors.subject}</p>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="message" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text)'
                      }}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you?"
                        rows={5}
                        style={{
                          width: '100%',
                          padding: '14px',
                          borderRadius: '8px',
                          border: errors.message ? '1px solid var(--color-red-500)' : `1px solid ${isDarkTheme ? 'var(--color-border)' : '#ddd'}`,
                          backgroundColor: isDarkTheme ? 'var(--color-charcoal-700)' : '#f9f9f9',
                          color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)',
                          fontSize: '16px',
                          boxSizing: 'border-box',
                          resize: 'vertical',
                          transition: 'border-color 0.2s ease'
                        }}
                      />
                      {errors.message && <p style={{
                        color: 'var(--color-red-500)',
                        fontSize: '14px',
                        marginTop: '6px'
                      }}>{errors.message}</p>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="captcha" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text)'
                      }}>
                        Captcha: What is {captchaNum1} + {captchaNum2}?
                      </label>
                      <input
                        id="captcha"
                        type="number"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        placeholder="Enter the answer"
                        style={{
                          width: '100%',
                          padding: '14px',
                          borderRadius: '8px',
                          border: errors.captcha ? '1px solid var(--color-red-500)' : `1px solid ${isDarkTheme ? 'var(--color-border)' : '#ddd'}`,
                          backgroundColor: isDarkTheme ? 'var(--color-charcoal-700)' : '#f9f9f9',
                          color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)',
                          fontSize: '16px',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s ease'
                        }}
                      />
                      {errors.captcha && <p style={{
                        color: 'var(--color-red-500)',
                        fontSize: '14px',
                        marginTop: '6px'
                      }}>{errors.captcha}</p>}
                    </div>

                    {errors.submit && <p style={{
                      color: 'var(--color-red-500)',
                      fontSize: '14px',
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}>{errors.submit}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        transition: 'background-color 0.3s ease'
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>

              {/* About Us section */}
              <div style={{
                flex: '1',
                minWidth: '300px'
              }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)'
                }}>
                  About Us
                </h2>
                
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)'
                }}>
                  About Me Suraj:
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '25px',
                  color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text-secondary)'
                }}>
                  Hi, I'm Suraj! ig-fonts.app started as a hobby project inspired by my curiosity about how popular websites handle direct file sharing. With the help of Vibe Coding and AI-powered tools, I've been able to research, experiment, and create seamless web and app experiences. Today, I can design and build websites and applications efficiently, leveraging AI to bring ideas to life.
                </p>
                
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)'
                }}>
                  About IG Fonts and Instagram Bio:
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '25px',
                  color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text-secondary)'
                }}>
                  IG Fonts is a powerful tool that allows you to generate unique and stylish fonts for your Instagram bio and posts. Our Instagram Bio tool helps you find the perfect bio ideas for your profile, whether you're looking for something cool, funny, or professional. Both tools are designed to help you stand out on social media and express your personality.
                </p>
                
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '15px',
                  color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)'
                }}>
                  Disclaimer:
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '30px',
                  color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text-secondary)'
                }}>
                  This website is an independent project and is not affiliated with Instagram or Meta Platforms Inc. The Instagram name, logo, and related trademarks are the property of Instagram/Meta. This website is for entertainment purposes only and is not intended to infringe upon any copyrights or trademarks. All content is provided as-is without any guarantees or warranties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div style={{
            position: 'fixed',
            inset: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: isDarkTheme ? 'var(--color-charcoal-800)' : 'var(--color-white)',
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              maxWidth: '400px',
              width: '100%',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{
                margin: '0 auto 20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '10px',
                color: isDarkTheme ? 'var(--color-white)' : 'var(--color-text)'
              }}>
                Message Sent!
              </h3>
              
              <p style={{
                fontSize: '16px',
                marginBottom: '25px',
                color: isDarkTheme ? 'var(--color-gray-300)' : 'var(--color-text-secondary)'
              }}>
                Thank you for contacting us. We'll get back to you as soon as possible.
              </p>
              
              <button
                onClick={handleCloseSuccess}
                style={{
                  padding: '12px 30px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}