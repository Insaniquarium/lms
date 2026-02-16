<?php
# Dumb backend to take the Django backend's place until it ever gets finished
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, *");
error_reporting(E_ALL);

$url = parse_url($_SERVER["REQUEST_URI"])["path"];

switch (str_replace("/api/v1", "", $url)) {
case "/login":
	echo '{ "token": "real", "id": "0" }';
	break;

case "/courses":
	# ?visibility=public (by default, forced for students)
	echo <<< 'EOF'
	[
		{
			"id": 0,
			"name": "Coding Essentials",
			"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
			"description": "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
			"visibility": "public",
			"created": 1770761437,
			"enrolments": 100,
			"modules": 5
		},
		{
			"id": 1,
			"name": "Front End Development",
			"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
			"description": "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
			"visibility": "public",
			"created": 1770761437,
			"enrolments": 50,
			"modules": 0
		},
		{
			"id": 2,
			"name": "Back End Development",
			"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
			"description": "Study programming in Python, writing and managing a SQL database, and developing APIs.",
			"visibility": "public",
			"created": 1770761437,
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
		"name": "Coding Essentials",
		"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
		"description": "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
		"visibility": "public",
		"created": 1770761437,
		"enrolments": 100,
		"modules": [
			{
				"id": 0,
				"name": "Introduction to HTML",
				"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				"description": "Discover HTML syntax, how to write elements, and set their attributes.",
				"url": ""
			},
			{
				"id": 1,
				"name": "HTML Document Standards",
				"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				"description": "Learn best practices for structuring well-organized HTML documents, how to link to other pages, and ensuring clear document formatting.",
				"url": ""
			},
			{
				"id": 2,
				"name": "HTML Tables",
				"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
				"description": "Develop the ability to efficiently organize and present tabular data in HTML.",
				"url": ""
			},
			{
				"id": 3,
				"name": "HTML Forms",
				"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				"description": "Learn how to create and utilize HTML forms, along with essential form elements.",
				"url": ""
			},
			{
				"id": 4,
				"name": "Semantic HTML",
				"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				"description": "Master the use of semantic HTML elements to build websites that are understandable and easy to navigate.",
				"url": ""
			}
		]
	}
	EOF;
	break;

case "/courses/1":
	echo <<< 'EOF'
	{
		"id": 1,
		"name": "Front End Development",
		"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		"description": "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
		"visibility": "public",
		"created": 1770761437,
		"enrolments": 50,
		"modules": []
	}
	EOF;
	break;

case "/courses/2":
	echo <<< 'EOF'
	{
		"id": 2,
		"name": "Back End Development",
		"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		"description": "Study programming in Python, writing and managing a SQL database, and developing APIs.",
		"visibility": "public",
		"created": 1770761437,
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
		"name": "Introduction to HTML",
		"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		"description": "Discover HTML syntax, how to write elements, and set their attributes.",
		"url": ""
	}
	EOF;
	break;

case "/courses/0/modules/1":
	echo <<< 'EOF'
	{
		"id": 1,
		"name": "HTML Document Standards",
		"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		"description": "Learn best practices for structuring well-organized HTML documents, how to link to other pages, and ensuring clear document formatting.",
		"url": ""
	}
	EOF;
	break;

case "/courses/0/modules/2":
	echo <<< 'EOF'
	{
		"id": 2,
		"name": "HTML Tables",
		"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
		"description": "Develop the ability to efficiently organize and present tabular data in HTML.",
		"url": ""
	}
	EOF;
	break;

case "/courses/0/modules/3":
	echo <<< 'EOF'
	{
		"id": 3,
		"name": "HTML Forms",
		"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		"description": "Learn how to create and utilize HTML forms, along with essential form elements.",
		"url": ""
	}
	EOF;
	break;

case "/courses/0/modules/4":
	echo <<< 'EOF'
	{
		"id": 4,
		"name": "Semantic HTML",
		"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		"description": "Master the use of semantic HTML elements to build websites that are understandable and easy to navigate.",
		"url": ""
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
			"last_accessed": 1770757304,
			"created": 1770757304
		},
		{
			"id": "1",
			"email": "john@real.com",
			"first_name": "John",
			"last_name": "Doe",
			"role": "admin",
			"last_accessed": 1770848345,
			"created": 1770848345
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
		"last_accessed": 1770757304,
		"created": 1770757304
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
		"last_accessed": 1770848345,
		"created": 1770848345
	}
	EOF;
	break;

#case "/users/:id/courses":
case "/users/0/courses":
	echo <<< 'EOF'
	[
		{
			"id": 0,
			"name": "Coding Essentials",
			"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
			"description": "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
			"progress": 75
		},
		{
			"id": 1,
			"name": "Front End Development",
			"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
			"description": "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
			"progress": 0
		},
		{
			"id": 2,
			"name": "Back End Development",
			"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
			"description": "Study programming in Python, writing and managing a SQL database, and developing APIs.",
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
		"name": "Coding Essentials",
		"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
		"description": "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
		"visibility": "public",
		"created": 0,
		"enrolments": 100,
		"progress": 75,
		"modules": [
			{
				"id": 0,
				"name": "Introduction to HTML",
				"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				"description": "Discover HTML syntax, how to write elements, and set their attributes.",
				"url": "",
				"started_when": 1,
				"completed_when": 1
			},
			{
				"id": 1,
				"name": "HTML Document Standards",
				"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				"description": "Learn best practices for structuring well-organized HTML documents, how to link to other pages, and ensuring clear document formatting.",
				"url": "",
				"started_when": 1,
				"completed_when": 1
			},
			{
				"id": 2,
				"name": "HTML Tables",
				"image": "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
				"description": "Develop the ability to efficiently organize and present tabular data in HTML.",
				"url": "",
				"started_when": 1,
				"completed_when": 0
			},
			{
				"id": 3,
				"name": "HTML Forms",
				"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				"description": "Learn how to create and utilize HTML forms, along with essential form elements.",
				"url": "",
				"started_when": 1,
				"completed_when": 1
			},
			{
				"id": 4,
				"name": "Semantic HTML",
				"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				"description": "Master the use of semantic HTML elements to build websites that are understandable and easy to navigate.",
				"url": "",
				"started_when": 0,
				"completed_when": 0
			}
		]
	}
	EOF;
	break;

case "/users/0/courses/1":
	echo <<< 'EOF'
	{
		"id": 1,
		"name": "Front End Development",
		"image": "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		"description": "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
		"visibility": "public",
		"created": 0,
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
		"name": "Back End Development",
		"image": "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		"description": "Study programming in Python, writing and managing a SQL database, and developing APIs.",
		"visibility": "public",
		"created": 0,
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
			"course_id": 0,
			"module_id": 3,
			"course_name": "Coding Essentials",
			"module_name": "HTML Forms",
			"started_when": 1,
			"completed_when": 1
		},
		{
			"course_id": 0,
			"module_id": 2,
			"course_name": "Coding Essentials",
			"module_name": "HTML Tables",
			"started_when": 1,
			"completed_when": 0
		},
		{
			"course_id": 0,
			"module_id": 1,
			"course_name": "Coding Essentials",
			"module_name": "HTML Document Standards",
			"started_when": 1,
			"completed_when": 1
		},
		{
			"course_id": 0,
			"module_id": 0,
			"course_name": "Coding Essentials",
			"module_name": "Introduction to HTML",
			"started_when": 1,
			"completed_when": 1
		}
	]
	EOF;
	break;

default:
	http_response_code(404);
}
