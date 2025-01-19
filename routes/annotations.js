const express = require('express');
const Annotation = require('../models/Annotation');
const router = express.Router();

// Save an annotation
router.post('/', async (req, res) => {
  try {
    const { projectId, annotator, label, mask, area } = req.body;
    const annotation = new Annotation({ projectId, annotator, label, mask, area });
    await annotation.save();
    res.status(201).json({ message: 'Annotation saved successfully', annotationId: annotation._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve annotations
router.get('/', async (req, res) => {
  try {
    const { id, label, annotator } = req.query;
    const query = {};
    if (id) query._id = id;
    if (label) query.label = label;
    if (annotator) query.annotator = annotator;
    const annotations = await Annotation.find(query);
    res.json(annotations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get rank of annotations by area
router.get('/rank', async (req, res) => {
  try {
    const { projectId } = req.query;
    if (!projectId) return res.status(400).json({ error: 'Project ID is required' });
    const annotations = await Annotation.find({ projectId }).sort({ area: -1 });
    const ranked = annotations.map((a, index) => ({
      id: a._id,
      label: a.label,
      area: a.area,
      rank: index + 1
    }));
    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
