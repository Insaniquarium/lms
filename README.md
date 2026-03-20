# LMS

An (incomplete) Learning Management System, written utilising [React](https://react.dev), [Django](https://djangoproject.com), and [Django Rest Framework](https://django-rest-framework.org).

## Setup

Please see the instructions in [docs/setup.md](docs/setup.md).

## Screenshots

Screenshots are located in [docs/screenshots.md](docs/screenshots.md) as to reduce clutter.

## Project Brief

I was tasked to develop a learning management system, where students can enroll onto courses, access learning content, and track their learning progress. It should also have functionality tailored to different user roles, so teachers can create and manage courses and so can admins, but only admins can manage users.

The frontend should be using React, while integrating a Django backend.

There should be authentication, data should be handled securely, and content management should be effective through a structured design. SQLite should be used as the default database as it ensures easy deployment, while satisfying necessary relation database functionalities.

Courses should have a title and a description, and there should be user registration, login, and role-based access control.

The Django backend should have REST endpoints, and there should be a test suite for both the frontend and backend.

## Key Elements

Not all of these are satisfied due to time constraints.

- Students should be able to:
	- ✅ Browse available courses
	- ✅ Enrol onto a course
	- ✅ Access a list of courses they are enroled in
	- ✅ Access course content
- Teachers should be able to:
	- 🚧 Create and manage courses
- Admins should be able to:
	- 🚧 Create and manage courses
	- 🚧 Create and manage users
- 🚧 User Roles and Authentication
- 🚧 REST API
- ❌ Automated tests
- ❌ Wireframes in documentation

For creating and managing courses and users, while you can *create* them, the pages for modifying them are not yet fully wired up to an API.

For User Roles and Authentication, role-based access to pages should be determined through a property in the `<RequireAuth>` component used by the router, however this is not yet functional. This means you are able to visit the admin page as a normal user (but it will hardly function, since API requests will fail). The Django backend is rather well prepared for this, as each view restricts which operations can be done depending on if you're logged in, or an admin.

The Django backend with proper REST API is close to completion. You can create and list courses, modules, users, enrolments, and activity. However, you cannot create enrolments, module completions, or modify already existant users/courses/modules.

The Django backend can do token authentication and authorization, however there is not yet a proper role system. It only distinguishes between User and Admin, not Student, Teacher and Admin.

## Constraints

*Time* was the biggest constraint. Whilst by the deadline I had got most of it completed, the backend, integration of the backend, and numerous other pages were left unfinished and unusable, as well as code not being the best as it was rushed. A list of things remaining to do include:

- Student
	- Dashboard
		- Achievements card
		- See about putting something on same row as Recent Activity so there's less whitespace
	- Activity page
		- Currently empty
	- Library
		- Indicate which courses a user has already enroled on
	- Course
		- No unenrol button
	- Module completion system
		- Possibly easiest bet to implement this - assuming course content will be hosted on an external server - would be to make the module content iframe listen for messages posted from within it using `window.postMessage()`, and if for example the message is `{"type": "completed"}`, then the page containing the iframe shall send an API request to the server saying the module has been completed. This avoids needing to pass user tokens and other relevant API data into the iframe
- Admin
	- Dashboard
		- Currently empty
		- Statistics (e.g., recent enrolments and completions)
	- Course
		- No way to see which users are enroled onto a course (and when, and their completion)
		- No way to manually enrol/unenrol a user onto a course (if it's not public)
	- User
		- Clicking on a course should link to a list of modules the selected user has completed
		- Cannot delete or deactivate a user
		- Activity tab should have more statistics
- Frontend
	- Pagination
	- Error pages & handling
		- I implemented an ErrorBoundary at some point but it doesn't look like it's working fully, especially because I remembered React Router seems to have its own functionality I should be using for it instead.
	- Ability to sort table columns
	- `RequireAuth`'s `role` property does not yet check roles
		- Perhaps it should show a 403 Forbidden page if the user visiting does not have any allowed role
	- Make circular progress bar green when 100%
	- Revamp CSS colours: As to be more consistent, move more colours to variables, or also move to SCSS variables?
		- Would allow adjusting brightness etc from code
	- No default image for courses & modules
	- Cannot remove accidental image upload from the course creation form unless you refresh
	- Drag & drop on image upload boxes
- Backend
	- No proper concept of student/teacher/admin roles
	- No token expiry
	- Responses aren't as optimised as they could be (contain data that likely isn't going to be shown)
	- No endpoint to submit a module completion
- General
	- TabBar tab's should wrap better on narrow viewports
	- Reformat code and clean it (for consistency, and because some things were rushed and aren't as ideal as they could be)
	- Invalid inputs should have red outline or similar
	- Test suite
	- Documentation has no wireframes

(List is no longer as comprehensive, there's a lot of notes prefixed with TODO around the codebase that aren't here.)

Had I had more time, I feel I could have got this done to a really good standard.

## Validation

As I use React JSX and SCSS a lot, I'm unable to utilise the usual W3C HTML and CSS validators, perhaps unless I somehow compile the JSX and SCSS output.

The only issue with the JSX I can point out is that not every `<li>` has a `key`. This causes React to warn in the browser console.

Due to time constraints, I was unable to write tests for the frontend and backend.

## Accessibility

### Testing

#### Lighthouse

Testing with Lighthouse gives almost full scores:

![Lighthouse Report](docs/assets/lighthouse.png)

Performance being so low doesn't wholly appear to be my fault, as a large amount of JavaScript loaded is caused by running it in the development server, Google Fonts has latency, and Unsplash (where I sourced stock images) takes a noticeable amount of time to load images from.

The SEO score was not full until [2602e60](https://github.com/Insaniquarium/lms/commit/2602e60) which added a stub robots.txt and meta description tag.

Best practices can still sometimes fluctuate between 90-100, as it in some situations may complain about the low resolution of the placeholder logo image, or because of the aforementioned React `<li>` `key` issue on pages that have them.

#### Screen Readers

Unfortunately, I did not have enough time to test with screen readers. I would expect it to be better in some ways than the quiz though, especially as I'd hope the focusing issue isn't present as I'm not doing SPA page switching myself, as that's React Router's job.

## Deployment

Unfortunately, I have not had enough time to try setting up such a monorepo with cloud deployment services such as Netlify.
