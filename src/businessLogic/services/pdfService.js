// pdfService.js

export const generatePdf = async (htmlContent, taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/pdf?taskId=${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: htmlContent,
      });
  
      if (response.ok) {
        console.log('task id in api/pd is ' + taskId);
        return await response.text();
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const downloadPdf = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/pdf/${taskId}`, {
        method: 'GET',
      });
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `downloaded_pdf_${taskId}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('Failed to download PDF.');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  