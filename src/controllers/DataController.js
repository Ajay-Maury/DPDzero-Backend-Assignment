const jwt = require("jsonwebtoken");
const Data = require("../models/Data");

const DataController = {
  async storeData(req, res) {
    try {
      const { key, value } = req.body;

      // Check if the key does not exists
      if (!key) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_KEY",
          message: "The provided key is not valid or missing.",
        });
      }

      // Check if the value does not exists
      if (!value) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_VALUE",
          message: "The provided value is not valid or missing.",
        });
      }

      // Check if the key already exists
      const existingData = await Data.findOne({
        where: {
          key,
        },
      });

      if (existingData) {
        return res.status(400).json({
          status: "error",
          code: "KEY_EXISTS",
          message:
            "The provided key already exists in the database. Use the update API to modify the value.",
        });
      }

      await Data.create({
        key,
        value,
      });

      return res.status(201).json({
        status: "success",
        message: "Data stored successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later.",
      });
    }
  },

  async retrieveData(req, res) {
    try {
      const { key } = req.params;

      const data = await Data.findOne({
        where: {
          key,
        },
      });

      if (!data) {
        return res.status(404).json({
          status: "error",
          code: "KEY_NOT_FOUND",
          message: "The provided key does not exist in the database.",
        });
      }

      return res.status(200).json({
        status: "success",
        data: {
          key: data.key,
          value: data.value,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later.",
      });
    }
  },

  async updateData(req, res) {
    try {
      const { key } = req.params;
      const { value } = req.body;

      const data = await Data.findOne({
        where: {
          key,
        },
      });

      if (!data) {
        return res.status(404).json({
          status: "error",
          code: "KEY_NOT_FOUND",
          message: "The provided key does not exist in the database.",
        });
      }

      await data.update({ value });

      return res.status(200).json({
        status: "success",
        message: "Data updated successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later.",
      });
    }
  },

  async deleteData(req, res) {
    try {
      const { key } = req.params;

      const data = await Data.findOne({
        where: {
          key,
        },
      });

      if (!data) {
        return res.status(404).json({
          status: "error",
          code: "KEY_NOT_FOUND",
          message: "The provided key does not exist in the database.",
        });
      }

      await data.destroy();

      return res.status(200).json({
        status: "success",
        message: "Data deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred. Please try again later.",
      });
    }
  },
};

module.exports = DataController;
