import { Schema,model } from "mongoose";

const likeSchema= new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
}, { timestamps: true });
likeSchema.index({ userId: 1, tripId: 1 }, { unique: true }); // Ensure a user can like a trip only once
const Like = model("Like", likeSchema);
export default Like;
// This model represents a "Like" for a trip, linking a user to a specific trip.
// It includes a userId and tripId, both referencing their respective models.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema.