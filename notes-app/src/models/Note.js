
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
    },
     day: {
      type: Date,
    },
    comments:
    [ {
     
      type: mongoose.Schema.Types.ObjectId,
      ref:"Comment",
      
    
    }
    ],
    
    text:
    [ {
     
      type: String,
     
    }
    ],
    msg: {
      type:String,
    },
    private: {
      type:String,
    },
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

