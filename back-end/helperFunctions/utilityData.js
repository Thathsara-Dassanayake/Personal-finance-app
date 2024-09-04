const fs = require("fs").promises;

async function loadDataFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error);
    throw error; // Re-throw the error to handle it at the caller level
  }
}

async function saveDataToFile(data, filePath) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to ${filePath}:`, error);
  }
}

async function moveTestDataToCategoryData(
  testDataFilePath,
  categoryDataFilePath
) {
  try {
    const testData = await loadDataFromFile(testDataFilePath);

    if (testData) {
      await saveDataToFile(testData, categoryDataFilePath);
      console.log("Data moved from categoryDataTest.json to categoryData.json");
    } else {
      console.log("No data in categoryDataTest.json. Not moving data.");
    }
  } catch (error) {
    console.error("Error during moving data:", error);
  }
}

module.exports = {
  loadDataFromFile,
  saveDataToFile,
  moveTestDataToCategoryData,
};
