var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CommentSchema= new Schema(
    {
      content:
      {
          type: String,
          require:"contet is required"
      },
      
      
      note:
      {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Note",
          require:"note is required"

      }
     
  });
  module.exports =mongoose.model("Comment", CommentSchema);
