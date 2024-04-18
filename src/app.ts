import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { userRoutes } from './routes/user.routes'
import { mealsRoutes } from './routes/meals.routes'

export const app = fastify()

app.register(cookie)

app.register(userRoutes, {
  prefix: 'userAuth',
})

app.register(mealsRoutes, {
  prefix: 'meals',
})
