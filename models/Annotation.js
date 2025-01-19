const mongoose = require('mongoose');

const AnnotationSchema = new mongoose.Schema({
  projectId: { type: String, required: true }, // Unique project ID
  annotator: { type: String, required: true }, // Annotator name or ID
  label: { type: String, required: true }, // Label for the annotation
  mask: { 
    type: [[Number]], // 2D array representing the segmentation mask
    required: true 
  },
  area: { type: Number, required: true }, // Area of the mask
  createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model('Annotation', AnnotationSchema);
