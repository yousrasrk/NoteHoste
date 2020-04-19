
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required:true
    },
    date: {
      type: Date,
      default:Date.now
    }
  },
  {
    timestamps: true
  },{
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  }
}
);

module.exports =mongoose.model("Note", NoteSchema);

