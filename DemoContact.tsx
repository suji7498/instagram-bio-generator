import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [captchaNum1, setCaptchaNum1] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaNum2, setCaptchaNum2] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for FormSubmit
      const formData = new FormData();
      formData.append("_subject", `FileTransfer Contact: ${subject}`);
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
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Have questions or feedback? Reach out to us using the form below.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className={errors.subject ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Bug Report">Bug Report</SelectItem>
                  <SelectItem value="Feature Request">Feature Request</SelectItem>
                  <SelectItem value="Business Deal">Business Deal</SelectItem>
                  <SelectItem value="Legal Help">Legal Help</SelectItem>
                </SelectContent>
              </Select>
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                rows={5}
                className={errors.message ? "border-red-500" : ""}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="captcha">
                Captcha: What is {captchaNum1} + {captchaNum2}?
              </Label>
              <Input
                id="captcha"
                type="number"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Enter the answer"
                className={errors.captcha ? "border-red-500" : ""}
              />
              {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>}
            </div>
            
            {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </section>
      </div>
      
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            {/* Success Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 ring-4 ring-green-50 dark:ring-green-900/20">
              <svg 
                className="h-8 w-8 text-green-600 dark:text-green-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            
            {/* Success Content */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                Thank you for contacting us. We'll get back to you as soon as possible.
              </p>
            </div>
            
            {/* Action Button */}
            <div className="flex w-full justify-center pt-2">
              <Button 
                onClick={handleCloseSuccess}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-8 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <svg 
                  className="mr-2 h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}