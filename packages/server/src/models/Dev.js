import { Schema, model } from 'mongoose'

const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev'
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Dev', DevSchema);
