\# 06 - Database Specification

\## Project

Fahrdienst Schwabia

Database Architecture

Version: 1.0

\---

\# 1. Database Purpose

The database is responsible for storing and managing:

\- Customer bookings

\- Customer information

\- Routes

\- Pricing

\- Website content

\- SEO data

\- Media files

\- Admin users

\- Website settings

\- Notifications

\- System logs

The database must be designed for:

\- Security

\- Performance

\- Scalability

\- Easy administration

\- Future expansion

\---

\# 2. Recommended Database

Primary Database:

MySQL 8+

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 3. Database Design Principles  The database must follow:  - Normalized structure  - Foreign key relationships  - Proper indexing  - Secure queries  - Data validation  - Soft deletion where required  ---  # 4. Main Database Entities  Core tables:   `

users

roles

bookings

customers

routes

pricing

destinations

pages

page\_translations

media

seo\_settings

website\_settings

notifications

audit\_logs

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 5. Users Table  Purpose:  Stores admin dashboard users.  Table:   `

users

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type | Description |  |-|-|-|  | id | BIGINT | Primary key |  | name | VARCHAR | User name |  | email | VARCHAR | Login email |  | password | VARCHAR | Hashed password |  | role_id | BIGINT | User role |  | status | ENUM | Active/Inactive |  | last_login | DATETIME | Last login |  | created_at | TIMESTAMP | Creation date |  | updated_at | TIMESTAMP | Update date |  ---  # 6. Roles Table  Purpose:  Controls admin permissions.  Table:   `

roles

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | name | VARCHAR |  | permissions | JSON |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  Example roles:   `

Super Admin

Manager

Content Editor

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 7. Customers Table  Purpose:  Stores customer information.  Table:   `

customers

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | full_name | VARCHAR |  | phone | VARCHAR |  | email | VARCHAR |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  ---  # 8. Bookings Table  Purpose:  Main booking records.  Table:   `

bookings

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type | Description |  |-|-|-|  | id | BIGINT | Primary key |  | booking_number | VARCHAR | FS-2026-00001 |  | customer_id | BIGINT | Customer |  | trip_type | ENUM | One way / Return |  | departure_id | BIGINT | Start location |  | destination_id | BIGINT | Destination |  | travel_date | DATE | Trip date |  | travel_time | TIME | Pickup time |  | passengers | INT | Number passengers |  | flight_number | VARCHAR | Flight number |  | airline_company | VARCHAR | Airline |  | base_price | DECIMAL | Route price |  | extra_passenger_price | DECIMAL | Extra cost |  | total_price | DECIMAL | Final price |  | status | ENUM | Booking status |  | notes | TEXT | Customer notes |  | created_at | TIMESTAMP | Created |  | updated_at | TIMESTAMP | Updated |  ---  # Booking Status Values   `

New

Confirmed

Driver Assigned

Completed

Cancelled

No Show

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 9. Return Trips Table  Purpose:  Stores return journey details.  Table:   `

return\_trips

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | booking_id | BIGINT |  | return_date | DATE |  | return_time | TIME |  | return_flight_number | VARCHAR |  | return_airline | VARCHAR |  | return_pickup_location | VARCHAR |  | created_at | TIMESTAMP |  Relationship:   `

Booking

1 ---- 1

Return Trip

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 10. Destinations Table  Purpose:  Stores airports and locations.  Table:   `

destinations

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | name | VARCHAR |  | slug | VARCHAR |  | type | VARCHAR |  | image_id | BIGINT |  | active | BOOLEAN |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  ---  # Initial Destinations   `

Augsburg

Munich Airport

Memmingen Airport

Nürnberg Airport

Stuttgart Airport

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 11. Routes Table  Purpose:  Stores available transfer routes.  Table:   `

routes

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | departure_id | BIGINT |  | destination_id | BIGINT |  | distance | VARCHAR |  | duration | VARCHAR |  | active | BOOLEAN |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  Example:   `

Augsburg

↓

Munich Airport

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 12. Pricing Table  Purpose:  Controls route prices.  Table:   `

pricing

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | route_id | BIGINT |  | base_price | DECIMAL |  | included_passengers | INT |  | extra_passenger_price | DECIMAL |  | active | BOOLEAN |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  Example:   `

