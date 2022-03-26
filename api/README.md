# Adonis API for KryptonEats

## Setup

Run `npm install`. // npm ci

Start a MySQL service (MariaDB, i.e)

```bash
cp .env.example .env & vim .env
```

Set a password for `FIXTURE_PASSWORD` in .env file.

###### (vim >> nano ?)

#### Adonis CLI

Install AdonisCLI with

```bash
sudo npm i -g @adonisjs/cli // vous auriez pu trouver plus simple que devoir installer un package de cli en global
```

## Migrations

Run the following command to run startup migrations.

```bash
adonis migration:run
```

You may refresh them with

```bash
adonis migration:refresh
```

## Start

Run the following command to start the server.

```bash
npm start
```

You also may use nodemon...

```bash
sudo npm i -g nodemon
nodemon server.js
```

// si la partie sur adonis n'est pas faite, l'application gère très mal l'erreur

## Filling the database

```bash
curl -X POST -F 'password=The password you want' http://localhost:3333/fixtures/prod
```
