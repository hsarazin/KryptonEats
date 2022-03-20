'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
    Route.get('/all','ProductController.index')
}).prefix('/products')

Route.group(() => {
    Route.get('/', 'ProductController.ref')
}).prefix('/product/:ref')

Route.group(() => {
    Route.post('/dev', 'FixtureController.dev')
    Route.post('/prod', 'FixtureController.prod')
}).prefix('/fixtures')

Route.group(() => {
    Route.post('/buy', 'OrderController.store')
    Route.post('/:id/deliver', 'OrderController.deliver')
    Route.post('/tobedelivered', 'OrderController.getDelivery')
}).prefix('/order')

Route.post('/register', 'SecurityController.register')
Route.post('/login', 'SecurityController.login')

Route.post('/user', 'SecurityController.whoami')