Route:

Augsburg → Munich Airport

Base:

120€

Included:

1 passenger

Extra:

10€

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 13. Pages Table  Purpose:  Stores website pages.  Table:   `

pages

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | slug | VARCHAR |  | template | VARCHAR |  | status | ENUM |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  Examples:   `

home

about

services

contact

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 14. Page Translations Table  Purpose:  Multilingual content.  Table:   `

page\_translations

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | page_id | BIGINT |  | language | VARCHAR |  | title | VARCHAR |  | content | LONGTEXT |  | meta_title | VARCHAR |  | meta_description | TEXT |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  Languages:   `

de

en

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 15. Media Table  Purpose:  Stores images and videos.  Table:   `

media

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | filename | VARCHAR |  | path | VARCHAR |  | type | ENUM |  | alt_text | VARCHAR |  | title | VARCHAR |  | size | INT |  | created_at | TIMESTAMP |  Supported:   `

Images

Videos

Documents

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 16. SEO Settings Table  Table:   `

seo\_settings

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | page_id | BIGINT |  | meta_title | VARCHAR |  | meta_description | TEXT |  | keywords | TEXT |  | canonical_url | VARCHAR |  | schema_data | JSON |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  ---  # 17. Website Settings Table  Purpose:  Global website configuration.  Table:   `

website\_settings

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | company_name | VARCHAR |  | address | TEXT |  | booking_phone | VARCHAR |  | office_phone | VARCHAR |  | whatsapp_number | VARCHAR |  | email | VARCHAR |  | opening_hours | JSON |  | social_links | JSON |  | created_at | TIMESTAMP |  | updated_at | TIMESTAMP |  ---  # 18. Notifications Table  Purpose:  Tracks messages.  Table:   `

notifications

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | booking_id | BIGINT |  | type | VARCHAR |  | recipient | VARCHAR |  | status | ENUM |  | sent_at | TIMESTAMP |  Types:   `

Email

WhatsApp

SMS

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 19. Audit Logs Table  Purpose:  Track admin activities.  Table:   `

audit\_logs

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Fields:  | Field | Type |  |-|-|  | id | BIGINT |  | user_id | BIGINT |  | action | VARCHAR |  | table_name | VARCHAR |  | record_id | BIGINT |  | old_data | JSON |  | new_data | JSON |  | created_at | TIMESTAMP |  ---  # 20. Database Relationships  ## Customer → Bookings  One customer:  Many bookings   `

customers.id

↓

bookings.customer\_id

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  ## Route → Pricing  One route:  One or multiple prices   `

routes.id

↓

pricing.route\_id

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  ## Booking → Return Trip  One booking:  Optional return trip   `

bookings.id

↓

return\_trips.booking\_id

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  ## Page → Translation  One page:  Multiple languages   `

pages.id

↓

page\_translations.page\_id

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 21. Database Indexing  Required indexes:  Bookings:   `

booking\_number

customer\_id

travel\_date

status

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Customers:   `

phone

email

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Routes:   `

departure\_id

destination\_id

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   SEO:   `

slug

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 22. Data Security  Requirements:  - Prepared SQL statements  - Encrypted passwords  - Database backups  - Restricted access  - Environment variables  - No exposed credentials  ---  # 23. Backup Strategy  Recommended:  Daily automatic backups.  Retention:  30 days minimum.  ---  # 24. Future Database Expansion  The structure should support:  ## Driver Management   `

driversvehiclesassignments

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ## Payments   `

paymentstransactions

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ## Customer Accounts   `

customer\_users

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ## Reviews   `

reviews

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ## Coupons   `

discount\_codes

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ## Flight Tracking   `

flights

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   ---  # 25. Database Acceptance Criteria  Database is complete when:  ✓ All bookings can be stored  ✓ Prices can be managed dynamically  ✓ Multi-language content works  ✓ CMS content can be saved  ✓ Admin users are secured  ✓ Future expansion is possible  ✓ Database performance is optimized  ---  # End Database Specification   `