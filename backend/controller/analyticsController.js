import Job from "../models/jobModels.js";
import User from "../models/userModels.js";
import Category from "../models/categoryModels.js";

export const getPlatformInsights = async (req, res) => {
  try {
    const jobCount = await Job.countDocuments();
    const activeUsers = await User.countDocuments();
    const mostAppliedCategories = await Job.aggregate([
      { $match: { status: "approved" } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      { $group: { _id: "$categoryInfo", totalApplications: { $sum: { $size: "$applicants" } } } },
      { $sort: { totalApplications: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      jobPostings: jobCount,
      activeUsers,
      mostAppliedCategories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVisualReportData = async (req, res) => {
  try {
    const jobApplications = await Job.aggregate([
      { $match: { status: "approved" } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $project: {
          categoryName: "$categoryInfo.name",
          applicationCount: { $size: "$applicants" },
        },
      },
      {
        $group: {
          _id: "$categoryName",
          totalApplications: { $sum: "$applicationCount" },
        },
      },
    ]);

    res.json({ chartData: jobApplications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};