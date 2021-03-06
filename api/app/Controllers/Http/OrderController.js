'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Order = use('App/Models/Order')
const Product = use('App/Models/Product')
const ProductOrder = use('App/Models/ProductOrder')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  islogged(request_params){
    return new Promise(async(resolve, reject) => {
        const user_inDB = await User.findBy('email',request_params.email)
        if(!user_inDB)
            reject("An error occured (1)")

        const token_inDB = await Token.findBy('user_id', user_inDB.id)
        if(!token_inDB || token_inDB.token!=request_params.token)
            reject("An error occured (2)")

        resolve(token_inDB.type)
    })
}
  generateRef() {
    var c = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679',
        n = c.length,
        /* p : chaîne de caractères spéciaux */
        p = '',
        o = p.length,
        r = '',
        n = c.length,
        /* s : determine la position du caractère spécial dans le mdp */
        s = Math.floor(Math.random() * (p.length - 1));

    for (var i = 0; i < 8; ++i) {
        if (s == i) {
            /* on insère à la position donnée un caractère spécial aléatoire */
            r += p.charAt(Math.floor(Math.random() * o));
        } else {
            /* on insère un caractère alphanumérique aléatoire */
            r += c.charAt(Math.floor(Math.random() * n));
        }
    }
    return r;
}
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {products} = request.post()
    const {mail, token} = request.headers()
    const auth = {mail, token}

    if(!mail || !token)
      return response.status(403).send({message: "You must be authenticated"})

    if(!products)
      return response.status(403).send({message: "No products sent"})

    try {
      this.islogged({email: auth.mail, token: auth.token})
    } catch(error){
      return response.status(403).send({message: error, auth})
    }
    const user = await User.findBy('email', auth.mail)

    const order_all = await Order.all()
    for(let i = 0 ; i < order_all.rows.length ; i++){
      if(order_all.rows[i].state=='treated' && order_all.rows[i].user_id==user.id)
        return response.status(403).send({
          message : "An order is currently being delivered"
        })
    }

    const ref = this.generateRef()
    const order_toStore = new Order()
    order_toStore.user_id= user.id
    const order_state= "treating." + ref
    order_toStore.state=order_state
    await order_toStore.save()

    const order_inDB=await Order.findBy('state', order_state)
   
    const orderProducts_toStore= []
    for(let i = 0 ; i < products.length; i++){
      const product = await Product.find(products[i].id)
      if (!product)
        return response.status(404).send({
          message : "The product " + products[i].id + " doesn't exist"
        })
        
      orderProducts_toStore[i] = new ProductOrder()
      orderProducts_toStore[i].product_id = product.id
      orderProducts_toStore[i].quantite = products[i].quantite
      orderProducts_toStore[i].order_id = order_inDB.id
      orderProducts_toStore[i].save()
    }
    order_inDB.state="treated"
    order_inDB.save()

    return response.status(200).send({
      message: "The order is correct"
    })
  }

  async deliver({request, response, params}){
    const {mail, token} = request.headers()
    const auth = {mail, token}
    const id = params.id

    if(!mail || !token)
      return response.status(403).send({message: "You must be authenticated"})
    
    const role=[]
    try {
      role[0] = await this.islogged({email: auth.mail, token: auth.token})
    } catch(error) {
      return response.status(403).send({
        message : "An error occured"
      })
    }
    if(role[0]!='courier'){
      return response.status(403).send({
        message: "You are not the delivery guy !"
      })
    }
    const order_inDB = await Order.find(id)
    order_inDB.state='delivered'
    order_inDB.save()
    return response.status(200).send({
      message: "delivered"
    })

  }


  async getDelivery({request, response}){
    const {mail, token}=request.headers()
    const auth = {mail, token}

    if(!mail || !token)
      return response.status(403).send({message: "You must be authenticated"})

    const role=[]
    try {
      role[0] = await this.islogged({email: auth.mail, token: auth.token})
    } catch(error) {
      return response.status(403).send({
        message : "An error occured"
      })
    }
    if(role[0]!='courier'){
      return response.status(403).send({
        message: "You are not the delivery guy !"
      })
    }
    const orders_inDB=await Order.all()
    const orders_toDeliver=[]
    for(let i =0 ; i < orders_inDB.rows.length; i++){
      if(orders_inDB.rows[i].state=="treated"){
        const user_toDeliver = await User.find(orders_inDB.rows[i].user_id)
        orders_toDeliver.push({
          user: user_toDeliver,
          order: orders_inDB.rows[i]
        })
      }
    }
    return response.status(200).send({
      order_to_be_delivered: orders_toDeliver
    })


  }
  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OrderController
