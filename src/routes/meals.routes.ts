import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function mealsRoutes(app: FastifyInstance) {
  // Create meals
  app.post(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const idParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = idParamsSchema.parse(request.params)
      const sessionId = request.cookies.sessionId

      if (sessionId !== id) {
        return reply.status(401).send()
      }
      // Meals Schema
      const mealsSchema = z.object({
        name: z.string(),
        description: z.string(),
        diet: z.boolean(),
      })
      const { name, description, diet } = mealsSchema.parse(request.body)
      await knex('meals').insert({
        id: crypto.randomUUID(),
        name,
        description,
        diet,
        user_id: sessionId,
      })

      return reply.status(201).send()
    },
  )

  app.put(
    '/:id/:user_id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const sessionId = request.cookies.sessionId

      const mealsSchema = z.object({
        name: z.string(),
        description: z.string(),
        diet: z.boolean(),
      })

      const { name, description, diet } = mealsSchema.parse(request.body)

      const idParamsSchema = z.object({
        id: z.string().uuid(),
        user_id: z.string().uuid(),
      })
      const { id, user_id } = idParamsSchema.parse(request.params)

      await knex('meals')
        .update({ name, description, diet })
        .where({ id, user_id: sessionId })

      return reply.status(200).send()
    },
  )

  app.delete(
    '/:id/:user_id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const sessionId = request.cookies.sessionId

      const idParamsSchema = z.object({
        id: z.string().uuid(),
        user_id: z.string().uuid(),
      })

      const { id, user_id } = idParamsSchema.parse(request.params)

      await knex('meals').delete().where({ id, user_id: sessionId })

      return reply.status(204).send()
    },
  )

  app.get(
    '/:user_id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const sessionId = request.cookies.sessionId
      const idParamsSchema = z.object({
        user_id: z.string().uuid(),
      })
      const { user_id } = idParamsSchema.parse(request.params)

      const meals = await knex('meals').select().where({ user_id: sessionId })

      return reply.status(200).send(meals)
    },
  )
  app.get(
    '/meal/:id/:user_id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const sessionId = request.cookies.sessionId

      const idParamsSchema = z.object({
        id: z.string().uuid(),
        user_id: z.string().uuid(),
      })

      const { id, user_id } = idParamsSchema.parse(request.params)

      const meal = await knex('meals')
        .select()
        .where({ id, user_id: sessionId })

      return reply.status(200).send(meal)
    },
  )
  app.get(
    '/summary/:user_id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const sessionId = request.cookies.sessionId

      const idParamsSchema = z.object({
        user_id: z.string().uuid(),
      })

      const { user_id } = idParamsSchema.parse(request.params)

      const mealsInDiet = await knex('meals').select().where('diet', 1).andWhere({user_id: sessionId}).count().first()

      const mealsNotDiet = await knex('meals').select().where('diet', 0).andWhere({user_id:sessionId}).count().first()

      const TotalMeals = await knex('meals')
        .where({ user_id: sessionId })
        .select()
        .count()
        .first()

      return reply.status(200).send({ TotalMeals, mealsInDiet, mealsNotDiet })
    },
  )
}
