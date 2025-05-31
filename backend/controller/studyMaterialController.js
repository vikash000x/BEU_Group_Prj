import studyMaterialModel from '../models/studyMaterialModel.js';

// Create a new study material
export const createStudyMaterial = async (req, res) => {
  try {
    const newStudyMaterial = new studyMaterialModel(req.body);
    const savedStudyMaterial = await newStudyMaterial.save();
    res.status(201).json(savedStudyMaterial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllStudyMaterial = async (req, res) => {
  try {
    const studyMaterials = await studyMaterialModel.find();
    res.status(200).json(studyMaterials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudyMaterialById = async (req, res) => {
  try {
    const studyMaterial = await studyMaterialModel.findById(req.params.id);
    if (!studyMaterial) return res.status(404).json({ error: 'Study Material not found' });
    res.status(200).json(studyMaterial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStudyMaterial = async (req, res) => {
  try {
    const updatedStudyMaterial = await studyMaterialModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudyMaterial) return res.status(404).json({ error: 'Study Material not found' });
    res.status(200).json(updatedStudyMaterial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStudyMaterial = async (req, res) => {
  try {
    const deletedStudyMaterial = await studyMaterialModel.findByIdAndDelete(req.params.id);
    if (!deletedStudyMaterial) return res.status(404).json({ error: 'Study Material not found' });
    res.status(200).json({ message: 'Study Material deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};  