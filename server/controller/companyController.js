import Company from '../models/company.js';

// GET all companies
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching companies.' });
  }
};

// POST create a new company
export const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: 'Error creating company.', error });
  }
};

// PUT update a company by id
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCompany) return res.status(404).json({ message: 'Company not found.' });
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: 'Error updating company.', error });
  }
};

// DELETE company by id
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) return res.status(404).json({ message: 'Company not found.' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting company.', error });
  }
};
