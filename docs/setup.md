# Setup

## Frontend

You must have [Node.js](https://nodejs.org) installed.

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# ...or, to make a production build
npm run build
# ...which then outputs a distribution in 'dist/', which can be tested with...
npm run preview
```

As in the frontend's current state there's no proper error handler page, you will be left with a blank page unless you start the backend under `http://localhost:1234/api/v1`.

## Backend

Due to not meeting time constraints, the Django backend is currently not in a state where it can be fully used. For something that can be used with the frontend (albeit it being "dumb" and doing no actual processing), you will need to use the dumb backend.

### Django Backend

You must have [Python 3](https://python.org) installed.

```bash
# Create virtual environment to safely install dependencies
python -m venv venv

# Activate venv (Windows)
.\venv\Scripts\activate
# Activate venv (Mac, Linux)
. venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create database migrations
python manage.py makemigrations

# Run database migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Run development server
python manage.py runserver
# (to run on production, you'd use a WSGI/ASGI server like Gunicorn, and reverse proxy it)
```

### Dumb Backend

You must have [PHP](https://php.net) installed (I could've very well made this Python or Node.js instead as it's just static responses, but I didn't have enough time to make it use something more in-line with requirements stated).

```bash
# Unless you are deploying this on a web server with PHP support, you can use the PHP development server.
php -S localhost:1234 dumb.php
```

Make sure your backend server is being ran on port 1234, or change where the frontend points to in `api.js`!
