import React, { useState, useEffect } from 'react';
import TeacherSchedule from '../view/schedules/TeacherSchedule';

function PdfGenerator() {
    const [htmlContent, setHtmlContent] = useState('');
    const [taskId, setTaskId] = useState(null);
    const [webSocket, setWebSocket] = useState(null);


    useEffect(() => {
        const webSocketUrl = 'ws://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/websocket/pdf';
        const ws = new WebSocket(webSocketUrl);

        ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
            if (event.data === 'pdf_ready:' + taskId) {
                downloadPdf(taskId); // Call function to download PDF
            }
        };

        ws.onopen = () => {
            console.log('WebSocket Connected');
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error', error);
        };

        ws.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        setWebSocket(ws);

        // Cleanup function
        return () => {
            ws.close();
        };
    }, []);
     // Function to send a message to the server
     const sendMessage = (message) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(message);
        } else {
            console.error('WebSocket is not connected.');
        }
    };

    // Function to download the PDF
    const downloadPdf = async (taskId) => {
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

    // Function to trigger the RESTful service and handle the response
    const generatePdf = async () => {
        try {
            const element = document.getElementById('lessonTable');
            if (element) {
                const htmlContent = '<table class="lessonTable" id="lessonTable">' + element.innerHTML + '</table>';
                setHtmlContent(htmlContent); // Set the state
                console.log('HTML Content:', htmlContent); // Check the value
                const response = await fetch('http://localhost:8080/ScheduleWebApp-1.0-SNAPSHOT/api/pdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/html',
                    },
                    body: htmlContent,
                });

                if (response.ok) {
                    const receivedTaskId = await response.text(); // This will be the text response, such as a UUID
                    setTaskId(receivedTaskId); // Update state with the received taskId
                    sendMessage(receivedTaskId); // Notify the WebSocket server about the taskId
                } else {
                    const errorText = await response.text(); // Get the response text even in case of an error
                    console.error("Error response:", errorText);
                    throw new Error('Network response was not ok.');
                }
            } else {
                console.log('No lesson-table');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <button onClick={generatePdf}>Generate PDF</button>
            <TeacherSchedule />
        </div>
    );
}

export default PdfGenerator;
