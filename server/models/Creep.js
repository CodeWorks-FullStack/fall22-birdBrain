import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export const CreepSchema = new Schema({

  creeperId: { type: ObjectId, required: true, ref: 'Account' },
  birdId: { type: ObjectId, required: true, ref: 'Bird' }

}, {
  timestamps: true, toJSON: { virtuals: true }
})

CreepSchema.virtual('creeper', {
  localField: 'creeperId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CreepSchema.virtual('bird', {
  localField: 'birdId',
  foreignField: '_id',
  justOne: true,
  ref: 'Bird'
})

// HOW YOU DO IT  1 vs 4 'A'
// Create a unique key across two fields
CreepSchema.index({ creeperId: 1, birdId: 1 }, { unique: true })
