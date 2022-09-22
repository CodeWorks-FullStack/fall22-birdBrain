import { Schema } from "mongoose";

export const BirdSchema = new Schema({
  name: { type: String, default: '', maxLength: 20 },
  img: { type: String, required: true },
  location: {type: String, required: true, default: 'unknown' },
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


