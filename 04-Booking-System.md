\# 04 - Booking System Specification

\## Project

Fahrdienst Schwabia

Airport Transfer Booking Platform

Version: 1.0

\# 1. Booking System Purpose

The booking system is the main conversion feature of the Fahrdienst Schwabia website.

The system allows customers to book airport transfers online while giving administrators complete control over:

\- Routes

\- Prices

\- Passenger pricing

\- Booking records

\- Customer communication

\- Availability settings

The booking system must be:

\- Simple for customers

\- Fast

\- Mobile friendly

\- Secure

\- SEO friendly

\- Easy to manage from the admin dashboard

\---

\# 2. Booking System Access Points

The booking form must be accessible from:

\## Homepage

Hero section booking widget.

Priority:

Very High

\## Header

Permanent button:

German:

\## Service Pages

Each airport transfer page must include:

\- Booking button

\- Booking form

\- Route pre-selected

Example:

Augsburg → Munich Airport page:

Booking form automatically selects:

Departure:

Augsburg

Destination:

Munich Airport

\## Footer

Booking CTA.

\## Mobile Floating Buttons

Sticky bottom navigation:

\---

\# 3. Booking User Flow

Customer journey:

Visitor enters website

↓

Clicks Book Now

↓

Selects trip type

↓

Selects departure

↓

Selects destination

↓

Selects date and time

↓

Selects passengers

↓

Adds flight information

↓

Adds personal information

↓

Reviews booking

↓

Confirms booking

↓

Receives confirmation

↓

Company receives notification

\---

\# 4. Trip Type

Customer selects:

\## One Way

Example:

Augsburg → Munich Airport

\## Return Trip

Example:

Augsburg → Munich Airport

Return:

Munich Airport → Augsburg

When return trip is selected, additional fields appear automatically.

\---

\# 5. Booking Form Fields

\## Section A

\## Journey Information

\---

\# Departure Location

Field:

Dropdown

Default value:

When return trip is selected, additional fields appear automatically.

\---

\# 5. Booking Form Fields

\## Section A

\## Journey Information

\---

\# Departure Location

Field:

Dropdown

Default value:

Augsburg

Available locations:

Augsburg

Munich Airport

Memmingen Airport

Nürnberg Airport

Stuttgart Airport

The admin can:

\- Add new destinations

\- Remove destinations

\- Disable destinations

\- Rename destinations

\---

\# Destination Location

Field:

Dropdown

Available options:

The admin can:

\- Add new destinations

\- Remove destinations

\- Disable destinations

\- Rename destinations

\---

\# Destination Location

Field:

Dropdown

Available options:

Augsburg

Munich Airport

Memmingen Airport

Nürnberg Airport

Stuttgart Airport

Validation:

Departure and destination cannot be identical.

Example:

Invalid:

Augsburg → Augsburg

\---

\# 6. Date Selection

Field:

Calendar

Requirements:

\- Mobile friendly

\- Current date minimum

\- Past dates disabled

\---

\# 7. Time Selection

IMPORTANT REQUIREMENT

The time selector must use 30-minute intervals.

Available times:

Future admin settings may control:

\- Opening hours

\- Closed dates

\- Availability

\---

\# 8. Passenger Information

\## Number of Passengers

Field:

Number selector

Default:

Admin configurable.

\---

\# 9. Flight Information

Required for airport transfers.

Fields:

\## Flight Number

Example:

LH1234

\## Airline Company

Example:

Lufthansa

Purpose:

Allow driver preparation and pickup tracking.

\---

\# 10. Customer Information

Required fields:

\## Full Name

Type:

Text

\---

\## Phone Number

Type:

Telephone

Validation:

International format.

Example:

+49XXXXXXXXXX

\---

\## Email Address

Type:

Email

Validation:

Valid email format.

\---

\## Additional Message

Optional.

Examples:

\---

\## Email Address

Type:

Email

Validation:

Valid email format.

\---

\## Additional Message

Optional.

Examples:

Child seat required

Large luggage

Special request

\---

\# 11. Return Trip Fields

Visible only when:

Return Trip = Enabled

Additional fields:

\---

\# 11. Return Trip Fields

Visible only when:

Return Trip = Enabled

Additional fields:

Return Date

Return Time

Return Flight Number

Return Airline

Return Pickup Location

\---

\# 12. Pricing System

The system must calculate prices automatically.

Formula:

Final Price =

Base Route Price

