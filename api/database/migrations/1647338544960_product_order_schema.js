'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductOrderSchema extends Schema {
  up () {
    this.create('product_orders', (table) => {
      table.increments()
      table.integer('product_id').notNullable()
      table.integer('quantite').notNullable()
      table.integer('order_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_orders')
  }
}

module.exports = ProductOrderSchema
