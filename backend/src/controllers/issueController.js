import Issue from '../models/Issue.js';

/**
 * @desc Create new issue (Student)
 */
export const createIssue = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const issue = await Issue.create({
      title,
      description,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Get issues created by logged-in student
 */
export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Get all issues (Admin)
 */
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Update issue status & remarks (Admin)
 */
export const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      });
    }

    issue.status = req.body.status || issue.status;
    issue.remarks = req.body.remarks || issue.remarks;

    const updatedIssue = await issue.save();

    res.json({
      success: true,
      issue: updatedIssue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
