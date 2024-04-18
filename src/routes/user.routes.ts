import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
// import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import crypto, { randomUUID } from 'node:crypto'

export async function userRoutes(app: FastifyInstance) {
  // Create a User
  app.post('/', async (request, reply) => {
    // Schema user
    const RegisterUserSchema = z.object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { username, email, password } = RegisterUserSchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('users').insert({
      id: crypto.randomUUID(),
      username,
      email,
      password,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
