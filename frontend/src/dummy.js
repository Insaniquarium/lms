export const courses = [
	{
		id: 0,
		name: "Coding Essentials",
		image: "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
		description: "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive.",
		modules: [
			{
				id: 0,
				name: "Introduction to HTML",
				image: "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				description: "Discover HTML syntax, how to write elements, and set their attributes."
			},
			{
				id: 1,
				name: "HTML Document Standards",
				image: "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				description: "Learn best practices for structuring well-organized HTML documents, how to link to other pages, and ensuring clear document formatting."
			},
			{
				id: 2,
				name: "HTML Tables",
				image: "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
				description: "Develop the ability to efficiently organize and present tabular data in HTML."
			},
			{
				id: 3,
				name: "HTML Forms",
				image: "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
				description: "Learn how to create and utilize HTML forms, along with essential form elements."
			},
			{
				id: 4,
				name: "Semantic HTML",
				image: "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
				description: "Master the use of semantic HTML elements to build websites that are understandable and easy to navigate."
			}
		]
	},
	{
		id: 1,
		name: "Front End Development",
		image: "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		description: "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects.",
		modules: []
	},
	{
		id: 2,
		name: "Back End Development",
		image: "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		description: "Study programming in Python, writing and managing a SQL database, and developing APIs.",
		modules: []
	}
];

export const recentActivity = [
	{
		course_id: 0,
		module_id: 3,
		name: "HTML Forms",
		status: "Completed"
	},
	{
		course_id: 0,
		module_id: 2,
		name: "HTML Tables",
		status: "Started"
	},
	{
		course_id: 0,
		module_id: 1,
		name: "HTML Document Standards",
		status: "Completed"
	},
	{
		course_id: 0,
		module_id: 0,
		name: "Introduction to HTML",
		status: "Completed"
	}
];

export const myCourses = [
	{
		id: 0,
		progress: 50,
		name: "Coding Essentials",
		image: "https://unsplash.com/photos/1IW4HQuauSU/download?w=640",
		description: "Learn to use HTML and CSS to create and style web pages, and utilise JavaScript to make them interactive."
	},
	{
		id: 1,
		progress: 15,
		name: "Front End Development",
		image: "https://unsplash.com/photos/uyfohHiTxho/download?w=640",
		description: "Utilise React to develop single page applications, collaborate and track changes with GitHub, and learn to manage software development projects."
	},
	{
		id: 2,
		progress: 0,
		name: "Back End Development",
		image: "https://unsplash.com/photos/r2_uBsnR-dY/download?w=640",
		description: "Study programming in Python, writing and managing a SQL database, and developing APIs.",
	}
];

export const moduleProgress = [
	{ course_id: 0, module_id: 0, completed: true },
	{ course_id: 0, module_id: 1, completed: true },
	{ course_id: 0, module_id: 2, completed: true },
	{ course_id: 0, module_id: 3, completed: false }
];
