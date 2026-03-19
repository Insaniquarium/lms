<?php
# Dumb backend to take the Django backend's place until it ever gets finished
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, *");
error_reporting(E_ALL);

$url = parse_url($_SERVER["REQUEST_URI"])["path"];

switch (str_replace("/api/v1", "", $url)) {
case "/login":
	echo '{ "token": "real", "user_id": "0" }';
	break;

case "/courses":
	# ?visibility=public (by default, forced for students)
	echo <<< 'EOF'
	[
		{
			"id": 0,
			"title": "Coding Essentials",
			"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
			"description": "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
			"public": true,
			"created_at": "2026-02-10T22:10:37.000Z" ,
			"enrolments": 100,
			"modules": 5
		},
		{
			"id": 1,
			"title": "Front End Development",
			"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
			"description": "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
			"public": true,
			"created_at": "2026-02-10T22:10:37.000Z" ,
			"enrolments": 50,
			"modules": 0
		},
		{
			"id": 2,
			"title": "Back End Development",
			"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
			"description": "Study programming in Python, writing and managing a SQL database, and developing APIs.",
			"public": true,
			"created_at": "2026-02-10T22:10:37.000Z",
			"enrolments": 40,
			"modules": 0
		}		
	]
	EOF;
	break;

#case "/courses/:course_id":
case "/courses/0":
	echo <<< 'EOF'
	{
		"id": 0,
		"title": "Coding Essentials",
		"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
		"description": "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
		"public": true,
		"created_at": "2026-02-10T22:10:37.000Z",
		"enrolments": 100,
		"modules": [
			{
				"id": 0,
				"title": "Introduction to HTML",
				"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				"description": "Discover HTML syntax, how to write elements, and set their attributes.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z"
			},
			{
				"id": 1,
				"title": "HTML Document Standards",
				"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				"description": "Learn best practices for structuring well-organized HTML documents, how to link to other pages, and ensuring clear document formatting.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z"
			},
			{
				"id": 2,
				"title": "HTML Tables",
				"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
				"description": "Develop the ability to efficiently organize and present tabular data in HTML.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z"
			},
			{
				"id": 3,
				"title": "HTML Forms",
				"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				"description": "Learn how to create and utilize HTML forms, along with essential form elements.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z"
			},
			{
				"id": 4,
				"title": "Semantic HTML",
				"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				"description": "Master the use of semantic HTML elements to build websites that are understandable and easy to navigate.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z"
			}
		]
	}
	EOF;
	break;

case "/courses/1":
	echo <<< 'EOF'
	{
		"id": 1,
		"title": "Front End Development",
		"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		"description": "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
		"public": true,
		"created_at": "2026-02-10T22:10:37.000Z",
		"enrolments": 50,
		"modules": []
	}
	EOF;
	break;

case "/courses/2":
	echo <<< 'EOF'
	{
		"id": 2,
		"title": "Back End Development",
		"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		"description": "Study programming in Python, writing and managing a SQL database, and developing APIs.",
		"public": true,
		"created_at": "2026-02-10T22:10:37.000Z",
		"enrolments": 40,
		"modules": []
	}
	EOF;
	break;

#case "/courses/:course_id/modules/:module_id":
case "/courses/0/modules/0":
	echo <<< 'EOF'
	{
		"id": 0,
		"title": "Introduction to HTML",
		"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		"description": "Discover HTML syntax, how to write elements, and set their attributes.",
		"content_url": "",
		"created_at": "2026-02-10T22:10:37.000Z"
	}
	EOF;
	break;

case "/courses/0/modules/1":
	echo <<< 'EOF'
	{
		"id": 1,
		"title": "HTML Document Standards",
		"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		"description": "Learn best practices for structuring well-organized HTML documents, how to link to other pages, and ensuring clear document formatting.",
		"content_url": "",
		"created_at": "2026-02-10T22:10:37.000Z"
	}
	EOF;
	break;

case "/courses/0/modules/2":
	echo <<< 'EOF'
	{
		"id": 2,
		"title": "HTML Tables",
		"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
		"description": "Develop the ability to efficiently organize and present tabular data in HTML.",
		"content_url": "",
		"created_at": "2026-02-10T22:10:37.000Z"
	}
	EOF;
	break;

case "/courses/0/modules/3":
	echo <<< 'EOF'
	{
		"id": 3,
		"title": "HTML Forms",
		"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		"description": "Learn how to create and utilize HTML forms, along with essential form elements.",
		"content_url": "",
		"created_at": "2026-02-10T22:10:37.000Z"
	}
	EOF;
	break;

case "/courses/0/modules/4":
	echo <<< 'EOF'
	{
		"id": 4,
		"title": "Semantic HTML",
		"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		"description": "Master the use of semantic HTML elements to build websites that are understandable and easy to navigate.",
		"content_url": "",
		"created_at": "2026-02-10T22:10:37.000Z"
	}
	EOF;
	break;

case "/users":
	echo <<< 'EOF'
	[
		{
			"id": "0",
			"email": "real@real.com",
			"first_name": "Joseph",
			"last_name": "Lastname",
			"role": "admin",
			"last_login": "2026-02-10T21:01:44.000Z",
			"date_joined": "2026-02-10T21:01:44.000Z"
		},
		{
			"id": "1",
			"email": "john@real.com",
			"first_name": "John",
			"last_name": "Doe",
			"role": "admin",
			"last_login": "2026-02-11T22:19:05.000Z",
			"date_joined": "2026-02-11T22:19:05.000Z"
		}
	]
	EOF;	
	break;

#case "/users/:id":
case "/users/0":
case "/users/me":
	echo <<< 'EOF'
	{
		"id": "0",
		"email": "real@real.com",
		"first_name": "Joseph",
		"last_name": "Lastname",
		"role": "admin",
		"last_login": "2026-02-10T21:01:44.000Z",
		"date_joined": "2026-02-10T21:01:44.000Z"
	}
	EOF;
	break;

case "/users/1":
	echo <<< 'EOF'
	{
		"id": "1",
		"email": "john@real.com",
		"first_name": "John",
		"last_name": "Doe",
		"role": "admin",
		"last_login": "2026-02-11T22:19:05.000Z",
		"date_joined": "2026-02-11T22:19:05.000Z"
	}
	EOF;
	break;

#case "/users/:id/courses":
case "/users/0/courses":
	echo <<< 'EOF'
	[
		{
			"id": 0,
			"title": "Coding Essentials",
			"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
			"description": "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
			"public": true,
			"created_at": "2026-02-10T22:10:37.000Z",
			"enrolments": 100,
			"modules": 5,
			"progress": 75
		},
		{
			"id": 1,
			"title": "Front End Development",
			"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
			"description": "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
			"public": true,
			"created_at": "2026-02-10T22:10:37.000Z",
			"enrolments": 50,
			"modules": 0,
			"progress": 0
		},
		{
			"id": 2,
			"title": "Back End Development",
			"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
			"description": "Study programming in Python, writing and managing a SQL database, and developing APIs.",
			"public": true,
			"created_at": "2026-02-10T22:10:37.000Z",
			"enrolments": 40,
			"modules": 0,
			"progress": 0
		}
	]
	EOF;
	break;

#case "/users/:id/courses/:course_id":
case "/users/0/courses/0":
	echo <<< 'EOF'
	{
		"id": 0,
		"title": "Coding Essentials",
		"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
		"description": "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
		"public": true,
		"created_at": "2026-02-10T22:10:37.000Z",
		"enrolments": 100,
		"progress": 75,
		"modules": [
			{
				"id": 0,
				"title": "Introduction to HTML",
				"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				"description": "Discover HTML syntax, how to write elements, and set their attributes.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z",
				"started_at": null,
				"completed_at": null
			},
			{
				"id": 1,
				"title": "HTML Document Standards",
				"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				"description": "Learn best practices for structuring well-organized HTML documents, how to link to other pages, and ensuring clear document formatting.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z",
				"started_at": null,
				"completed_at": null
			},
			{
				"id": 2,
				"title": "HTML Tables",
				"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
				"description": "Develop the ability to efficiently organize and present tabular data in HTML.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z",
				"started_at": null,
				"completed_at": null
			},
			{
				"id": 3,
				"title": "HTML Forms",
				"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				"description": "Learn how to create and utilize HTML forms, along with essential form elements.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z",
				"started_at": null,
				"completed_at": null
			},
			{
				"id": 4,
				"title": "Semantic HTML",
				"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				"description": "Master the use of semantic HTML elements to build websites that are understandable and easy to navigate.",
				"content_url": "",
				"created_at": "2026-02-10T22:10:37.000Z",
				"started_at": null,
				"completed_at": null
			}
		]
	}
	EOF;
	break;

case "/users/0/courses/1":
	echo <<< 'EOF'
	{
		"id": 1,
		"title": "Front End Development",
		"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		"description": "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
		"public": true,
		"created_at": "2026-02-10T22:10:37.000Z",
		"enrolments": 50,
		"progress": 0,
		"modules": []
	}
	EOF;
	break;

case "/users/0/courses/2":
	echo <<< 'EOF'
	{
		"id": 2,
		"title": "Back End Development",
		"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		"description": "Study programming in Python, writing and managing a SQL database, and developing APIs.",
		"public": true,
		"created_at": "2026-02-10T22:10:37.000Z",
		"enrolments": 40,
		"progress": 0,
		"modules": []
	}
	EOF;
	break;

#case "/users/:id/achievements":
case "/users/0/achievements":
	echo '{ "week_completions": 3 }';
	break;

#case "/users/:id/activity":
case "/users/0/activity":
	# ?limit=10
	# should show most recent
	echo <<< 'EOF'
	[
		{
			"course": 0,
			"module": 3,
			"course_title": "Coding Essentials",
			"module_title": "HTML Forms",
			"started_at": 1,
			"completed_at": 1
		},
		{
			"course": 0,
			"module": 2,
			"course_title": "Coding Essentials",
			"module_title": "HTML Tables",
			"started_at": 1,
			"completed_at": 0
		},
		{
			"course": 0,
			"module": 1,
			"course_title": "Coding Essentials",
			"module_title": "HTML Document Standards",
			"started_at": 1,
			"completed_at": 1
		},
		{
			"course": 0,
			"module": 0,
			"course_title": "Coding Essentials",
			"module_title": "Introduction to HTML",
			"started_at": 1,
			"completed_at": 1
		}
	]
	EOF;
	break;

default:
	http_response_code(404);
}
