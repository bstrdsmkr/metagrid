# MetaGrid

[![Made with Django.](https://www.djangoproject.com/m/img/badges/djangomade124x25.gif)](http://www.djangoproject.com)

[![Updates](https://pyup.io/repos/github/aims-group/metagrid/shield.svg)](https://pyup.io/repos/github/aims-group/metagrid/)
[![Python 3](https://pyup.io/repos/github/aims-group/metagrid/python-3-shield.svg)](https://pyup.io/repos/github/aims-group/metagrid/)
[![Black code style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ESGF Search UI. Check out the project's [documentation](http://aims-group.github.io/MetaGrid/).

## Prerequisites

- [Docker](https://docs.docker.com/docker-for-mac/install/)

## Local Development

### Getting Started

1. Configure local .env file (template provided)

2. Setup pre-commit

    ```bash
    pre-commit install
    ```

- This repo has default integration with pre-commit for identifying simple issues before submission to code review.

- The linters and stylers include:
  - Code styling: black
  - Linting: flake8
  - Static Type Checking: mypy

### Run the Stack

This brings up both Django and PostgreSQL. The first time it is run it might take a while to get started, but subsequent runs will occur quickly.

Open a terminal at the backend root and start the dev server for local development:

```bash
docker-compose up
```

### Execute Management Commands

Run a command inside the docker container:

```bash
docker-compose run --rm web [command]
```

## Basic Commands

### Setting Up Users

- To create an superuser account, use this command:

```bash
python manage.py createsuperuser
```

### Type checks

Running type checks with mypy:

```bash
mypy metagrid
```

### Test coverage

To run the tests, check your test coverage, and generate an HTML coverage report::

```bash
coverage run -m pytest
coverage html
open htmlcov/index.html
```

### Running tests with py.test

``` bash
pytest
```