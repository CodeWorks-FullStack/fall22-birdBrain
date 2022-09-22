import { Schema } from "mongoose";

export const BirdSchema = new Schema({
  name: { type: String, default: '' },
  img: { type: String, required: true },
  // ONE TO MANY account -> many birds
  peeperId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

}, {
  timestamps: true, toJSON: { virtuals: true }
})

BirdSchema.virtual('peeper', {
  localField: 'peeperId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