Extra Passenger Cost

Future Optional Services

\---

\# 13. Route Pricing Management

Each route has its own price.

Example:

\---

\# 13. Route Pricing Management

Each route has its own price.

Example:

Route:

Augsburg → Munich Airport

Base Price:

120€

Admin can edit:

\- Route

\- Price

\- Active status

\- Description

\- Image

\- SEO content

\---

\# 14. Extra Passenger Pricing

Admin controls:

Included passengers:

Example:

1 Passenger

Extra passenger price:

Example:

10€ per additional passenger

Calculation example:

Base price:

120€

Passengers:

4

Included:

1

Extra:

3

Extra cost:

3 × 10€

\= 30€

Final price:

150€

\---

\# 15. Booking Confirmation

After submission:

System must:

1\. Generate booking ID

Example:

FS-2026-00001

2\. Save booking database record

3\. Send customer email

4\. Send company email

5\. Generate WhatsApp notification

6\. Display confirmation page

\---

\# 16. Booking Status Management

Admin can change booking status:

2\. Save booking database record

3\. Send customer email

4\. Send company email

5\. Generate WhatsApp notification

6\. Display confirmation page

\---

\# 16. Booking Status Management

Admin can change booking status:

New

Confirmed

Driver Assigned

Completed

Cancelled

No Show

\---

\# 17. Email Notifications

\## Customer Email

Contains:

\- Company logo

\- Booking number

\- Customer name

\- Route

\- Date

\- Time

\- Passengers

\- Flight details

\- Price

\- Contact information

\---

\## Admin Email

Contains:

\- Booking ID

\- Customer details

\- Route

\- Date

\- Time

\- Flight number

\- Airline

\- Passenger count

\- Message

\---

\# 18. WhatsApp Integration

Company WhatsApp:

+49 15201487887

The website must support:

\## WhatsApp Booking Button

Opens:

The website must support:

\## WhatsApp Booking Button

Opens:

[https://wa.me/4915201487887](https://wa.me/4915201487887)

with predefined message.

\---

\## Automatic WhatsApp Notification

Generated message:

with predefined message.

\---

\## Automatic WhatsApp Notification

Generated message:

New Booking Request

Booking ID:FS-2026-00001

Customer:John Smith

Phone:+49xxxx

Route:Augsburg → Munich Airport

Date:15.08.2026

Time:07:30

Passengers:2

Flight:LH1234

Price:120€

\---

\# 19. Admin Booking Management

Admin dashboard must provide:

\## Booking List

Columns:

Booking ID

Customer Name

Phone

Route

Date

Time

Passengers

Price

Status

Created Date

\---

\## Booking Details Page

Display:

Customer information

Trip information

Flight details

Price calculation

Notes

Status

\---

\# 20. Booking Search

Admin can search by:

\- Booking ID

\- Customer name

\- Phone number

\- Email

\- Date

\- Route

\- Status

\---

\# 21. Booking Export

Admin can export:

\- CSV

\- Excel

\- PDF

\---

\# 22. Calendar View

Future feature.

Display:

\- Daily bookings

\- Weekly bookings

\- Monthly bookings

\---

\# 23. Security Requirements

The booking system must include:

\- Server-side validation

\- Input sanitization

\- CSRF protection

\- Spam protection

\- Google reCAPTCHA

\- Rate limiting

\- Secure database queries

\---

\# 24. GDPR Requirements

Because customer personal data is collected:

Must include:

\- Privacy consent checkbox

\- Privacy policy link

\- Secure storage

\- Data deletion capability

\---

\# 25. Database Entities

The booking system requires:

Bookings

Customers

Routes

Pricing

Notifications

Settings

Detailed database structure:

See:

06-Database.md

\---

\# 26. Future Expansion

The architecture should support:

\- Online payment

\- Stripe

\- PayPal

\- Customer accounts

\- Driver application

\- SMS notifications

\- Flight tracking

\- Corporate accounts

\- Discount codes

\- Recurring bookings

\---

\# 27. Booking System Acceptance Criteria

The system is complete when:

✓ Customer can create booking

✓ Customer receives confirmation

✓ Company receives notification

✓ WhatsApp integration works

✓ Email integration works

✓ Prices can be changed from admin

✓ Extra passenger pricing works

✓ Return trips work

✓ Booking records are stored

✓ GDPR requirements are implemented

✓ Mobile booking experience works perfectly

\---

\# End of Booking System Specification