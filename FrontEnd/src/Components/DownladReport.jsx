import convertArrayToCSV from "convert-array-to-csv";
import FormatDateTime from "./FormatDateTime";
import toast from "react-hot-toast";

const DownloadCSVReport = async (reportData, reportType) => {
  try {
    if (!reportData || reportData.length === 0) {
      toast.error(`No records found for ${reportType} report`);
      return;
    }

    // Extract relevant data for CSV
    const csvData = reportData.map((record) => {
      return {
        username: record.username,
        date: FormatDateTime(record.entranceTime).formattedDate,
        entranceTime: FormatDateTime(record.entranceTime).formattedTime,
        leavingTime: record.leavingTime
          ? FormatDateTime(record.leavingTime).formattedTime
          : "Not Checked Out",
      };
    });

    // Convert array to CSV
    const csvContent = convertArrayToCSV(csvData);

    // Set the file name based on the report type
    const fileName = `attendance_report_${reportType}.csv`;

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);

    // Notify user
    toast.success(`CSV report (${reportType}) generated successfully!`);
  } catch (error) {
    console.error("Error generating CSV report", error);
  }
};

export default DownloadCSVReport;
