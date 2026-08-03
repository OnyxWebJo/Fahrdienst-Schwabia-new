\# 13 - Technology Stack Specification

\## Project

Fahrdienst Schwabia

Technology Stack & Development Standards

Version: 2.0

\---

\# 1. Project Philosophy

The website must be developed with simplicity, performance, and maintainability as the highest priorities.

The project is \*\*not\*\* a SaaS platform and does \*\*not\*\* require a complex architecture.

The website must:

\- Load extremely fast

\- Be fully SEO optimized

\- Be optimized for AEO (Answer Engine Optimization)

\- Be optimized for GEO (Generative Engine Optimization)

\- Be mobile-first

\- Be easy to maintain

\- Work perfectly on standard shared hosting (cPanel)

\- Be easy for AI coding assistants to understand and extend

The codebase should remain lightweight, clean, modular, and future-proof.

\---

\# 2. Recommended Technology Stack

\## Backend

PHP 8.2 or newer

Reasons:

\- Excellent compatibility with shared hosting

\- Fast execution

\- Easy deployment

\- Stable

\- Large ecosystem

\- No server management required

\---

\## Database

MySQL 8+

Requirements:

\- UTF8MB4 encoding

\- Indexed tables

\- Foreign key relationships

\- Optimized queries

\---

\## Frontend

HTML5

CSS3

JavaScript (ES6+)

\---

\## CSS Framework

Tailwind CSS

Reasons:

\- Lightweight

\- Responsive

\- Fast development

\- Small production CSS

\- Easy maintenance

\---

\## JavaScript

Use native JavaScript whenever possible.

Optional:

Alpine.js

Only for lightweight interactions.

Avoid large JavaScript frameworks unless absolutely necessary.

\---

\# 3. Project Architecture

The project should follow a lightweight MVC architecture.

Recommended folder structure:

/app

Controllers

Models

Helpers

Middleware

/admin

/config

/routes

/views

/templates

/public

/uploads

/storage

/cache

/lang

de

en

Benefits:

\- Organized code

\- Easy maintenance

\- Easy AI development

\- Better scalability

\- Separation of concerns

\---

\# 4. Multilingual Structure

Supported languages:

German (Default)

English

Language files should be stored separately.

Example:

/lang/de/

/lang/en/

Each language should have its own SEO-friendly URL.

Example:

German:

/

English:

/en/

\---

\# 5. Admin Dashboard

Develop a custom lightweight CMS.

No third-party CMS.

The admin dashboard should manage:

\- Bookings

\- Routes

\- Prices

\- Website content

\- Images

\- SEO settings

\- Company information

\- Contact details

\- Social media

\- Cookie text

\- Legal pages

\---

\# 6. Booking System

The booking system should use:

PHP

MySQL

Email notifications

WhatsApp integration

The booking form should:

\- Validate all fields

\- Store bookings

\- Notify administrator

\- Notify customer

\- Redirect to WhatsApp after submission (optional)

\---

\# 7. Email

SMTP configurable from the admin panel.

Support:

\- Gmail SMTP

\- Microsoft 365

\- Hosting SMTP

Email templates:

\- Booking confirmation

\- Contact form

\- Admin notification

\---

\# 8. WhatsApp Integration

Booking WhatsApp:

+49 15201487887

Functions:

\- Floating WhatsApp button

\- Booking confirmation button

\- Contact page button

Use official Click-to-Chat:

https://wa.me/

\---

\# 9. Image Management

The CMS should allow:

\- Upload

\- Replace

\- Delete

\- Organize

Automatically optimize images.

Preferred formats:

AVIF

WebP

Fallback:

JPEG

PNG

Every image must support:

\- ALT text

\- Title

\- Description

\---

\# 10. Video

Homepage hero supports:

\- MP4

\- WebM

Requirements:

\- Muted

\- Autoplay

\- Loop

\- Poster image

\- Optimized size

Mobile devices may display a static image instead.

\---

\# 11. SEO Implementation

SEO must be integrated into every page.

Each page should support:

\- SEO Title

\- Meta Description

\- Canonical URL

\- Open Graph

\- Twitter Card

\- Meta Robots

\- Hreflang

\- Breadcrumb Schema

Automatically generate:

\- sitemap.xml

\- robots.txt

Implement JSON-LD Schema.

Required Schema:

\- LocalBusiness

\- Organization

\- Service

\- FAQPage

\- BreadcrumbList

\- WebSite

\---

\# 12. Performance Optimization

The website must prioritize loading speed.

Implement:

\- Lazy loading

\- Minified CSS

\- Minified JavaScript

\- Browser caching

\- GZIP/Brotli compression (if available)

\- Optimized database queries

\- Responsive images

\- Image compression

Avoid unnecessary JavaScript.

\---

\# 13. Hosting Requirements

The website must run on a standard shared hosting account.

Requirements:

\- PHP 8.2+

\- MySQL

\- cPanel

\- SSL Certificate

\- mod\_rewrite

\- Cron Jobs (optional)

No VPS or dedicated server should be required.

\---

\# 14. Security

Implement:

\- Password hashing

\- CSRF protection

\- XSS protection

\- SQL Injection prevention

\- Server-side validation

\- Secure sessions

\- reCAPTCHA on forms

\- HTTPS only

\---

\# 15. Development Standards

Use:

\- Reusable components

\- Modular PHP

\- Clean code

\- Consistent naming

\- Comments for complex logic

Avoid:

\- Duplicate code

\- Hardcoded values

\- Inline SQL where possible

\- Unused files

\---

\# 16. AI Development Guidelines

The project should be structured so AI coding assistants can easily understand and maintain it.

Requirements:

\- Clear folder structure

\- Modular files

\- Descriptive file names

\- Reusable functions

\- Consistent coding standards

The AI agent should always prioritize:

1\. Performance

2\. SEO

3\. Accessibility

4\. Security

5\. Maintainability

\---

\# 17. Future Expansion

The architecture should allow future implementation of:

\- Online payments

\- Customer accounts

\- Driver management

\- Vehicle management

\- Flight tracking

\- SMS notifications

\- Additional languages

Without requiring a complete rewrite.

\---

\# 18. Technology Stack Acceptance Criteria

The project is complete when:

✓ Fully compatible with shared hosting

✓ Fast loading

✓ SEO optimized

✓ AEO optimized

✓ GEO optimized

✓ Mobile friendly

✓ Secure

✓ Easy to maintain

✓ Easy for AI-assisted development

✓ Production ready

\---

\# End Technology Stack Specification