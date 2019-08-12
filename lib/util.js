import Joi from '@hapi/joi'

export const joi = Joi.defaults((schema) => schema.required())
